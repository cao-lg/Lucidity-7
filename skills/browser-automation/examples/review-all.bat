@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ========================================
echo   学生论文评审工具（半自动模式）
echo   共 17 篇论文
echo ========================================
echo.
echo 📌 工作模式说明：
echo    1. 脚本自动打开论文、截图预览
echo    2. 你阅读论文内容
echo    3. 输入针对这篇论文的评语
echo    4. 脚本自动填写并提交
echo.
echo.

REM 设置调试端口
set DEBUG_PORT=9222

REM 设置目标URL
set TARGET_URL=https://jw.gdit.edu.cn/jwglxt/jsbysjgl/xsgczl_cxXsgcglIndex.html?gnmkdm=N533515^&layout=default

REM ===== 初始化 =====
echo [初始化] 检查环境...
echo.

REM 检查 agent-browser 是否安装
agent-browser --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ agent-browser 未安装！
    echo 请先运行 install-agent-browser.bat
    pause
    exit /b 1
)
echo ✅ agent-browser 已安装

REM 尝试连接
echo.
echo [连接] 正在连接到 Chrome...
echo.

call agent-browser --cdp %DEBUG_PORT% open "%TARGET_URL%" 2>nul
if %errorlevel% neq 0 (
    echo ❌ 连接失败！
    echo.
    echo 请确保：
    echo 1. Chrome 已通过 start-chrome-debug.bat 启动
    echo 2. 调试端口 %DEBUG_PORT% 已打开
    echo.
    pause
    exit /b 1
)

echo ✅ 已连接到 Chrome
echo.

REM 等待页面加载
echo [加载] 等待页面加载...
call agent-browser wait --load networkidle
echo.

REM 获取初始页面快照
echo [获取元素] 获取页面元素列表...
call agent-browser snapshot -i
echo.

echo ========================================
echo   页面元素列表
echo ========================================
echo.
echo 请查看上面的元素列表，告诉我：
echo.

set /p PAPER_ELEMENT="📋 输入学生论文列表中第一个论文链接的元素编号（不含@，如 5 表示 @e5）: "
set /p DINGGAO_ELEMENT="📋 输入'论文定稿'按钮的元素编号: "
set /p COMMENT_ELEMENT="📋 输入评语输入框的元素编号: "
set /p SUBMIT_ELEMENT="📋 输入提交/保存按钮的元素编号: "

echo.
echo ✅ 元素配置已保存
echo.

echo ========================================
echo   开始处理 17 篇论文
echo ========================================
echo.
echo 📝 每篇论文的工作流程：
echo    1. 自动打开论文
echo    2. 自动截图保存
echo    3. 【暂停】你阅读并输入评语
echo    4. 自动填写并提交
echo    5. 返回继续下一篇
echo.

set /p START="按 Enter 开始处理，或输入 'q' 退出: "

if /i "%START%"=="q" (
    call agent-browser close
    exit /b 0
)

REM ===== 主循环 =====
set COUNT=1

:loop
if %COUNT% gtr 17 goto done

echo.
echo ========================================
echo [论文 %COUNT%/17]
echo ========================================

REM 点击学生论文链接
echo.
echo ▶ 正在打开论文...
call agent-browser click @e%PAPER_ELEMENT%
call agent-browser wait --load networkidle

REM 获取详情页元素
call agent-browser snapshot -i

REM 点击论文定稿（如果需要）
echo ▶ 正在点击论文定稿...
call agent-browser click @e%DINGGAO_ELEMENT%
call agent-browser wait --load networkidle

REM 截图保存预览
set "SCREENSHOT_NAME=paper-%COUNT%-%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%.png"
set "SCREENSHOT_NAME=!SCREENSHOT_NAME: =0!"
call agent-browser screenshot "!SCREENSHOT_NAME!"
echo 📸 已保存截图：!SCREENSHOT_NAME!

REM ===== 暂停等待教师输入评语 =====
echo.
echo ┌─────────────────────────────────────────┐
echo │  请阅读论文内容并填写评语                 │
echo │  （截图已保存，可查看）                   │
echo └─────────────────────────────────────────┘
echo.

set /p MANUAL_COMMENT="✏️ 请输入针对这篇论文的评语（可直接粘贴）："
set /p REVIEW_RESULT="✅ 请输入评定结果（优秀/良好/通过/需修改）："

REM 组合评语
set "FULL_COMMENT=评定结果：%REVIEW_RESULT%"

if not "!MANUAL_COMMENT!"=="" (
    set "FULL_COMMENT=%FULL_COMMENT%^

论文评语：!MANUAL_COMMENT!"
)

echo.
echo ▶ 正在填写评语...
call agent-browser fill @e%COMMENT_ELEMENT% "!FULL_COMMENT!"

REM 提交
echo ▶ 正在提交...
call agent-browser click @e%SUBMIT_ELEMENT%
call agent-browser wait --load networkidle

echo.
echo ✅ 论文 %COUNT% 评审完成！

REM ===== 返回继续下一个 =====
echo.
echo ◀ 返回论文列表...
call agent-browser back
call agent-browser wait --load networkidle

REM 刷新页面元素
call agent-browser snapshot -i

set /a COUNT+=1

REM ===== 检查是否继续 =====
echo.
echo ┌─────────────────────────────────────────┐
echo │  已完成 %COUNT%-1 篇，还剩 %COUNT% 篇论文  │
echo └─────────────────────────────────────────┘
echo.

set /p CONTINUE="是否继续处理下一位学生？(y/n/q): "

if /i "%CONTINUE%"=="q" goto quit
if /i "%CONTINUE%"=="n" goto pause_session
goto loop

:pause_session
echo.
echo ⏸️  已暂停。你可以随时继续。
echo.
set /p RESUME="按 Enter 继续，或输入 'q' 退出: "
if /i "%RESUME%"=="q" goto quit
goto loop

:done
echo.
echo ========================================
echo   🎉 全部 17 篇论文处理完成！
echo ========================================
echo.

set /p SAVE="是否保存会话状态？(y/n): "
if /i "%SAVE%"=="y" (
    call agent-browser state save review-session.json
    echo ✅ 会话状态已保存到 review-session.json
)

:quit
echo.
set /p CLOSE="是否关闭浏览器？(y/n): "
if /i "%CLOSE%"=="y" (
    call agent-browser close
    echo 👋 再见！
)

echo.
echo ========================================
echo   感谢使用！祝你工作顺利！
echo ========================================
echo.
pause
