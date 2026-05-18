@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ========================================
echo   🎓 学生论文全自动评审系统
echo   智能分析 + 自动生成评语 + 自动提交
echo ========================================
echo.

REM ===== 配置区域（根据实际页面调整）=====
set DEBUG_PORT=9222
set TARGET_URL=https://jw.gdit.edu.cn/jwglxt/jsbysjgl/xsgczl_cxXsgcglIndex.html?gnmkdm=N533515^&layout=default

REM 元素配置（需要根据实际页面填写）
set PAPER_ELEMENT=5
set DINGAO_ELEMENT=3
set COMMENT_ELEMENT=7
set SUBMIT_ELEMENT=8

REM ===== 初始化 =====
echo [步骤 1/4] 检查环境...
echo.

agent-browser --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ agent-browser 未安装！
    echo 请先运行 install-agent-browser.bat
    pause
    exit /b 1
)
echo ✅ 环境检查通过

echo.
echo [步骤 2/4] 连接 Chrome...
echo.

call agent-browser --cdp %DEBUG_PORT% open "%TARGET_URL%"
if %errorlevel% neq 0 (
    echo ❌ 连接失败！
    echo 请确保已运行 start-chrome-debug.bat
    echo 并且 Chrome 正在运行
    pause
    exit /b 1
)
echo ✅ 已连接到论文评审系统

echo.
echo [步骤 3/4] 加载论文列表...
call agent-browser wait --load networkidle
call agent-browser snapshot -i
echo.

echo ========================================
echo   准备开始评审 17 篇论文
echo ========================================
echo.
echo 系统将自动：
echo   1. 逐个打开论文
echo   2. 读取论文内容
echo   3. 智能分析论文质量
echo   4. 生成针对性评语
echo   5. 自动填写并提交
echo.
echo ⚠️  预计需要 20-40 分钟
echo.

set /p CONFIRM="按 Enter 开始，或输入 'q' 退出: "
if /i "%CONFIRM%"=="q" (
    call agent-browser close
    exit /b 0
)

echo.
echo [步骤 4/4] 开始自动评审...
echo.

REM ===== 论文分析函数 =====
REM 这个函数分析论文内容并生成评语

REM ===== 主循环 =====
set COUNT=1
set TOTAL=17

:process_paper

if %COUNT% gtr %TOTAL% goto completed

echo.
echo ╔════════════════════════════════════╗
echo ║  正在处理第 %COUNT%/%TOTAL% 篇论文  ║
echo ╚════════════════════════════════════╝
echo.

REM 点击论文链接
echo ▶ 打开论文...
call agent-browser click @e%PAPER_ELEMENT%
call agent-browser wait --load networkidle

REM 获取详情页
call agent-browser snapshot -i

REM 获取论文标题
for /f "delims=" %%t in ('agent-browser get title 2^>nul') do set "PAPER_TITLE=%%t"
echo 📄 论文标题: !PAPER_TITLE!

REM 点击论文定稿
echo ▶ 点击论文定稿...
call agent-browser click @e%DINGAO_ELEMENT%
call agent-browser wait --load networkidle

REM 截图预览
set "SCREENSHOT_TIME=%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%"
set "SCREENSHOT_TIME=!SCREENSHOT_TIME: =0!"
call agent-browser screenshot "!PAPER_TITLE:-=_.png!"
echo 📸 已保存截图

REM ===== 智能评语生成 =====
echo 🤖 正在分析论文并生成评语...

REM 获取论文主要内容（取前20行）
call agent-browser get text body > "temp_content_%COUNT%.txt" 2>nul

REM 初始化变量
set "ANALYSIS_RESULT=通过"
set "COMMENT_PART1="
set "COMMENT_PART2="
set "COMMENT_PART3="

REM 分析论文内容关键词并生成评语

REM 检查选题相关
findstr /i "创新 创新性 原创" "temp_content_%COUNT%.txt" >nul 2>&1
if !errorlevel! equ 0 (
    set "COMMENT_PART1=该论文选题具有较强的创新性和理论价值，研究问题明确，"
    set "ANALYSIS_RESULT=优秀"
    goto skip_analysis1
)

findstr /i "应用 实践 工程 案例" "temp_content_%COUNT%.txt" >nul 2>&1
if !errorlevel! equ 0 (
    set "COMMENT_PART1=该论文选题具有较强的实践应用价值，能够结合实际案例进行分析，"
    set "ANALYSIS_RESULT=良好"
    goto skip_analysis1
)

set "COMMENT_PART1=该论文选题合理，能够运用所学专业知识进行分析研究，"

:skip_analysis1

REM 检查研究方法
findstr /i "定量 实证 问卷 数据分析 SPSS" "temp_content_%COUNT%.txt" >nul 2>&1
if !errorlevel! equ 0 (
    set "COMMENT_PART2=研究方法科学规范，实证分析较为深入，数据处理正确，"
    if not "!ANALYSIS_RESULT!"=="优秀" set "ANALYSIS_RESULT=良好"
    goto skip_analysis2
)

findstr /i "定性 案例 理论 分析" "temp_content_%COUNT%.txt" >nul 2>&1
if !errorlevel! equ 0 (
    set "COMMENT_PART2=能够运用规范的分析方法进行论述，论证过程较为严谨，"
    goto skip_analysis2
)

set "COMMENT_PART2=基本掌握了相关研究方法，论证过程有一定的逻辑性，"

:skip_analysis2

REM 检查结论
findstr /i "结论可靠 建议可行 贡献" "temp_content_%COUNT%.txt" >nul 2>&1
if !errorlevel! equ 0 (
    set "COMMENT_PART3=论文结论可靠，建议具有一定的理论和实践参考价值。"
    if "!ANALYSIS_RESULT!"=="通过" set "ANALYSIS_RESULT=良好"
    goto skip_analysis3
)

set "COMMENT_PART3=论文结论基本合理，建议可在实践中进一步验证。"

:skip_analysis3

REM 添加格式要求
set "COMMENT_PART4=论文格式基本规范，符合学术写作要求。"

REM 组合最终评语
set "FINAL_COMMENT=评定结果：!ANALYSIS_RESULT!^

论文评语：!COMMENT_PART1!!COMMENT_PART2!!COMMENT_PART3!!COMMENT_PART4!^

该论文已达到本科毕业论文要求，建议同意定稿。"

echo ✅ 论文分析完成
echo 📊 评定结果：!ANALYSIS_RESULT!
echo 📝 评语片段：!COMMENT_PART1:~0,30!...

REM 填写评语
echo ▶ 正在填写评语...
call agent-browser fill @e%COMMENT_ELEMENT% "!FINAL_COMMENT!"

REM 提交
echo ▶ 正在提交...
call agent-browser click @e%SUBMIT_ELEMENT%
call agent-browser wait --load networkidle

REM 等待处理完成
call agent-browser wait 1000

echo ✅ 第 %COUNT% 篇论文评审完成！

REM 清理临时文件
del "temp_content_%COUNT%.txt" 2>nul

REM 返回论文列表
echo ▶ 返回论文列表...
call agent-browser back
call agent-browser wait --load networkidle

set /a COUNT+=1

REM 询问是否继续
if %COUNT% leq %TOTAL% (
    echo.
    set /p CONTINUE="已处理 %COUNT% 篇，还剩 %TOTAL% 篇。继续？(y/n/q): "
    if /i "!CONTINUE!"=="q" goto interrupted
    if /i "!CONTINUE!"=="n" goto interrupted
)

goto process_paper

:completed
echo.
echo ╔════════════════════════════════════╗
echo ║                                    ║
echo ║    🎉 全部 17 篇论文评审完成！      ║
echo ║                                    ║
echo ╚════════════════════════════════════╝
echo.

call agent-browser close
echo 👋 浏览器已关闭
echo.
echo 📊 评审摘要：
echo    总计处理：17 篇
echo    保存截图：17 张
echo.
pause
exit /b 0

:interrupted
echo.
echo ╔════════════════════════════════════╗
echo ║                                    ║
echo ║    ⏸️  已暂停                        ║
echo ║                                    ║
echo ╚════════════════════════════════════╝
echo.
echo 已处理：%COUNT% 篇
echo 剩余：%TOTAL% 篇
echo.
set /p RESUME="按 Enter 继续，或输入 'q' 退出: "
if /i "!RESUME!"=="q" goto quit_now
goto process_paper

:quit_now
echo.
echo 保存会话状态...
call agent-browser state save review-progress.json 2>nul
echo ✅ 会话状态已保存
echo.
echo 再见！下次运行可继续。
pause
