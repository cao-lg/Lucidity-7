# 测试题目优化 - Product Requirement Document

## Overview
- **Summary**：优化现有的清醒度层级测试题目，确保7个阶段覆盖均匀、题目维度全面，满足科学性验证的要求。
- **Purpose**：提升测试的内容效度、结构效度和内部一致性，使测试结果更可靠。
- **Target Users**：使用清醒度层级测试的所有用户，以及对测试科学性有要求的用户。

## Goals
- [ ] 确保每个阶段有均衡的题目覆盖（每个阶段至少4-5道题）
- [ ] 增加缺失的心理学维度题目
- [ ] 保持测试总题数在15-20道之间（避免过长）
- [ ] 确保题目表述清晰、无歧义

## Non-Goals (Out of Scope)
- 完全重新设计整个测试
- 添加用户数据持久化功能
- 增加测试时间限制

## Background & Context
当前测试存在以下问题：
- 阶段1、4覆盖过多（12道题）
- 阶段5、6、7覆盖严重不足（仅1-3道题）
- 缺少超越性、整体性等重要维度题目
- 需要优化以满足科学性验证的要求

## Functional Requirements
- **FR-1**：每个阶段（1-7）有4-5道题覆盖
- **FR-2**：题目涵盖所有重要心理学维度
- **FR-3**：题目表述清晰，无歧义
- **FR-4**：保持测试流程不变

## Non-Functional Requirements
- **NFR-1**：总题数控制在15-20道
- **NFR-2**：每道题有明确的阶段对应关系
- **NFR-3**：题目语言简洁明了

## Constraints
- **Technical**：保持现有的数据结构和实现
- **Business**：不需要后端支持，纯前端
- **Dependencies**：无需外部依赖

## Assumptions
- 当前的阶段定义是合理的
- 用户理解题目所需的时间在合理范围内
- 每个阶段的题目数量均衡能提升内部一致性

## Acceptance Criteria

### AC-1: 阶段覆盖均衡
- **Given**：新的测试题目集
- **When**：检查每个阶段的题目数量
- **Then**：每个阶段有4-5道题，覆盖均衡
- **Verification**：`programmatic`
- **Notes**：统计每个stageId出现的次数

### AC-2: 心理学维度全面
- **Given**：新的测试题目集
- **When**：检查题目涵盖的维度
- **Then**：包含：决策风格、价值观、时间观念、人际关系、灵性态度、权威态度、自我认知、道德判断等维度
- **Verification**：`human-judgment`

### AC-3: 题目质量高
- **Given**：新的测试题目集
- **When**：评估题目的表述
- **Then**：题目清晰无歧义，选项表述一致
- **Verification**：`human-judgment`

### AC-4: 测试流程不变
- **Given**：使用新题目进行测试
- **When**：完成测试流程
- **Then**：从首页→测试→结果的流程不变，结果计算正常
- **Verification**：`programmatic`

## Open Questions
- [ ] 总题数是15道还是18道更合适？
