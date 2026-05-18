# Browser Automation Skill

基于 [agent-browser](https://github.com/vercel-labs/agent-browser) 的浏览器自动化技能。

## 功能特性

- 🌐 **网页浏览** - 打开、导航、等待页面加载
- 🖱️ **元素交互** - 点击、填写、选择、滚动
- 📸 **内容捕获** - 截图、PDF、全页截图
- 🔍 **数据提取** - 文本、HTML、结构化数据
- 📝 **表单自动化** - 登录、注册、数据提交
- 🧪 **测试能力** - 差异对比、视觉测试
- 🤖 **AI 辅助** - 自然语言控制浏览器

## 快速开始

### 1. 安装 agent-browser

```bash
# npm 安装（推荐）
npm install -g agent-browser

# Homebrew (macOS)
brew install agent-browser

# Cargo (Rust)
cargo install agent-browser
```

### 2. 下载 Chrome

```bash
agent-browser install
```

### 3. 开始使用

```bash
# 打开网页
agent-browser open https://example.com

# 获取页面快照（查看可交互元素）
agent-browser snapshot -i

# 点击元素
agent-browser click @e1

# 截图
agent-browser screenshot

# 关闭浏览器
agent-browser close
```

## 核心概念

### 元素引用（Refs）

快照命令返回的元素引用（如 `@e1`, `@e2`）是自动生成的可访问性引用，用于后续交互：

```bash
agent-browser open https://example.com
agent-browser snapshot -i
# 输出:
# @e1 [heading] "Welcome"
# @e2 [input type="text"] "Username"
# @e3 [button] "Submit"

agent-browser fill @e2 "myusername"
agent-browser click @e3
```

### 命令链接

多个命令可以用 `&&` 链接：

```bash
agent-browser open https://example.com && agent-browser wait --load networkidle && agent-browser screenshot
```

## 常用场景

### 登录网站

```bash
agent-browser open https://example.com/login
agent-browser snapshot -i
agent-browser fill @e1 "username"
agent-browser fill @e2 "password"
agent-browser click @e3
agent-browser wait --url "**/dashboard"
```

### 截取全页截图

```bash
agent-browser open https://example.com
agent-browser wait --load networkidle
agent-browser screenshot --full page.png
```

### 提取页面数据

```bash
agent-browser open https://example.com/products
agent-browser snapshot -i
agent-browser get text @e5 > data.txt
```

### 对比两个页面

```bash
agent-browser diff url https://v1.example.com https://v2.example.com
```

## 认证管理

### 方式1：使用 Auth Vault（推荐）

```bash
# 保存凭证
echo "mypassword" | agent-browser auth save mysite --url https://example.com/login --username user --password-stdin

# 使用保存的凭证登录
agent-browser auth login mysite
```

### 方式2：会话持久化

```bash
# 创建会话并登录
agent-browser --session-name myapp open https://example.com/login
# ... 登录操作 ...
agent-browser close  # 状态自动保存

# 下次使用时自动恢复登录状态
agent-browser --session-name myapp open https://example.com/dashboard
```

### 方式3：状态文件

```bash
# 登录后保存
agent-browser state save ./auth.json

# 加载并使用
agent-browser state load ./auth.json
agent-browser open https://example.com/dashboard
```

## 更多资源

- [完整文档](./SKILL.md) - 详细的命令参考
- [官方 GitHub](https://github.com/vercel-labs/agent-browser) - 最新更新和示例
- [官方 Skill](https://github.com/vercel-labs/agent-browser/tree/main/skills/agent-browser) - 英文原版

## 技术细节

- **引擎**: 原生 Rust CLI
- **浏览器**: Chrome/Chromium via CDP
- **平台**: macOS, Linux, Windows
- **安装大小**: ~15MB (CLI) + Chrome
- **性能**: 比 Node.js 方案快 5-10 倍
