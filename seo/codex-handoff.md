# SEO 后续任务清单（交给自动化工具执行）

更新日期：2026-10-04
对应代码：`main` 分支，提交 `6bf699a`（已合并 [Jarvan-via/Tailcast#1](https://github.com/Jarvan-via/Tailcast/pull/1)）

本文件是给自动化工具（Codex 等）的执行说明。按编号顺序做；每个任务都写了**前置条件、步骤、验收标准**。标记为 **【需要人工】** 的步骤涉及账号登录、验证码、付款或对外发布，自动化工具必须停下来，把需要的东西列给项目负责人，不要绕过、不要猜。

---

## 0. 通用规则（每个任务都要遵守）

### 0.1 先读这些文件
- `seo/README.md`：项目目标和工作规则
- `seo/progress.md`：Phase 5 部分是这次改动的完整记录
- `seo/product-capabilities.md`：**所有对外文案的能力边界**，写任何页面前必须对照

### 0.2 绝对不要做
- 不要编造产品能力、客户评价、销量、案例、排名或"保证拿到购物车 / 实时调价"之类的说法；不要宣传 Rakuten、Allegro、Catch、Mercado Libre（美客多）的自动调价，Fyndiq 只能说 Article 价格和库存管理。
- 不要把任何密钥、token、验证码、账号密码写进仓库或提交记录。百度推送 token 只能用环境变量 `BAIDU_PUSH_TOKEN` 传入。
- 不要直接改 `dist/` 里由脚本生成的页面。落地页和教程的内容在 `scripts/build-seo-pages.mjs`（英文）、`scripts/zh-pages.mjs`（中文落地页）、`scripts/build-guide-pages.mjs`（英文教程）、`scripts/zh-guides.mjs`（中文教程）里改，然后重新生成。`dist/index.html`（首页）和 `dist/platform.css` 是手写文件，可以直接改。
- 不要批量注册账号、绕过验证码、购买外链或做交换链接。

### 0.3 改了仓库里的任何页面后，必须运行
```bash
node scripts/build-seo-pages.mjs    # 重新生成所有落地页、教程、sitemap
node scripts/check-seo-pages.mjs    # 必须输出 "SEO checks passed"，有 FAIL 不能提交
```
如果新增或删除了页面，同时更新 `scripts/check-seo-pages.mjs` 末尾的 URL 数量（当前是 33）。

### 0.4 提交规范
- 提交信息用英文，格式参考已有历史：`feat(seo): ...`、`docs(seo): ...`、`fix(...): ...`
- 每完成一个任务，在 `seo/progress.md` 里补一段记录（日期、做了什么、证据），和改动放在同一个提交里。

---

## 1. 部署网站到生产服务器

**前置条件**：能 SSH 登录服务器 `ali`（生产网站目录 `/home/homepage/autopricy/dist`）。如果没有 SSH 权限 → **【需要人工】** 向负责人要访问方式。

**步骤**：
1. 在本地仓库 `main` 分支最新提交上执行 0.3 的两条命令，确认通过。
2. 备份线上目录（沿用之前的命名习惯）：
   ```bash
   ssh ali 'cp -a /home/homepage/autopricy/dist /home/homepage/autopricy/dist.backup-$(date +%Y%m%d)-phase5-6bf699a'
   ```
3. 同步文件（**不要用 `--delete`**，线上可能有仓库外的文件）：
   ```bash
   rsync -av dist/ ali:/home/homepage/autopricy/dist/
   ```
4. 回滚方法（出问题时）：把备份目录同步回去。

**验收标准**（在能访问公网的机器上运行）：
```bash
# sitemap 里 33 个地址全部返回 200
curl -s https://autopricy.com/sitemap.xml | grep -o '<loc>[^<]*' | sed 's/<loc>//' | while read u; do printf '%s %s\n' "$(curl -s -o /dev/null -w '%{http_code}' "$u")" "$u"; done
# 以下都应返回 200
curl -s -o /dev/null -w '%{http_code}\n' https://autopricy.com/438db09e85513490b9d62c07118a1572.txt
curl -s -o /dev/null -w '%{http_code}\n' https://autopricy.com/og/worten-zh.jpg
curl -s -o /dev/null -w '%{http_code}\n' https://autopricy.com/doc-images/detail.webp
# 线上 sitemap 和本地一致
diff <(curl -s https://autopricy.com/sitemap.xml) dist/sitemap.xml && echo sitemap-match
```
- 33 行全部是 `200`，IndexNow 密钥文件内容等于 `438db09e85513490b9d62c07118a1572`，最后输出 `sitemap-match`。
- 记录到 `seo/progress.md`。

---

## 2. 更新旧域名跳转（nginx）

**目的**：旧站 `wortenprice.com` 的 4 个中文关键词页面，原来 301 到首页锚点，现在改为跳到对应的中文页面。

| 旧地址 | 新目标 |
|---|---|
| `/tiaojia.html` | `https://autopricy.com/zh/multi-marketplace-repricing/` |
| `/zidong-tiaojia.html` | `https://autopricy.com/zh/features/automatic-repricing/` |
| `/jingzheng-tiaojia.html` | `https://autopricy.com/zh/features/automatic-repricing/` |
| `/piliang-tiaojia.html` | `https://autopricy.com/zh/features/multi-store-management/` |

**前置条件**：任务 1 已完成（新页面已上线，否则跳过去是 404）；有服务器 sudo 权限，否则 **【需要人工】**。

**步骤**：
1. 找到线上实际生效的配置位置：
   ```bash
   ssh ali 'sudo nginx -T 2>/dev/null | grep -n "server_name .*wortenprice.com\|# configuration file"'
   ```
2. 先备份线上配置文件，再把仓库里 4 个文件的对应 `location` 行同步过去（只改这 4 个 `location = /*tiaojia.html` 行，其余不动）：
   - `deploy/nginx/www.wortenprice.com.conf`（HTTP）
   - `deploy/nginx/www.wortenprice.com-https.conf`
   - `deploy/nginx/wortenprice.com-apex-http.conf`
   - `deploy/nginx/wortenprice.com-apex-https.conf`
3. 校验并重载：
   ```bash
   ssh ali 'sudo nginx -t && sudo systemctl reload nginx'
   ```
   `nginx -t` 失败就恢复备份，不要重载。

**验收标准**：
```bash
bash scripts/check-domain-migration.sh     # 全部 PASS，结尾没有 FAIL
```
（如果 apex 域名 `wortenprice.com` 的 DNS 不在这台服务器，可以用 `SKIP_APEX=1 bash scripts/check-domain-migration.sh`，并在记录里写明原因。）

把 `docs/seo-url-migration-map.md` 里这 4 行的 `Pending deploy` 改为 `Yes`，提交。

---

## 3. Google Search Console

**【需要人工】**：需要已验证 `https://autopricy.com/` 属性的 Google 账号登录。如果自动化工具能操作已登录的浏览器，可以按下面步骤执行；否则把这份清单交给负责人。

**步骤**：
1. 站点地图：重新提交 `https://autopricy.com/sitemap.xml`，记录"上次读取时间"和"已发现网址数"（目标 33）。
2. 网址检查 → 请求编入索引（每天有配额，优先顺序如下）：
   1. `https://autopricy.com/zh/worten-repricer/`
   2. `https://autopricy.com/zh/fnac-repricer/`
   3. `https://autopricy.com/zh/cdiscount-repricer/`
   4. `https://autopricy.com/zh/onbuy-repricer/`
   5. `https://autopricy.com/zh/darty-repricer/`
   6. `https://autopricy.com/zh/mirakl-repricer/`
   7. `https://autopricy.com/zh/multi-marketplace-repricing/`
   8. `https://autopricy.com/zh/guides/`
   9. `https://autopricy.com/guides/`
   10. 其余 `/zh/features/…` 和 `/zh/guides/…` 页面
3. 把每个地址的检查结果（已编入索引 / 已发现未编入 / 未知）写进 `seo/gsc-baseline.md` 新的一节。

**验收标准**：sitemap 重新提交成功；前 9 个地址都已请求编入索引；结果已记录并提交。

---

## 4. 必应 Bing Webmaster Tools + IndexNow

**说明**：必应的数据也供 ChatGPT 搜索、Copilot 使用。

**步骤**：
1. **【需要人工】** 用微软账号登录 https://www.bing.com/webmasters ，选择"从 Google Search Console 导入"添加 `https://autopricy.com/`（最省事，不需要另外验证）。
2. **【需要人工】** 在 Bing Webmaster 里提交 sitemap：`https://autopricy.com/sitemap.xml`。
3. 推送所有地址到 IndexNow（任务 1 完成后才能做，自动化可执行）：
   ```bash
   node scripts/submit-urls.mjs            # 先空跑，确认列出 33 个地址
   node scripts/submit-urls.mjs --send     # 正式推送
   ```

**验收标准**：IndexNow 返回 `HTTP 200` 或 `HTTP 202`；把输出记进 `seo/progress.md`。

---

## 5. 百度搜索资源平台

**说明**：网站有 ICP 备案（京ICP备2026039016号），可以做百度收录。

**步骤**：
1. **【需要人工】** 登录 https://ziyuan.baidu.com ，添加站点 `https://autopricy.com`，选择"HTML 标签验证"，把百度给的完整 `<meta name="baidu-site-verification" ...>` 标签交给自动化工具。
2. 自动化执行：把这个 meta 标签加到 `dist/index.html` 的 `<head>` 里，紧挨着现有的 `google-site-verification` 那一行；运行 0.3 的检查；提交；按任务 1 部署。
3. **【需要人工】** 回到百度后台点"完成验证"。
4. **【需要人工】** 在"普通收录 → sitemap"提交 `https://autopricy.com/sitemap.xml`；在"普通收录 → API 提交"复制推送 token。
5. 自动化执行（token 只通过环境变量传入，不要写进文件）：
   ```bash
   BAIDU_PUSH_TOKEN=<token> node scripts/submit-urls.mjs --send --only=/zh/   # 第一天：只推中文页
   BAIDU_PUSH_TOKEN=<token> node scripts/submit-urls.mjs --send               # 第二天：推全部地址（百度有每日配额，响应里的 remain 是剩余额度）
   ```

**验收标准**：百度后台显示验证成功；推送返回 `HTTP 200` 且响应里 `success` 大于 0；记录到 `seo/progress.md`（不要记录 token）。

---

## 6. 帮助中心迁移到主站（自动化可完成大部分）

**目的**：现在的帮助中心 `https://app.autopricy.com/help.html` 是 `noindex`，搜索引擎不收录。卖家常搜的操作问题（"Worten API 怎么授权""怎么批量导入价格"等）应该做成主站上可收录的中文教程。

**前置条件**：能读取帮助页面的源文件。线上应用目录在服务器上（参考 `deploy/nginx/vip.wortenprice.com.server.conf` 里的 `root /home/homepage/wortener/dist`；`app.autopricy.com` 的实际目录用 `sudo nginx -T` 确认）。拿不到源文件 → **【需要人工】** 请负责人提供 `help.html`。

**步骤**：
1. 读取 `help.html`，按主题拆分成独立教程（每个主题一页），例如：店铺授权（按平台）、同步商品、设置调价规则、批量导入导出、调价时间设置、商品采集插件。
2. 新建数据文件 `scripts/zh-help.mjs`，复用 `scripts/build-guide-pages.mjs` 的教程模板（中文 locale），输出到 `dist/zh/help/<slug>/`，并加一个 `/zh/help/` 汇总页；把新地址加进 sitemap 生成逻辑和检查脚本的 URL 数量。
3. 图片使用 `dist/doc-images/` 里已有的截图，转为 WebP（`convert x.png -quality 82 -define webp:method=6 x.webp`），写清楚中文 `alt`。截图里如果有真实卖家数据，**不要使用**，列给负责人确认。
4. 内容只能来自帮助文档本身和 `seo/product-capabilities.md`，不要补写帮助文档里没有的功能。
5. 在中文平台页的"相关页面"、中文页脚、首页页脚里链接 `/zh/help/`。
6. **不要**删除或修改 `app.autopricy.com/help.html`（应用内仍在使用）；它保持 `noindex`。
7. 运行 0.3，浏览器检查桌面 1440px 和手机 390px 没有横向溢出，提交，按任务 1 部署，再按任务 3–5 推送新地址。

**验收标准**：每篇教程有唯一的 title/description、一个 H1、FAQ（可选）、指向对应平台页的链接；检查脚本通过；上线后新地址返回 200。

---

## 7. 外链和渠道（大部分需要人工）

### 7.1 软件目录（按 `seo/backlinks/` 现有流程）
**【需要人工】** 原授权（G2、SaaSHub 等）已于 2026-09-25 过期，必须由负责人重新授权后才能提交。候选和每个站点的要求见 `seo/backlinks/backlinks.csv` 和 `seo/backlinks/submission-record-2026-08-25.md`；产品资料统一用 `seo/backlinks/product-master-data.md`。每次最多 10 个，逐个记录在 `backlinks.csv`。

### 7.2 平台官方合作伙伴目录（相关性最高）
**【需要人工】** 由负责人以公司身份申请：Octopia/Cdiscount 合作伙伴、Mirakl 合作伙伴目录、OnBuy 服务商、Worten 服务商。自动化工具可以先做：查找各平台当前的申请入口和要求，整理成 `seo/backlinks/partner-programs.md`（只记录官方页面上能查到的信息并附链接）。

### 7.3 Chrome 网上应用店
**【需要人工】** 需要开发者账号（一次性 5 美元）和插件源码。上架后把应用店链接加到首页和 `product-master-data.md`。

### 7.4 中文渠道内容（自动化可起草，发布需要人工）
自动化工具可以起草，保存到 `seo/content-drafts/`（新建目录）：
- 3 篇知乎/公众号文章，主题建议：《Worten 购物车规则和自动调价实操》《Cdiscount 平台底价功能和第三方调价怎么选》《OnBuy 卖家怎么避免价格战》。以 `scripts/zh-guides.mjs` 的内容为基础改写，结尾附 `https://autopricy.com/zh/...` 对应链接。
- 一份 200 字左右的产品介绍，用于跨境导航站收录（AMZ123 类网站）。

**【需要人工】** 由负责人审核后用公司账号发布。不要用自动化工具注册账号或发布。

---

## 8. 其他技术优化（自动化可完成）

1. **静态资源缓存头**：线上图片、CSS 没有 `Cache-Control`。在 `autopricy.com` 的 nginx server 块里加（先 `sudo nginx -T` 看现有配置，避免和已有 `location` 冲突）：
   ```nginx
   location ~* \.(?:css|js|jpg|jpeg|png|webp|svg|ico|woff2?)$ {
       try_files $uri =404;
       add_header Cache-Control "public, max-age=2592000";
   }
   ```
   HTML、`robots.txt`、`sitemap.xml` 不加长缓存。`nginx -t` 通过再重载；用 `curl -sI https://autopricy.com/platform.css` 确认响应头。同步把这段写进 `deploy/nginx/autopricy-seo-guards.conf` 作为记录。
2. **性能测量**：用 PageSpeed Insights（https://pagespeed.web.dev/ ）或本地 Lighthouse 测首页、`/zh/worten-repricer/`、`/worten-repricer/` 的手机和桌面得分，把 LCP、CLS、INP/TBT 的具体数值写进 `seo/technical-audit.md` 的 Performance 部分。不要编造分数，测不到就写明原因。
3. **英文页联系方式**：英文落地页 CTA 里的联系邮箱是个人 Gmail（`yuanyongvia@gmail.com`，在 `scripts/build-seo-pages.mjs` 的 `locales.en.cta`）。**【需要人工】** 由负责人决定是否换成公司域名邮箱；提供新邮箱后由自动化替换并重新生成。

---

## 9. 定期复查（部署后第 7 天和第 14 天）

**【需要人工】**（需要 Search Console / 百度后台登录）或由能登录的自动化执行：
1. Google：`/zh/` 页面的收录状态；英文落地页（尤其 `/worten-repricer/`，基线 56 次展示 0 次点击）的展示、点击、点击率、平均排名。
2. 百度：`site:autopricy.com/zh/` 的收录数量。
3. Umami：`seo_zh_` 开头的注册点击事件数量（中文页带来的注册意向）。
4. 把数据追加到 `seo/gsc-baseline.md`，和 2026-08-24 的基线对比，提交。

如果某个页面 14 天后仍"已发现未编入索引"，在记录里写明，并检查该页内容是否和其他页面过于相似；不要为了收录而批量新建页面。
