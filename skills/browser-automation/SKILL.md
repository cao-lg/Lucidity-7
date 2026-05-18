---
name: browser-automation
description: 浏览器自动化技能，基于 agent-browser CLI。当用户需要与网站交互、执行网页任务、填写表单、点击按钮、截取屏幕截图、提取数据、测试网页应用或自动化任何浏览器任务时使用。触发关键词包括"打开网站"、"填写表单"、"点击按钮"、"截取屏幕截图"、"从页面提取数据"、"测试网页应用"、"登录网站"、"自动化浏览器操作"或任何需要编程式网页交互的任务。
allowed-tools: Bash(npx agent-browser:*), Bash(agent-browser:*)
---

# 浏览器自动化 - browser-automation

基于 agent-browser 的强大浏览器自动化 CLI 工具，通过 Chrome/Chromium 的 CDP 协议直接控制浏览器。

## 安装

### 全局安装（推荐）

```bash
npm install -g agent-browser
agent-browser install  # 首次使用需要下载 Chrome
```

### 其他安装方式

```bash
# Homebrew (macOS)
brew install agent-browser

# Cargo (Rust)
cargo install agent-browser

# 更新版本
agent-browser upgrade
```

## 核心工作流程

每个浏览器自动化任务都遵循这个模式：

1. **导航**: `agent-browser open <url>`
2. **快照**: `agent-browser snapshot -i` (获取元素引用如 `@e1`, `@e2`)
3. **交互**: 使用引用进行点击、填写等操作
4. **重新快照**: DOM 变化后，获取新的元素引用

```bash
# 示例：填写表单并提交
agent-browser open https://example.com/form
agent-browser snapshot -i
# 输出: @e1 [input type="email"], @e2 [input type="password"], @e3 [button] "Submit"

agent-browser fill @e1 "user@example.com"
agent-browser fill @e2 "password123"
agent-browser click @e3
agent-browser wait --load networkidle
agent-browser snapshot -i  # 检查结果
```

## 命令链接

可以使用 `&&` 在单个命令中链接多个操作。浏览器通过后台守护进程持久化，链接命令更高效。

```bash
# 在一次调用中链接打开+等待+快照
agent-browser open https://example.com && agent-browser wait --load networkidle && agent-browser snapshot -i

# 链接多个交互操作
agent-browser fill @e1 "user@example.com" && agent-browser fill @e2 "password123" && agent-browser click @e3

# 导航并截图
agent-browser open https://example.com && agent-browser wait --load networkidle && agent-browser screenshot page.png
```

## 认证处理

自动化需要登录的网站时，有多种方式处理：

### 方式1：从用户浏览器导入认证（快速，一次性任务）

```bash
# 连接到用户正在运行的 Chrome（已登录）
agent-browser --auto-connect state save ./auth.json
# 使用该认证状态
agent-browser --state ./auth.json open https://app.example.com/dashboard
```

状态文件包含明文会话令牌 - 添加到 `.gitignore`，使用完删除。可设置 `AGENT_BROWSER_ENCRYPTION_KEY` 进行加密存储。

### 方式2：持久化配置文件（重复任务最简单）

```bash
# 首次运行：手动或自动化登录
agent-browser --profile ~/.myapp open https://app.example.com/login
# ... 填写凭证，提交 ...

# 未来所有运行：已认证
agent-browser --profile ~/.myapp open https://app.example.com/dashboard
```

### 方式3：会话名称（自动保存/恢复 cookies 和 localStorage）

```bash
agent-browser --session-name myapp open https://app.example.com/login
# ... 登录流程 ...
agent-browser close  # 状态自动保存

# 下次：状态自动恢复
agent-browser --session-name myapp open https://app.example.com/dashboard
```

### 方式4：认证保管库（加密存储凭证）

```bash
echo "$PASSWORD" | agent-browser auth save myapp --url https://app.example.com/login --username user --password-stdin
agent-browser auth login myapp
```

`auth login` 导航后等待登录表单选择器出现再交互，更可靠。

### 方式5：状态文件（手动保存/加载）

```bash
# 登录后保存状态
agent-browser state save ./auth.json
# 未来会话中使用
agent-browser state load ./auth.json
agent-browser open https://app.example.com/dashboard
```

## 常用命令

### 导航和交互

```bash
# 导航
agent-browser open <url>           # 导航到 URL（别名: goto, navigate）
agent-browser close                # 关闭浏览器（别名: quit, exit）

# 快照（获取元素引用）
agent-browser snapshot -i           # 获取交互元素的引用（推荐）
agent-browser snapshot -s "#selector"  # 限定到 CSS 选择器

# 交互操作（使用快照中的 @引用）
agent-browser click @e1                    # 点击元素
agent-browser click @e1 --new-tab          # 点击并在新的标签页打开
agent-browser fill @e2 "text"              # 清空并输入文本
agent-browser type @e2 "text"              # 输入文本（不清空）
agent-browser select @e1 "option"          # 选择下拉选项
agent-browser check @e1                    # 勾选复选框
agent-browser press Enter                  # 按键
agent-browser keyboard type "text"         # 在当前焦点处输入（无需选择器）
agent-browser scroll down 500              # 滚动页面
agent-browser scroll down 500 --selector "div.content"  # 在特定容器内滚动

# 获取信息
agent-browser get text @e1                 # 获取元素文本
agent-browser get url                      # 获取当前 URL
agent-browser get title                    # 获取页面标题
agent-browser get cdp-url                  # 获取 CDP WebSocket URL

# 等待
agent-browser wait @e1                     # 等待元素出现
agent-browser wait --load networkidle      # 等待网络空闲
agent-browser wait --url "**/page"         # 等待 URL 匹配
agent-browser wait 2000                    # 等待毫秒数
agent-browser wait --text "Welcome"       # 等待文本出现（子串匹配）
agent-browser wait "#spinner" --state hidden  # 等待元素消失

# 下载
agent-browser download @e1 ./file.pdf      # 点击元素触发下载
agent-browser wait --download ./output.zip  # 等待下载完成

# 网络监控
agent-browser network requests            # 检查跟踪的请求
agent-browser network requests --type xhr,fetch  # 按资源类型过滤
agent-browser network requests --method POST    # 按 HTTP 方法过滤
agent-browser network requests --status 2xx     # 按状态码过滤
agent-browser network har start           # 开始 HAR 录制
agent-browser network har stop ./capture.har   # 停止并保存 HAR 文件

# 视口和设备模拟
agent-browser set viewport 1920 1080      # 设置视口大小（默认: 1280x720）
agent-browser set viewport 1920 1080 2    # 2x Retina
agent-browser set device "iPhone 14"      # 模拟设备（视口 + User Agent）
```

### 截图和捕获

```bash
agent-browser screenshot                    # 截图到临时目录
agent-browser screenshot --full             # 全页截图
agent-browser screenshot --annotate          # 带编号元素标签的标注截图
agent-browser screenshot --screenshot-dir ./shots  # 保存到自定义目录
agent-browser screenshot --screenshot-format jpeg --screenshot-quality 80
agent-browser pdf output.pdf                # 保存为 PDF
```

### 剪贴板

```bash
agent-browser clipboard read                 # 读取剪贴板文本
agent-browser clipboard write "Hello!"       # 写入剪贴板
agent-browser clipboard copy                 # 复制当前选择
agent-browser clipboard paste                # 粘贴
```

### 对话框

```bash
agent-browser dialog accept                  # 接受对话框
agent-browser dialog accept "my input"      # 接受提示框并输入文本
agent-browser dialog dismiss                 # 取消对话框
agent-browser dialog status                 # 检查是否有对话框打开
```

### 差异对比

```bash
agent-browser diff snapshot                  # 比较当前与上次快照
agent-browser diff snapshot --baseline before.txt  # 与保存的文件比较
agent-browser diff screenshot --baseline before.png  # 像素级视觉对比
agent-browser diff url <url1> <url2>          # 比较两个页面
agent-browser diff url <url1> <url2> --selector "#main"  # 限定范围
```

## 批处理执行

通过管道传输 JSON 数组执行多条命令，避免逐命令启动的开销。

```bash
echo '[
 ["open", "https://example.com"],
 ["snapshot", "-i"],
 ["click", "@e1"],
 ["screenshot", "result.png"]
]' | agent-browser batch --json

# 遇错即停
agent-browser batch --bail < commands.json
```

## 常用模式

### 表单提交

```bash
agent-browser open https://example.com/signup
agent-browser snapshot -i
agent-browser fill @e1 "Jane Doe"
agent-browser fill @e2 "jane@example.com"
agent-browser select @e3 "California"
agent-browser check @e4
agent-browser click @e5
agent-browser wait --load networkidle
```

### 使用认证保管库（推荐）

```bash
# 保存凭证（使用 AGENT_BROWSER_ENCRYPTION_KEY 加密）
echo "pass" | agent-browser auth save github --url https://github.com/login --username user --password-stdin

# 登录（LLM 不会看到密码）
agent-browser auth login github

# 管理已保存的凭证
agent-browser auth list
agent-browser auth show github
agent-browser auth delete github
```

### 数据提取

```bash
agent-browser open https://example.com/products
agent-browser snapshot -i
agent-browser get text @e5                    # 获取特定元素文本
agent-browser get text body > page.txt        # 获取所有页面文本

# JSON 输出便于解析
agent-browser snapshot -i --json
agent-browser get text @e1 --json
```

### 并行会话

```bash
agent-browser --session site1 open https://site-a.com
agent-browser --session site2 open https://site-b.com

agent-browser --session site1 snapshot -i
agent-browser --session site2 snapshot -i

agent-browser session list
```

### 连接到现有 Chrome

```bash
# 自动发现启用了远程调试的 Chrome
agent-browser --auto-connect open https://example.com
agent-browser --auto-connect snapshot

# 或指定 CDP 端口
agent-browser --cdp 9222 snapshot
```

### 暗黑模式

```bash
# 通过标志持久化设置（适用于所有页面和新标签页）
agent-browser --color-scheme dark open https://example.com

# 或通过环境变量
AGENT_BROWSER_COLOR_SCHEME=dark agent-browser open https://example.com

# 或在会话中设置
agent-browser set media dark
```

### 视口和响应式测试

```bash
# 设置自定义视口大小
agent-browser set viewport 1920 1080
agent-browser screenshot desktop.png

# 测试移动端布局
agent-browser set viewport 375 812
agent-browser screenshot mobile.png

# 设备模拟（一步设置视口 + User Agent）
agent-browser set device "iPhone 14"
agent-browser screenshot device.png
```

### 可视化浏览器（调试）

```bash
agent-browser --headed open https://example.com
agent-browser highlight @e1                   # 高亮元素
agent-browser inspect                         # 打开 Chrome DevTools
agent-browser profiler start                 # 开始 Chrome DevTools 性能分析
agent-browser profiler stop trace.json       # 停止并保存
```

### 本地文件

```bash
# 使用 file:// URLs 打开本地文件
agent-browser --allow-file-access open file:///path/to/document.pdf
agent-browser --allow-file-access open file:///path/to/page.html
```

## 安全说明

所有安全功能都是可选的。默认情况下，agent-browser 不对导航、操作或输出施加任何限制。
