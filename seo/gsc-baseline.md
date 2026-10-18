# Google Search Console Baseline

Captured: 2026-08-24

Property: URL-prefix `https://autopricy.com/`

The currently logged-in account can access the verified URL-prefix property. The Domain property `sc-domain:autopricy.com` is not accessible to this account, so this file reports only the canonical HTTPS site covered by the URL-prefix property.

## Search performance — trailing 3 months

| Metric | Value |
|---|---:|
| Clicks | 7 |
| Impressions | 129 |
| CTR | 5.4% |
| Average position | 15.6 |

### Visible queries

Search Console reported nine query rows; eight named rows were visible in the captured table.

| Query | Clicks | Impressions |
|---|---:|---:|
| `worten repricing` | 0 | 35 |
| `repricer fnac` | 0 | 8 |
| `fnac repricing` | 0 | 7 |
| `repricing mirakl` | 0 | 3 |
| `worten repricer` | 0 | 2 |
| `fnac repricing tool` | 0 | 2 |
| `repricing fnac` | 0 | 1 |
| `worten repricing tool` | 0 | 1 |

This is early but useful validation: Google is already testing Autopricy for the exact vertical commercial terms targeted by the first landing pages.

### Pages

| Page | Clicks | Impressions |
|---|---:|---:|
| `https://autopricy.com/` | 4 | 37 |
| `https://autopricy.com/mirakl-repricer/` | 3 | 20 |
| `https://autopricy.com/worten-repricer/` | 0 | 56 |
| `https://autopricy.com/fnac-repricer/` | 0 | 34 |

### Countries / regions

| Country / region | Clicks | Impressions |
|---|---:|---:|
| Japan | 2 | 22 |
| Hong Kong | 1 | 8 |
| Maldives | 1 | 3 |
| Singapore | 1 | 1 |
| Portugal | 1 | 1 |
| Mexico | 1 | 1 |
| United States | 0 | 28 |
| United Kingdom | 0 | 23 |
| Netherlands | 0 | 19 |
| France | 0 | 9 |

### Devices

The device table displayed desktop `6 clicks / 126 impressions` and mobile `3 clicks / 3 impressions`. Those click rows sum to nine while the report header shows seven total clicks. Keep the header total as the baseline KPI and treat the device split as a GSC reporting discrepancy until the next export confirms it.

## Sitemap

- Existing sitemap: `https://autopricy.com/sitemap.xml`
- Previous state before refresh: submitted 2026-07-16, last read 2026-08-19, status success, four discovered pages.
- Action on 2026-08-24: resubmitted successfully after the production sitemap expanded to 11 canonical URLs.
- Expected lag: the discovered-page count will remain four until Google rereads the refreshed sitemap.

## Priority URL inspections

| URL | GSC state on 2026-08-24 | Action |
|---|---|---|
| `/worten-repricer/` | Indexed | Re-indexing requested successfully |
| `/fnac-repricer/` | Indexed | Re-indexing requested; UI shows request is already queued |
| `/mirakl-repricer/` | Indexed | Re-indexing requested; UI shows request is already queued |
| `/darty-repricer/` | Discovered, currently not indexed | Indexing requested successfully |
| `/onbuy-repricer/` | Discovered, currently not indexed | Indexing requested successfully |
| `/cdiscount-repricer/` | URL unknown to Google | Indexing requested successfully |

An indexing request is not proof of indexing. Recheck the three non-indexed URLs and the sitemap discovered-page count after Google has had time to crawl them.

## Next GSC checks

1. Recheck sitemap last-read date and discovered URLs in 3–7 days.
2. Reinspect Darty, OnBuy and Cdiscount; preserve the exact exclusion reason if unchanged.
3. Inspect the remaining five sitemap URLs: multi-marketplace plus the three feature pages and homepage if a fresh crawl is needed.
4. Export Core Web Vitals and Page Indexing once Google has enough data for the new URL set.
5. Create or grant access to the Domain property only if subdomain-wide reporting is needed; the URL-prefix property is sufficient for the public SEO site.

## Phase 5 deployment baseline — 2026-10-04

Property: verified URL-prefix `https://autopricy.com/`; existing Chrome session was accessible.

- Re-submitted `sitemap.xml` after the 45-URL release. GSC displayed “已成功提交站点地图”; submitted date changed to 2026-10-04.
- At that moment, the last read was still 2026-09-25, status success, 16 discovered pages and 0 videos. The new public sitemap has 45 URLs, but discovery is not yet confirmed at 45.
- The existing performance report showed 19 clicks, 653 impressions, CTR 2.9%, average position 14.9; its displayed chart ranged 2026-07-15 to 2026-09-29. These are the values and dates visible in the current report, not a new post-release result. The 2026-08-24 reference was 7 clicks / 129 impressions / 5.4% CTR / position 15.6 with a different reporting window, so do not claim a like-for-like improvement.

| Priority URL | Status before request | Request result |
|---|---|---|
| https://autopricy.com/zh/worten-repricer/ | Unknown to Google; not indexed | “已请求编入索引”; added to priority crawl queue |
| https://autopricy.com/zh/fnac-repricer/ | Unknown to Google; not indexed | “已请求编入索引”; added to priority crawl queue |
| https://autopricy.com/zh/cdiscount-repricer/ | Inspection did not finish; status unknown | Not requested; GSC retrieval stalled |
| https://autopricy.com/zh/onbuy-repricer/ | Not checked yet | Pending |
| https://autopricy.com/zh/darty-repricer/ | Not checked yet | Pending |
| https://autopricy.com/zh/mirakl-repricer/ | Not checked yet | Pending |
| https://autopricy.com/zh/multi-marketplace-repricing/ | Not checked yet | Pending |
| https://autopricy.com/zh/guides/ | Not checked yet | Pending |
| https://autopricy.com/guides/ | Not checked yet | Pending |

Cdiscount inspection stalled at “正在从 Google 索引检索数据”. Rebinding the browser window and reloading the current inspection then the property overview produced a blank content area. No result or request confirmation was obtained. Browser control also reported `noWindowsAvailable`; this is an observed access/UI failure, not evidence of an indexing quota or a page defect. The remaining seven priority requests are incomplete and should resume from Cdiscount after GSC is accessible.

A successful index request is not proof that Google indexed the page. Help pages and remaining features/guides follow after the first nine priorities, subject to quota and human verification requirements.

Day-7 and day-14 follow-up: 2026-10-11 and 2026-10-18 at 10:00 Asia/Shanghai, active thread heartbeat `tailcast-seo-7-14`. Compare current page-level GSC data, Baidu indexing when verified, and Umami `seo_zh_` registration-click events. Missing access/data remains unknown; clicks are registration intent, not completed registrations.

## 第 7 天复查 — 2026-10-11

本次提醒实际触发于北京时间 2026-10-11 18:00:46（heartbeat 时间 `2026-10-11T10:00:46.210Z`），以下为触发后通过现有 Chrome 登录会话读取的数据。GSC 属性仍为已验证的 URL-prefix `https://autopricy.com/`，搜索类型为网络。本次仅查询，没有重新提交 sitemap 或申请索引。

### Sitemap 与线上可访问性

- GSC `/sitemap.xml`：提交日期 2026-10-04，上次读取 2026-10-04，状态“成功”，已发现网页 **45**，视频 0。相比 10 月 4 日刚提交时的上次读取 2026-09-25 / 16 个网页，Google 已重新读取并发现全部 45 个网址；发现不等于编入索引。
- 公网 sitemap HTTP 200，45 个不重复网址；逐个 HEAD 检查 **45/45 HTTP 200**，无异常。SHA-256 仍为 `6eec3c4e59adfd8d69109436db5fa968bf928ed886ba3892aea94c0e728f73f0`，与部署记录一致。
- 全站网页索引报告显示“已编入索引 18 / 未编入索引 5”，但上次更新为 **2026-10-04**；5 个排除原因是“已抓取 - 尚未编入索引”。这是滞后的全站报告，不能作为今天中文页或 45 个 sitemap 网址的收录总数。

### 中文重点页 URL 检查

| 地址（均在 https://autopricy.com 下） | 2026-10-11 实际结果 | 对照 10 月 4 日记录 |
|---|---|---|
| `/zh/worten-repricer/` | 网址已收录到 Google；网页已编入索引 | 从未知 / 未收录变为已收录 |
| `/zh/fnac-repricer/` | 网址已收录到 Google；网页已编入索引 | 从未知 / 未收录变为已收录 |
| `/zh/cdiscount-repricer/` | 网址已收录到 Google；网页已编入索引 | 上次检查停滞，本次取得结果 |
| `/zh/onbuy-repricer/` | 网址已收录到 Google；网页已编入索引 | 上次未检查 |
| `/zh/darty-repricer/` | 网址已收录到 Google；网页已编入索引 | 上次未检查 |
| `/zh/mirakl-repricer/` | 网址已收录到 Google；网页已编入索引 | 上次未检查 |
| `/zh/multi-marketplace-repricing/` | 网址已收录到 Google；网页已编入索引 | 上次未检查 |
| `/zh/guides/` | 网址已收录到 Google；网页已编入索引 | 上次未检查 |
| `/zh/help/` | 网址已收录到 Google；网页已编入索引 | 新帮助中心目录，本次确认 |

Worten 上次抓取时间显示 2026-10-07 06:21:46，FNAC 为 2026-10-07 03:53:56（按 GSC 界面原值记录，界面未标时区）；两者均由 Googlebot 智能手机版成功抓取，允许抓取和编入索引，Google 选择的规范网址为所检查的网址。Worten 的“发现 → 站点地图”子字段同时显示“临时处理错误”，FNAC 显示本 sitemap；前者不改变本次明确显示的已收录结果，留待第 14 天复核。

本次明确确认 **9 个中文重点页**，sitemap 中共有 28 个 `/zh/` 网址，其余 19 个未逐页检查，状态未知；不能将此表推算为全部中文页已收录。2026-08-24 尚无这批中文页的可比基线。

### 搜索表现与 2026-08-24 基线对照

| 范围 | 日期窗口 | 点击 | 展示 | CTR | 平均排名 |
|---|---|---:|---:|---:|---:|
| 全站 2026-08-24 基线 | 当时过去三个月 | 7 | 129 | 5.4% | 15.6 |
| 全站本次读取 | 图表 2026-07-15 至 2026-10-08 | 20 | 754 | 2.7% | 15.4 |
| 英文 `/worten-repricer/` 2026-08-24 基线 | 当时过去三个月 | 0 | 56 | 0%（由点击 / 展示计算） | 未记录 |
| 英文 `/worten-repricer/` 本次精确 URL 筛选 | 图表 2026-07-15 至 2026-10-08 | 3 | 150 | 2% | 8.6 |
| 英文 `/worten-repricer/` 部署后精确 URL 筛选 | 自定义 2026-10-04 至 2026-10-08 | 0 | 7 | 0% | 5.9 |

GSC 显示上次更新为 63 小时前，最新数据到 10 月 8 日；10 月 9–11 日数据未取得，不记为 0。三个月窗口与 8 月 24 日基线不同，累计展示 / 点击变化不能归因于本次部署或标题调整。部署后仅有 7 次展示、0 次点击，样本仍不足以判断 CTR 改善；基线未记录 Worten 平均排名，不能计算其排名变化。

### Umami 中文注册点击意向

- 已登录站点 `autopricy`（website ID `20f3ddd5-3c5b-4b32-91ca-6db0ff7ade94`），通过界面选择自定义 **2026-10-04 至 2026-10-10**，并在活动日志搜索 `seo_zh_`。
- 明确读到至少 **6 次**注册点击：`seo_zh_multi-marketplace-repricing_register_header` 至少 3 次，`seo_zh_multi-marketplace-repricing_register_hero` 至少 3 次。可见记录均在 10 月 9 日：header 为 17:20:15、16:38:05、16:06:58；hero 为 17:20:14、17:20:13、17:20:12（按界面原值）。
- **筛选后的完整总数未知**。页面的辅助功能树在筛选后丢失正文，滚动、重绑窗口、恢复缩放和刷新后仍未可靠取得完整表尾 / 分页。浏览器查找匹配数也不是事件总数，未将其写入 KPI；未筛选的全站事件数不能替代中文 SEO 事件数。
- 上述为已确认下限，不是独立用户数；连续点击可能来自同一会话。事件只表示点击注册入口的意向，不能证明完成注册，也没有证明它们全部来自自然搜索。2026-08-24 无此事件数量基线，增长幅度未知。

### 百度与下一次复查

尝试打开 `https://ziyuan.baidu.com/` 并重试，但未加载出可读后台，浏览器仍显示新标签页正文；本次无法确认登录 / 站点验证状态，中文页收录数 **未知**。没有输入凭证、处理验证码、获取 token 或用公开搜索结果替代后台数据。10 月 4 日记录的人工登录 / 验证条件尚无新的完成证据，不重复发送同一登录提醒。

本轮为 **部分完成**：GSC 重点页与搜索表现、45 个网址可访问性已核实；百度后台收录和 Umami 完整事件总数未取得。保留 `tailcast-seo-7-14` 的 2026-10-18 第二次复查，届时复核上述未知项和其余中文页；两轮复查结束后结束提醒。

## 第 14 天复查 — 2026-10-18

实际 heartbeat 触发于北京时间 2026-10-18 18:01:33（`2026-10-18T10:01:33.060Z`）。通过现有 Chrome 登录会话读取 GSC URL-prefix `https://autopricy.com/` 和 Umami；本次为只读复查，没有提交新的索引请求、sitemap 或外部消息。

### Sitemap 与中文页索引

- GSC `/sitemap.xml`：提交日期仍为 2026-10-04，**上次读取 2026-10-13，成功，发现 45 个网页、0 个视频**。相比第 7 天，读取时间从 10 月 4 日更新到 10 月 13 日，发现数保持 45。
- 全站索引报告**更新于 2026-10-12**：44 个已收录，1 个“已发现 - 尚未编入索引”，0 个“已抓取 - 尚未编入索引”。第 7 天看到的是更新于 10 月 4 日的 18 / 5；这反映报告快照推进，不能将数量差直接称为过去一周的新增收录。
- 展开已收录清单到每页 50 行，界面显示“第 1-44 行，共 44 行”；读取全部 44 个唯一网址，其中 **27 个 `/zh/` 页面已收录**。未收录清单只有 `/zh/help/onbuy-listings/` 一项，对应中文 sitemap 总数 28。收录统计以 10 月 12 日报告快照为准，不冒充 10 月 18 日逐页实时检查。

| 中文页面组 | 已收录数 / sitemap 数 | 已收录清单覆盖（均在 `/zh/` 下） |
|---|---:|---|
| 平台及多平台落地页 | 7 / 7 | `worten-repricer/`、`fnac-repricer/`、`darty-repricer/`、`onbuy-repricer/`、`cdiscount-repricer/`、`mirakl-repricer/`、`multi-marketplace-repricing/` |
| 功能页 | 3 / 3 | `features/automatic-repricing/`、`features/min-max-price-rules/`、`features/multi-store-management/` |
| 教程及目录 | 6 / 6 | `guides/`，以及 `guides/` 下的 `worten-automatic-repricing/`、`fnac-darty-repricing/`、`onbuy-winning-offer/`、`cdiscount-repricing/`、`mirakl-repricing/` |
| 帮助中心及教程 | 11 / 12 | `help/`，以及 `help/` 下的 `worten-api-authorization/`、`shop-binding/`、`offer-sync/`、`price-rule-import-export/`、`repricing-schedule/`、`mirakl-batch-follow-selling/`、`cdiscount-api-and-offers/`、`bulk-operations/`、`invoice-operations/`、`product-collection-extension/` |

另用 URL 检查复核中文 Worten：仍已收录，规范网址为自身，Googlebot 智能手机版上次成功抓取时间仍为 2026-10-07 06:21:46（界面原值，未标时区）。其“发现 → 站点地图”本次正常显示 `https://autopricy.com/sitemap.xml`，不再显示上次的“临时处理错误”。

### 14 天仍未收录页面检查

`https://autopricy.com/zh/help/onbuy-listings/` 当前 URL 检查明确显示“网址尚未收录到 Google / 已发现 - 尚未编入索引”；由 sitemap 和 `/zh/help/` 发现，上次抓取时间、抓取结果和 Google 规范网址均为“不适用”。它仍没有已抓取的证据，不能据此诊断为重复内容排除。

- 线上 GET 为 HTTP 200，与本地生成页面字节一致；没有 `X-Robots-Tag` 限制，meta 为 `index, follow, max-image-preview:large`，canonical 指向自身；45 页检查脚本通过，未见明显的访问或索引配置问题。
- 复核 `scripts/zh-help.mjs` 的正文及生成文章，与其他中文页共用导航、模板和试用 CTA，但核心围绕“地区与 OPC → Product 和 Listing 区分 → 创建同步 Listing → 最低价及待确认反馈”。与 OnBuy 平台介绍、购物车教程及 Cdiscount/Mirakl 操作教程的内容目的不同，未见整篇复制。
- 文章较短，后续可结合真实界面补充 OPC 查找、地区选择和异常反馈示例；目前没有证据证明“过于相似”是未收录原因。本轮未为收录批量新增页面、改写能力或发送新索引请求。

### 搜索表现对照

| 范围与采集时间 | 报告日期窗口 | 点击 | 展示 | CTR | 平均排名 |
|---|---|---:|---:|---:|---:|
| 全站 2026-08-24 基线 | 当时过去三个月 | 7 | 129 | 5.4% | 15.6 |
| 全站第 7 天 | 2026-07-15 至 2026-10-08 | 20 | 754 | 2.7% | 15.4 |
| 全站第 14 天 | 2026-07-17 至 2026-10-16 | 23 | 873 | 2.6% | 14.9 |
| 英文 Worten 2026-08-24 基线 | 当时过去三个月 | 0 | 56 | 0%（计算值） | 未记录 |
| 英文 Worten 第 7 天 | 2026-07-15 至 2026-10-08 | 3 | 150 | 2% | 8.6 |
| 英文 Worten 第 14 天 | 2026-07-17 至 2026-10-16 | 3 | 160 | 1.9% | 8.2 |
| 英文 Worten 部署后（第 7 天所见） | 2026-10-04 至 2026-10-08 | 0 | 7 | 0% | 5.9 |
| 英文 Worten 部署后（本次） | 2026-10-04 至 2026-10-16 | 0 | 19 | 0% | 4.9 |

英文 Worten 均为“完全匹配的网址 `https://autopricy.com/worten-repricer/`”，搜索类型为网络。本次 GSC 显示“上次更新日期：3.5 小时前”，最新图表日期为 10 月 16 日；10 月 17–18 日未取得，保留未知。三个月窗口之间存在日期差异，不能直接视为相同周期增长；部署后 19 次展示仍没有点击，样本不足以证明标题调整改善了 CTR。8 月 24 日未记录该页平均排名，不能计算相对原基线的排名变化。

### Umami：完整日志确认 6 次注册意向点击

已登录 `autopricy`（website ID `20f3ddd5-3c5b-4b32-91ca-6db0ff7ade94`），自定义 **2026-10-04 至 2026-10-17**。在活动日志搜索 `seo_zh_` 后，通过浏览器页面全选的可访问文本读取完整筛选日志，确认 **6 条记录，未出现分页**；不再使用上次的可见行下限或浏览器查找匹配数代替总数。

| 事件 | 次数 | 日期及时间（Umami 界面原值） |
|---|---:|---|
| `seo_zh_multi-marketplace-repricing_register_header` | 3 | 2026-10-09 17:20:15、16:38:05、16:06:58 |
| `seo_zh_multi-marketplace-repricing_register_hero` | 3 | 2026-10-09 17:20:14、17:20:13、17:20:12 |

因此，本次所选完整日志中 10 月 4–10 日为 6 次，10 月 11–17 日没有新增匹配记录。第 7 天仅能确认至少 6 次，本次补齐其总数；2026-08-24 无对应事件数量基线，不能计算长期增长率。点击可能来自重复操作或同一会话，**只表示注册意向，不等于完成注册、独立注册人数或已证明的自然搜索转化**；未用全站 `registration_completed` 等事件替代中文 SEO 归因。

### 百度、线上验收及提醒结束

百度资源平台本次可以加载，但首页明确显示“登录”，没有已登录且已验证站点的后台数据。按任务约束在该步骤停止，没有登录、输入凭证、处理验证码或获取 token；中文页收录数仍为 **未知**，不记为 0。此前人工登录 / 验证条件没有完成证据，不重复发送同一登录提醒。

公网 sitemap HTTP 200，45 个唯一网址（中文 28 个），逐个 HEAD **45/45 返回 200**；SHA-256 仍为 `6eec3c4e59adfd8d69109436db5fa968bf928ed886ba3892aea94c0e728f73f0`。本地 `node scripts/check-seo-pages.mjs` 检查 45 页，通过且 0 warnings。

两次计划复查均已执行：GSC、Umami 和线上可访问性本轮已核实，百度数据仍受登录条件阻塞。按“两次复查后结束本提醒”的要求，已将 `tailcast-seo-7-14` 设为 **PAUSED** 并核对持久化状态，不再继续自动提醒；保留记录供后续人工登录后补查。本次只追加文档，没有部署网站或发布内容。
