# 教师论文评审自动化操作指南

## 📋 任务描述

帮助教师自动化完成学生论文评审工作：
1. 连接到你的 Chrome 浏览器（你已经登录了教务系统）
2. 选择每个学生论文
3. 点击"论文定稿"
4. 预览论文内容
5. 给与评语

---

## 🚀 第一步：安装 agent-browser

### 选项 1：使用 npm 安装（推荐）

如果你已经安装了 Node.js：

```bash
# 全局安装 agent-browser
npm install -g agent-browser

# 下载 Chrome 浏览器（首次必须）
agent-browser install
```

### 选项 2：检查是否已安装

在终端中运行：

```bash
# 检查 agent-browser 是否已安装
agent-browser --version

# 如果已安装，跳过安装步骤
```

### 选项 3：使用 npx 直接运行

如果没有全局安装，也可以用 npx：

```bash
npx agent-browser --version
```

---

## 🔗 第二步：连接到你的 Chrome 浏览器

### 重要说明

**agent-browser 无法直接连接到用户已经打开的 Chrome 浏览器窗口**。Chrome 浏览器的安全机制不允许外部程序直接访问正在运行的实例。

### 解决方案：启动带有调试端口的 Chrome

你需要在启动 Chrome 时启用远程调试功能：

#### 方法 A：Windows 用户

1. **关闭所有 Chrome 窗口**

2. **创建一个启动脚本** `start-chrome-debug.bat`：

```batch
@echo off
"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\chrome-debug"
```

或者如果 Chrome 安装在其他位置：

```batch
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\chrome-debug"
```

3. **双击运行这个脚本启动 Chrome**

4. **手动登录到教务系统**
   - 打开 https://jw.gdit.edu.cn
   - 完成登录
   - 导航到论文评审页面

#### 方法 B：macOS 用户

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --user-data-dir="~/chrome-debug"
```

#### 方法 C：使用快捷方式（Windows）

1. 右键点击 Chrome 快捷方式
2. 选择"属性"
3. 在"目标"字段末尾添加：
   ```
   --remote-debugging-port=9222 --user-data-dir="C:\chrome-debug"
   ```
4. 点击"确定"
5. 通过这个快捷方式启动 Chrome

---

## 📝 第三步：执行自动化操作

### 创建操作脚本 `review-papers.sh`

```bash
#!/bin/bash

echo "========================================="
echo "  学生论文评审自动化脚本"
echo "========================================="
echo ""

# 连接到 Chrome（通过调试端口）
echo "步骤 1: 连接到 Chrome 浏览器..."
agent-browser --cdp 9222 open "https://jw.gdit.edu.cn/jwglxt/jsbysjgl/xsgczl_cxXsgcglIndex.html?gnmkdm=N533515&layout=default"

echo ""
echo "步骤 2: 获取页面快照（查看可交互元素）..."
agent-browser snapshot -i

echo ""
echo "请告诉我当前页面上有哪些学生论文列表。"
echo "我会帮你选择第一个论文进行评审。"
echo ""

# 等待用户确认
read -p "按 Enter 继续，或输入 'q' 退出: " choice

if [ "$choice" = "q" ]; then
    echo "已退出。"
    agent-browser close
    exit 0
fi

echo ""
echo "步骤 3: 获取论文列表..."
agent-browser snapshot -i

echo ""
echo "步骤 4: 点击第一个学生论文..."
echo "请告诉我你要点击哪个元素（输入如 @e1, @e2 等）"
read -p "输入元素引用: " element

if [ ! -z "$element" ]; then
    agent-browser click "$element"
    echo "已点击 $element"
fi

echo ""
echo "步骤 5: 等待页面加载..."
agent-browser wait --load networkidle

echo ""
echo "步骤 6: 获取论文详情页..."
agent-browser snapshot -i

echo ""
echo "步骤 7: 查找并点击'论文定稿'按钮..."
read -p "输入'论文定稿'按钮的元素引用: " dingao_element

if [ ! -z "$dingao_element" ]; then
    agent-browser click "$dingao_element"
    echo "已点击论文定稿"
fi

echo ""
echo "步骤 8: 等待预览加载..."
agent-browser wait --load networkidle
agent-browser snapshot -i

echo ""
echo "步骤 9: 填写评语..."
read -p "输入评语内容: " comment

if [ ! -z "$comment" ]; then
    # 查找评语输入框
    read -p "输入评语输入框的元素引用: " textarea_element
    agent-browser fill "$textarea_element" "$comment"
fi

echo ""
echo "========================================="
echo "  操作完成！"
echo "========================================="
echo ""

# 询问是否继续处理下一个学生
read -p "是否继续处理下一个学生？(y/n): " continue_choice

if [ "$continue_choice" = "y" ]; then
    echo "返回学生列表..."
    agent-browser back
    agent-browser wait --load networkidle
    bash review-papers.sh
else
    echo "保存状态并关闭..."
    agent-browser state save ./review-session.json
    agent-browser close
    echo "再见！"
fi
```

### 使用方法

1. **保存脚本**：将上面的内容保存为 `review-papers.sh`

2. **添加执行权限**：
   ```bash
   chmod +x review-papers.sh
   ```

3. **运行脚本**：
   ```bash
   ./review-papers.sh
   ```

---

## 🎯 推荐的评审流程

### 单个论文评审流程

```bash
# 1. 连接到 Chrome（调试端口 9222）
agent-browser --cdp 9222 open "https://jw.gdit.edu.cn/jwglxt/jsbysjgl/xsgczl_cxXsgcglIndex.html?gnmkdm=N533515&layout=default"

# 2. 获取学生列表
agent-browser snapshot -i

# 3. 点击第一个学生（如 @e5）
agent-browser click @e5

# 4. 等待加载
agent-browser wait --load networkidle

# 5. 获取详情页元素
agent-browser snapshot -i

# 6. 点击"论文定稿"按钮（如 @e3）
agent-browser click @e3

# 7. 等待预览
agent-browser wait --load networkidle

# 8. 填写评语（如评语框是 @e7）
agent-browser fill @e7 "该论文选题合理，研究方法得当，内容充实，格式规范。同意定稿。"
agent-browser fill @e7 "优秀"  # 或简评

# 9. 提交评语
agent-browser click @e8  # 提交按钮

# 10. 返回继续处理下一个
agent-browser back
```

### 批量评审流程（需要循环）

由于 agent-browser CLI 不支持循环，你可以：

1. **使用 batch 命令处理固定流程**：
   ```bash
   echo '[
     ["open", "https://jw.gdit.edu.cn/..."],
     ["snapshot", "-i"],
     ["click", "@e5"],
     ["wait", "--load", "networkidle"],
     ["click", "@e3"],
     ["fill", "@e7", "同意定稿"],
     ["click", "@e8"],
     ["back"]
   ]' | agent-browser batch --json
   ```

2. **或者多次运行脚本**，每次手动选择不同的学生

---

## 🔧 常见问题解决

### Q1: 找不到元素引用

**问题**：运行 `snapshot -i` 后，不知道该用哪个引用

**解决**：
```bash
# 使用带标注的截图，查看每个元素的编号
agent-browser screenshot --annotate annotated.png

# 使用可视化模式
agent-browser --headed open https://example.com
agent-browser highlight @e1  # 高亮显示 @e1 元素
```

### Q2: 页面加载太慢

**解决**：
```bash
# 增加等待时间
agent-browser wait 5000  # 等待 5 秒

# 或者等待特定元素
agent-browser wait @e5
```

### Q3: 需要登录但无法自动登录

**解决**：
- 确保先手动在 Chrome 中登录
- agent-browser 会复用已有会话（通过调试端口）

### Q4: Chrome 调试端口被占用

**解决**：
```bash
# 使用其他端口
agent-browser --cdp 9223 open https://example.com

# 或查找占用端口的进程
netstat -ano | findstr :9222
taskkill /PID <进程ID> /F
```

---

## 📊 状态管理

### 保存当前进度

```bash
# 保存会话状态
agent-browser state save ./review-progress.json

# 查看保存的状态
agent-browser state list
```

### 恢复会话

```bash
# 加载之前保存的状态
agent-browser state load ./review-progress.json

# 从上次位置继续
agent-browser snapshot -i
```

---

## 🎓 评语模板

你可以使用以下评语模板：

### 简短版（推荐）
```
同意定稿。
```

### 标准版
```
该论文选题具有实际意义，研究方法科学合理，论证逻辑清晰，结论可靠。建议同意定稿。
```

### 详细版
```
1. 选题：具有理论价值和实践意义
2. 文献综述：资料丰富，评述得当
3. 研究方法：方法科学，操作规范
4. 数据分析：数据真实，处理正确
5. 结论：结论可靠，建议具体

总体评价：该论文已达到本科毕业论文要求，建议同意定稿。
```

---

## 📞 获取帮助

- **官方文档**: https://github.com/vercel-labs/agent-browser
- **问题反馈**: https://github.com/vercel-labs/agent-browser/issues

---

## ⚠️ 重要提醒

1. **数据安全**：确保评语内容准确，不要批量复制粘贴相同评语
2. **审核责任**：作为教师，请确保认真阅读论文后再填写评语
3. **备份状态**：定期保存进度，防止意外丢失
4. **网络稳定**：确保网络连接稳定，避免操作中断

---

**祝你评审工作顺利！** 🎉
