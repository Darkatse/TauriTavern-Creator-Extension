# 宿主 API 映射

本文档列出了本扩展使用的所有 TauriTavern API。适用于以下场景：

- 添加需要宿主能力的新功能
- 检查宿主 API 升级是否影响本扩展
- 了解扩展与宿主之间的边界

---

## 访问模式

所有的宿主访问均通过 `src/host/client.ts` 路由。扩展绝不直接访问：

- `window.__TAURITAVERN__`
- `window.__TAURITAVERN_MAIN_READY__`
- 宿主的内部 DOM 元素
- 宿主的内部事件名

如果需要使用新的宿主 API，正确的流程为：

1. 确认该 API 属于 TauriTavern 的 [公开 ABI](https://github.com/Darkatse/TauriTavern)
2. 将能力字符串 (capability) 添加到 `src/host/client.ts` 中的 `HostCapability`
3. 在功能模块的 `capabilities` 数组中声明该能力
4. 通过控制器进行调用——绝不要在 Vue 组件中直接调用

---

## 能力注册表

```ts
type HostCapability =
  | 'layout'
  | 'chat'
  | 'dev.frontendLogs'
  | 'dev.backendLogs'
  | 'dev.llmApiLogs'
  | 'worldInfo';
```

功能模块需声明其依赖的能力。注册表会自动隐藏所需能力不可用的功能。

---

## 各功能模块的 API 使用情况

### 布局契约（Layout）

**所需能力:** `layout`

Creator Extension 的 UI（悬浮气泡、全屏面板）需要稳定消费移动端 safe-area / viewport / Android IME 语义。
本模板不再自行测量/监听，而是直接订阅宿主 ABI：

| API | 用途 |
|-----|---------|
| `api.layout.snapshot()` | 读取当前 `safeInsets / safeFrame / viewport` |
| `api.layout.subscribe(cb)` | 订阅布局变更（包含 IME 路由变化） |

### 世界书监视器 (World Book Monitor)

**所需能力:** `worldInfo`

| API | 用途 |
|-----|---------|
| `api.worldInfo.getLastActivation()` | 获取最近一次世界书激活批次 |
| `api.worldInfo.subscribeActivations(cb)` | 实时订阅新批次 |
| `api.worldInfo.openEntry({ world, uid })` | 在宿主的世界书编辑器中打开条目 |

### AI 请求记录 (AI Request History)

**所需能力:** `dev.llmApiLogs`

| API | 用途 |
|-----|---------|
| `api.dev.llmApiLogs.index()` | 获取最近的 AI 请求日志列表 |
| `api.dev.llmApiLogs.subscribeIndex(cb)` | 订阅新日志条目 |
| `api.dev.llmApiLogs.getPreview(id)` | 获取格式化后的日志预览 |
| `api.dev.llmApiLogs.getRaw(id)` | 获取原始的 JSON 请求/响应载荷 |
| `api.dev.llmApiLogs.getKeep()` | 读取当前的日志保留数上限 |
| `api.dev.llmApiLogs.setKeep(n)` | 设置日志保留数上限 |

### 应用日志 (Application Logs)

**所需能力:** `dev.frontendLogs`, `dev.backendLogs`

| API | 用途 |
|-----|---------|
| `api.dev.frontendLogs.list({ limit })` | 获取最近的前端日志条目 |
| `api.dev.frontendLogs.subscribe(cb)` | 订阅新的前端日志条目 |
| `api.dev.frontendLogs.getConsoleCaptureEnabled()` | 检查是否已开启完整控制台捕获 |
| `api.dev.frontendLogs.setConsoleCaptureEnabled(v)` | 切换完整控制台捕获状态 |
| `api.dev.backendLogs.tail({ limit })` | 获取最近的后端日志条目 |
| `api.dev.backendLogs.subscribe(cb)` | 订阅新的后端日志条目 |

### 聊天记忆搜索 (Chat Memory Search)

**所需能力:** `chat`

| API | 用途 |
|-----|---------|
| `api.chat.current.handle()` | 获取当前聊天会话的句柄 |
| `api.chat.current.windowInfo()` | 获取上下文信息（模式、类型、引用、窗口范围） |
| `handle.locate.findLastMessage(opts)` | 查找符合条件的最新消息 |
| `handle.searchMessages(opts)` | 在聊天消息中进行全文搜索 |
