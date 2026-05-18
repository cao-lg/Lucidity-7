@echo off
chcp 65001 >nul
echo ========================================
echo   启动 Chrome（调试模式）
echo ========================================
echo.
echo 正在启动 Chrome，调试端口：9222
echo.

start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\chrome-debug"

echo ✅ Chrome 已启动
echo.
echo 现在请：
echo 1. 在 Chrome 中登录教务系统
echo 2. 打开论文评审页面
echo 3. 运行 review-all.bat 开始自动评审
echo.
pause
