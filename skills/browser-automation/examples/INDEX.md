# Browser Automation - 示例脚本索引

本文档列出了所有可用的示例脚本。

## 快速示例

### 1. 基础截图 [01-basic-screenshot.sh](./01-basic-screenshot.sh)

最简单的工作流：打开网页、等待加载、截图、关闭。

```bash
./01-basic-screenshot.sh
```

**输出**: `screenshot.png`

---

### 2. 表单填写 [02-form-submission.sh](./02-form-submission.sh)

演示如何填写表单字段并提交。

```bash
# 基本用法（使用默认测试数据）
./02-form-submission.sh

# 自定义 URL 和邮箱
./02-form-submission.sh https://example.com/register user@example.com
```

**功能**:
- 获取交互元素快照
- 填写多个字段（姓名、邮箱、密码）
- 选择下拉选项
- 勾选复选框
- 点击提交按钮
- 等待页面响应

---

### 3. 数据提取 [03-data-extraction.sh](./03-data-extraction.sh)

从网页提取标题、内容和 URL。

```bash
# 默认输出到 data.txt
./03-data-extraction.sh

# 自定义输出文件
./03-data-extraction.sh mydata.txt
```

**输出**:
```
标题: Example Domain
[页面文本内容...]
URL: https://example.com
```

---

### 4. 认证保管库 [04-auth-vault.sh](./04-auth-vault.sh)

安全地保存和复用登录凭证。

```bash
# 基本用法
./04-auth-vault.sh <站点名> <登录URL> <用户名> <密码>

# 示例
./04-auth-vault.sh github https://github.com/login myuser mypass
```

**特点**:
- 密码通过 stdin 安全传入（不在命令行历史中）
- 凭证加密存储
- 一键登录

---

## 使用提示

### 准备工作

1. **安装 agent-browser**:
   ```bash
   npm install -g agent-browser
   agent-browser install
   ```

2. **给脚本添加执行权限**:
   ```bash
   chmod +x examples/*.sh
   ```

### 调试技巧

1. **可视化调试**:
   ```bash
   agent-browser --headed open https://example.com
   ```

2. **高亮元素**:
   ```bash
   agent-browser highlight @e1
   ```

3. **打开 DevTools**:
   ```bash
   agent-browser inspect
   ```

### 常见问题

**Q: 元素引用（如 @e1）在哪获取？**
A: 运行 `agent-browser snapshot -i` 命令，它会列出页面上所有可交互元素及其引用。

**Q: 如何等待页面完全加载？**
A: 使用 `agent-browser wait --load networkidle`，它会等待所有网络请求完成。

**Q: 如何处理弹窗对话框？**
A:
```bash
# 接受对话框
agent-browser dialog accept

# 取消对话框
agent-browser dialog dismiss
```

**Q: 截图模糊怎么办？**
A: 使用 Retina 模式提高分辨率：
```bash
agent-browser set viewport 1920 1080 2
agent-browser screenshot --full high-res.png
```

---

## 更多资源

- [完整 SKILL 文档](../SKILL.md) - 详细的命令参考
- [官方示例](https://github.com/vercel-labs/agent-browser/tree/main/examples) - agent-browser 官方示例
- [GitHub 仓库](https://github.com/vercel-labs/agent-browser) - 最新更新和文档
