#!/bin/bash
# 学生论文评审自动化脚本
# 用于帮助教师自动化处理学生论文评审工作

echo "========================================"
echo "  学生论文评审自动化"
echo "========================================"
echo ""

# 检查 agent-browser 是否安装
if ! command -v agent-browser &> /dev/null; then
    echo "❌ 错误: agent-browser 未安装"
    echo ""
    echo "请先安装 agent-browser:"
    echo "  npm install -g agent-browser"
    echo "  agent-browser install"
    echo ""
    exit 1
fi

# 连接到 Chrome 并打开论文评审页面
echo "📌 步骤 1: 连接到 Chrome 浏览器..."
echo "请确保你已经通过调试端口启动了 Chrome（参见 05-teacher-review-guide.md）"
echo ""

agent-browser --cdp 9222 open "https://jw.gdit.edu.cn/jwglxt/jsbysjgl/xsgczl_cxXsgcglIndex.html?gnmkdm=N533515&layout=default"

echo ""
echo "✅ 已连接到论文评审页面"
echo ""

# 获取页面快照
echo "📌 步骤 2: 获取页面元素列表..."
echo "正在获取可交互元素..."
echo ""

agent-browser snapshot -i

echo ""
echo "========================================"
echo "  下一步操作"
echo "========================================"
echo ""
echo "请告诉我："
echo "1. 页面上显示了哪些学生论文？"
echo "2. 你要处理哪个学生？"
echo ""
echo "我需要知道学生论文链接的元素引用（如 @e5, @e6 等）"
echo "才能帮你点击进入论文详情页。"
echo ""
echo "提示：运行 'agent-browser screenshot --annotate' 可以查看带标注的截图"
