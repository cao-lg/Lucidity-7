#!/bin/bash
# 示例2：表单填写和提交
# 功能：打开注册页面，填写表单并提交

URL=$1
EMAIL=${2:-"test@example.com"}

agent-browser open "$URL"
agent-browser snapshot -i

echo "填写表单..."
agent-browser fill @e1 "张三"
agent-browser fill @e2 "$EMAIL"
agent-browser fill @e3 "password123"
agent-browser select @e4 "China"
agent-browser check @e5
agent-browser click @e6

agent-browser wait --load networkidle
agent-browser snapshot -i

echo "表单提交完成"
