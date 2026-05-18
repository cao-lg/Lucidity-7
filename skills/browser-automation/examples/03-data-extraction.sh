#!/bin/bash
# 示例3：数据提取
# 功能：从网页提取结构化数据

OUTPUT_FILE=${1:-"data.txt"}

agent-browser open https://example.com/products
agent-browser snapshot -i

echo "提取页面标题..."
agent-browser get title
TITLE=$(agent-browser get title)
echo "标题: $TITLE" > "$OUTPUT_FILE"

echo "提取页面内容..."
agent-browser get text body >> "$OUTPUT_FILE"

echo "获取 URL..."
agent-browser get url >> "$OUTPUT_FILE"

agent-browser close

echo "数据已提取到 $OUTPUT_FILE"
