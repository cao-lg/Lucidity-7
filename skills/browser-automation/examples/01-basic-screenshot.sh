#!/bin/bash
# 示例1：基础网页截图
# 功能：打开网页并截取屏幕截图

agent-browser open https://example.com
agent-browser wait --load networkidle
agent-browser screenshot screenshot.png
agent-browser close

echo "截图已保存到 screenshot.png"
