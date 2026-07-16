#!/usr/bin/env bash

set -u

failures=0
skip_apex="${SKIP_APEX:-0}"

pass() {
  printf 'PASS: %s\n' "$1"
}

fail() {
  printf 'FAIL: %s\n' "$1" >&2
  failures=$((failures + 1))
}

http_status() {
  curl -sS -o /dev/null --max-time 20 -w '%{http_code}' "$1"
}

redirect_location() {
  curl -sSI --max-time 20 "$1" \
    | awk 'tolower($1) == "location:" { gsub(/\r/, "", $2); location=$2 } END { print location }'
}

check_status() {
  local url="$1"
  local expected="$2"
  local actual

  if ! actual="$(http_status "$url")"; then
    fail "$url could not be requested"
    return
  fi

  if [ "$actual" = "$expected" ]; then
    pass "$url status=$actual"
  else
    fail "$url status=$actual expected=$expected"
  fi
}

check_redirect() {
  local source_url="$1"
  local expected_location="$2"
  local status
  local location
  local final_status

  if ! status="$(http_status "$source_url")"; then
    fail "$source_url could not be requested"
    return
  fi
  location="$(redirect_location "$source_url" 2>/dev/null || true)"

  if [ "$status" != "301" ]; then
    fail "$source_url status=$status expected=301"
    return
  fi
  if [ "$location" != "$expected_location" ]; then
    fail "$source_url location=$location expected=$expected_location"
    return
  fi
  if ! final_status="$(curl -sSL -o /dev/null --max-time 20 -w '%{http_code}' "$source_url")"; then
    fail "$source_url redirect chain could not be followed"
    return
  fi
  if [ "$final_status" != "200" ]; then
    fail "$source_url final_status=$final_status expected=200"
    return
  fi

  pass "$source_url -> $location -> 200"
}

check_canonical() {
  local url="$1"
  local expected="$2"
  local html

  if ! html="$(curl -sS --max-time 20 "$url")"; then
    fail "$url HTML could not be requested"
    return
  fi
  if printf '%s' "$html" | grep -Fq "rel=\"canonical\" href=\"$expected\""; then
    pass "$url canonical=$expected"
  else
    fail "$url canonical is missing or incorrect"
  fi
}

check_no_legacy_link() {
  local url="$1"
  local html

  if ! html="$(curl -sS --max-time 20 "$url")"; then
    fail "$url HTML could not be requested"
    return
  fi
  if printf '%s' "$html" | grep -Eiq "href=[\"']https://([^/]+\\.)?wortenprice\\.com"; then
    fail "$url contains a clickable legacy-domain link"
  else
    pass "$url has no clickable legacy-domain link"
  fi
}

check_noindex_meta() {
  local url="$1"
  local headers
  local html

  headers="$(curl -sSI --max-time 20 "$url" 2>/dev/null || true)"
  if printf '%s' "$headers" | grep -Eiq '^x-robots-tag:[[:space:]]*noindex([,[:space:]]+follow)?'; then
    pass "$url has an HTTP noindex directive"
    return
  fi

  if ! html="$(curl -sS --max-time 20 "$url")"; then
    fail "$url HTML could not be requested"
    return
  fi
  if printf '%s' "$html" | grep -Eiq "<meta[^>]+name=[\"']robots[\"'][^>]+content=[\"']noindex,follow[\"']"; then
    pass "$url has noindex,follow"
  else
    fail "$url is missing noindex,follow"
  fi
}

if [ "$skip_apex" = "1" ]; then
  pass 'https://wortenprice.com/ skipped until Aliyun DNS and TLS cutover'
else
  check_redirect 'https://wortenprice.com/' 'https://autopricy.com/'
fi
check_redirect 'https://www.wortenprice.com/' 'https://autopricy.com/'
check_redirect 'https://www.wortenprice.com/tiaojia.html' 'https://autopricy.com/#features'
check_redirect 'https://vip.wortenprice.com/' 'https://app.autopricy.com/'
check_redirect 'https://vip.wortenprice.com/help.html' 'https://app.autopricy.com/help.html'
check_redirect 'https://vip.wortenprice.com/privacy.html' 'https://app.autopricy.com/privacy.html'
check_redirect 'https://vip.wortenprice.com/terms.html' 'https://app.autopricy.com/terms.html'
check_status 'https://www.wortenprice.com/unknown-seo-migration-check' '410'
check_status 'https://vip.wortenprice.com/unknown-seo-migration-check' '410'
check_status 'https://autopricy.com/robots.txt' '200'
check_status 'https://autopricy.com/sitemap.xml' '200'
check_status 'https://autopricy.com/unknown-seo-migration-check' '404'
check_status 'https://app.autopricy.com/robots.txt' '200'
check_status 'https://app.autopricy.com/sitemap.xml' '410'

check_canonical 'https://autopricy.com/' 'https://autopricy.com/'
check_canonical 'https://autopricy.com/worten-repricer/' 'https://autopricy.com/worten-repricer/'
check_canonical 'https://autopricy.com/fnac-repricer/' 'https://autopricy.com/fnac-repricer/'
check_canonical 'https://autopricy.com/mirakl-repricer/' 'https://autopricy.com/mirakl-repricer/'

check_no_legacy_link 'https://autopricy.com/'
check_no_legacy_link 'https://app.autopricy.com/help.html'
check_noindex_meta 'https://app.autopricy.com/'
check_noindex_meta 'https://app.autopricy.com/help.html'
check_noindex_meta 'https://app.autopricy.com/privacy.html'
check_noindex_meta 'https://app.autopricy.com/terms.html'

if [ "$failures" -ne 0 ]; then
  printf '\n%d domain migration check(s) failed.\n' "$failures" >&2
  exit 1
fi

printf '\nAll domain migration checks passed.\n'
