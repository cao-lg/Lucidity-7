@echo off
chcp 65001 >nul
echo ========================================
echo   一键安装 agent-browser
echo ========================================
echo.

echo [1/4] 检查 Node.js 和 npm...
node --version
if %errorlevel% neq 0 (
    echo ❌ Node.js 未安装或未添加到 PATH
    echo 请先安装 Node.js: https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js 已安装

echo.
echo [2/4] 安装 agent-browser...
call npm install -g agent-browser
if %errorlevel% neq 0 (
    echo ❌ 安装失败
    pause
    exit /b 1
)
echo ✅ agent-browser 安装成功

echo.
echo [3/4] 安装 Chrome...
call agent-browser install
echo ✅ Chrome 安装完成

echo.
echo [4/4] 验证安装...
call agent-browser --version
echo ✅ 验证成功

echo.
echo ========================================
echo   安装完成！
echo ========================================
echo.
echo 接下来请按以下步骤操作：
echo.
echo 1. 关闭所有 Chrome 窗口
echo 2. 双击运行 "start-chrome-debug.bat" 启动带调试端口的 Chrome
echo 3. 在 Chrome 中登录教务系统并打开论文评审页面
echo 4. 运行 "review-all.bat" 开始自动评审
echo.
pause
