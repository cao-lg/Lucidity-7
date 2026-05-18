# 清醒度层级测试网站 - Product Requirement Document

## Overview
- **Summary**: 一个基于 Joscha 清醒度层级理论的在线测试网站，帮助用户了解自己当前的意识发展阶段，并获得个性化解读和成长建议。
- **Purpose**: 提供一个互动性强、设计精美的测试体验，让用户深入了解自己的意识成长旅程。
- **Target Users**: 对个人成长、心理学、意识发展感兴趣的普通用户。

## Goals
- 创建一个直观易用的测试界面
- 提供准确的测试结果和详细的阶段解读
- 设计具有视觉吸引力的用户界面
- 实现响应式设计，适配各种设备

## Non-Goals (Out of Scope)
- 用户账户系统和数据持久化
- 长期测试结果追踪
- 社区功能或社交分享
- 复杂的数据分析

## Background & Context
Joscha Bach 的清醒度层级理论将意识发展分为 7 个阶段：
1. 反应性生存（婴儿期）
2. 个人自我（幼儿期）
3. 社会自我（青春期、社会化成人）
4. 理性能动性（自我导向）
5. 自我创作（完全成人、智慧）
6. 启蒙
7. 超越

## Functional Requirements
- **FR-1**: 用户可以通过一系列问题进行测试
- **FR-2**: 系统根据用户答案计算测试结果
- **FR-3**: 显示用户所属的意识阶段
- **FR-4**: 提供该阶段的详细解读
- **FR-5**: 展示所有 7 个阶段的信息
- **FR-6**: 用户可以重新开始测试

## Non-Functional Requirements
- **NFR-1**: 界面设计美观，具有现代感和深度
- **NFR-2**: 响应式设计，适配桌面和移动设备
- **NFR-3**: 流畅的动画和过渡效果
- **NFR-4**: 测试过程直观，用户体验良好

## Constraints
- **Technical**: 前端技术栈使用 React + TypeScript + Vite + Tailwind CSS
- **Business**: 项目为纯前端应用，无后端依赖
- **Dependencies**: 无需外部 API 或数据库

## Assumptions
- 用户具备基本的网络使用能力
- 用户对个人成长主题有兴趣
- 测试结果仅供参考，不构成专业心理评估

## Acceptance Criteria

### AC-1: 测试流程完整
- **Given**: 用户访问网站首页
- **When**: 用户点击开始测试，依次回答所有问题
- **Then**: 系统显示最终测试结果和详细解读
- **Verification**: `programmatic`

### AC-2: 结果展示准确
- **Given**: 用户完成测试
- **When**: 查看结果页面
- **Then**: 正确显示用户所属阶段、阶段描述和成长建议
- **Verification**: `programmatic`

### AC-3: 界面美观且响应式
- **Given**: 用户在不同设备上访问网站
- **When**: 浏览各个页面
- **Then**: 界面在各种屏幕尺寸下都正常显示，视觉效果良好
- **Verification**: `human-judgment`

### AC-4: 交互流畅
- **Given**: 用户进行测试
- **When**: 点击按钮、切换页面
- **Then**: 响应迅速，动画效果流畅
- **Verification**: `human-judgment`

## Open Questions
- 暂无
