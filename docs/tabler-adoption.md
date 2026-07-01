# Tabler 风格接入说明

本项目参考 `tabler/tabler` 的后台 UI 方向，但不直接整包引入 Bootstrap 或 Tabler 源码，避免和现有 Vue、Naive UI、原生页面样式冲突。

## 已接入的可用部分

- 视觉基调：白色后台、浅灰页面背景、蓝色主操作色、低阴影卡片。
- 布局节奏：固定左侧导航、主内容区卡片化、紧凑表单、清晰的 section header。
- 组件语义：badge/tag、primary/secondary button、empty state、状态提示、卡片、列表项。
- 响应式原则：桌面侧边栏，移动端导航压缩，内容卡片单列。

## 本地资产

- `tabler-adapter.css`：原生 HTML 页面使用的 Tabler 风格适配层。
- `src/predict/PredictConsole.vue`：预测模块使用 scoped CSS，已在组件底部加入同风格覆盖。

## 没有直接引入的部分

- 没有引入 `@tabler/core`，因为它基于 Bootstrap，当前项目已有自定义样式和 Naive UI，整包接入会增加冲突面。
- 没有复制 Tabler demo 页面源码，只提取适合本项目的后台视觉语言。
- 没有引入外部 CDN，页面仍可本地独立运行。

## 后续扩展建议

- 如需更完整的图标体系，优先安装 `@tabler/icons` 或 `@tabler/icons-vue`，再集中封装图标按钮。
- 如需统一更多组件，可继续把表格、统计卡、tabs、toast 的样式沉淀到 `tabler-adapter.css`。
