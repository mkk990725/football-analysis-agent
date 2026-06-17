# 数据源策略

本项目不做任意网站爬取。服务端只允许访问白名单数据源，并缓存结果，避免前端页面依赖一次性的静态数据。

## 第一阶段已接入

- ESPN FIFA World Cup scoreboard
  - 用途：赛程、比分、比赛状态、部分盘口摘要、球队 squad 链接
  - 入口：`https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard`
  - 服务接口：`/api/scoreboard?dates=YYYYMMDD`

## 后续建议接入

- FIFA 官方：赛程、官方大名单、官方首发、比赛报告
- 国家队/足协官方：伤停、发布会、训练动态
- ESPN / FBref / Transfermarkt：球员年龄、身高体重、效力俱乐部、联赛等级、近期数据

## 不直接作为事实源

- 小红书、微博、Reddit 等社交平台
  - 可用于中文名称、舆情、线索发现
  - 不直接作为事实判断依据

## 安全规则

- 只访问白名单域名
- 不执行网页内脚本
- 不抓取登录态或个人数据
- 所有同步数据写入本地 `.cache/`
- 大模型只负责总结和比对来源，不直接制造事实
