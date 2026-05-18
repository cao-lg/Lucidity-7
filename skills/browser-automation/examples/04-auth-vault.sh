#!/bin/bash
# 示例4：使用认证保管库登录
# 功能：安全地保存和复用登录凭证

SITE_NAME=${1:-"myapp"}
LOGIN_URL=${2:-"https://example.com/login"}
USERNAME=${3:-""}
PASSWORD=${4:-""}

if [ -z "$USERNAME" ] || [ -z "$PASSWORD" ]; then
    echo "用法: $0 <站点名> <登录URL> <用户名> <密码>"
    echo "示例: $0 github https://github.com/login myuser mypass"
    exit 1
fi

echo "保存凭证到认证保管库..."
echo "$PASSWORD" | agent-browser auth save "$SITE_NAME" --url "$LOGIN_URL" --username "$USERNAME" --password-stdin

echo "使用保存的凭证登录..."
agent-browser auth login "$SITE_NAME"

echo "等待页面加载..."
agent-browser wait --load networkidle

echo "登录完成，当前页面："
agent-browser get url
agent-browser get title

echo "已保存凭证列表："
agent-browser auth list
