import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 'q1',
    text: '在做重要决策时，你最优先考虑的是什么？',
    answers: [
      { id: 'q1a1', text: '安全性和稳定性，避免风险', stageId: 1 },
      { id: 'q1a2', text: '自己的感受和内心的声音', stageId: 2 },
      { id: 'q1a3', text: '他人的看法和社会认可', stageId: 3 },
      { id: 'q1a4', text: '能否实现目标和获得成功', stageId: 4 }
    ]
  },
  {
    id: 'q2',
    text: '你对未来的期望是什么？',
    answers: [
      { id: 'q2a1', text: '稳定的生活，衣食无忧', stageId: 1 },
      { id: 'q2a2', text: '探索更多可能性，找到自己', stageId: 2 },
      { id: 'q2a3', text: '建立良好的人际关系和家庭', stageId: 3 },
      { id: 'q2a4', text: '取得成就，实现个人价值', stageId: 4 }
    ]
  },
  {
    id: 'q3',
    text: '你对生命意义的看法是？',
    answers: [
      { id: 'q3a1', text: '生存就是最大的意义，其他是次要的', stageId: 1 },
      { id: 'q3a2', text: '需要通过探索才能找到自己的意义', stageId: 5 },
      { id: 'q3a3', text: '在于为他人和社会做出贡献', stageId: 6 },
      { id: 'q3a4', text: '每一刻本身都有意义，无需刻意寻找', stageId: 7 }
    ]
  },
  {
    id: 'q4',
    text: '你觉得人生的成功标准是什么？',
    answers: [
      { id: 'q4a1', text: '有稳定的工作和收入', stageId: 1 },
      { id: 'q4a2', text: '找到自己，做真实的自己', stageId: 2 },
      { id: 'q4a3', text: '被他人认可和尊重', stageId: 3 },
      { id: 'q4a4', text: '实现自己的目标和梦想', stageId: 4 }
    ]
  },
  {
    id: 'q5',
    text: '当你遇到苦难时，你会如何看待？',
    answers: [
      { id: 'q5a1', text: '是一种不幸，希望尽快摆脱', stageId: 1 },
      { id: 'q5a2', text: '是成长的机会，需要从中学习', stageId: 5 },
      { id: 'q5a3', text: '是对他人的考验，可以培养慈悲心', stageId: 6 },
      { id: 'q5a4', text: '是生命的一部分，本身就有其深意', stageId: 7 }
    ]
  },
  {
    id: 'q6',
    text: '你如何看待金钱和物质？',
    answers: [
      { id: 'q6a1', text: '是生活的保障，非常重要', stageId: 1 },
      { id: 'q6a2', text: '是工具，但不是全部', stageId: 2 },
      { id: 'q6a3', text: '是社会地位的象征', stageId: 3 },
      { id: 'q6a4', text: '是成功的证明，追求更多', stageId: 4 }
    ]
  },
  {
    id: 'q7',
    text: '当你感到迷茫时，你会？',
    answers: [
      { id: 'q7a1', text: '回到熟悉的环境，寻求安全感', stageId: 1 },
      { id: 'q7a2', text: '向内探索，寻找生命的意义', stageId: 5 },
      { id: 'q7a3', text: '向他人倾诉，寻求理解', stageId: 3 },
      { id: 'q7a4', text: '设定新目标，重新出发', stageId: 4 }
    ]
  },
  {
    id: 'q8',
    text: '你对超越性体验（如冥想、灵性感受）的态度是？',
    answers: [
      { id: 'q8a1', text: '不太关心，觉得和自己无关', stageId: 1 },
      { id: 'q8a2', text: '有兴趣但觉得很神秘，想探索', stageId: 5 },
      { id: 'q8a3', text: '是重要的体验，有助于服务他人', stageId: 6 },
      { id: 'q8a4', text: '是生命的核心，带来深刻的连接感', stageId: 7 }
    ]
  },
  {
    id: 'q9',
    text: '你觉得最有价值的事情是？',
    answers: [
      { id: 'q9a1', text: '保持安全和稳定', stageId: 1 },
      { id: 'q9a2', text: '探索内心，了解自己', stageId: 5 },
      { id: 'q9a3', text: '帮助他人，服务社区', stageId: 6 },
      { id: 'q9a4', text: '取得成功，实现梦想', stageId: 4 }
    ]
  },
  {
    id: 'q10',
    text: '面对不同的观点，你通常会？',
    answers: [
      { id: 'q10a1', text: '坚持自己熟悉的观念', stageId: 1 },
      { id: 'q10a2', text: '思考不同观点，保持开放', stageId: 5 },
      { id: 'q10a3', text: '考虑他人的感受和看法', stageId: 3 },
      { id: 'q10a4', text: '看哪个观点更有利于目标', stageId: 4 }
    ]
  },
  {
    id: 'q11',
    text: '你对幸福的理解是？',
    answers: [
      { id: 'q11a1', text: '没有烦恼，生活稳定', stageId: 1 },
      { id: 'q11a2', text: '内心的平静和满足', stageId: 7 },
      { id: 'q11a3', text: '与爱的人在一起', stageId: 3 },
      { id: 'q11a4', text: '实现目标，事业有成', stageId: 4 }
    ]
  },
  {
    id: 'q12',
    text: '你对整体和系统的看法是？',
    answers: [
      { id: 'q12a1', text: '更关注自己能控制的具体事情', stageId: 1 },
      { id: 'q12a2', text: '对复杂的系统有兴趣，但觉得难懂', stageId: 5 },
      { id: 'q12a3', text: '理解事物是相互连接的，关注整体利益', stageId: 6 },
      { id: 'q12a4', text: '能直观感受到万物的相互依存关系', stageId: 7 }
    ]
  },
  {
    id: 'q13',
    text: '当你有能力时，你最想做的是？',
    answers: [
      { id: 'q13a1', text: '确保自己和家人的安全', stageId: 1 },
      { id: 'q13a2', text: '探索世界和自我', stageId: 2 },
      { id: 'q13a3', text: '帮助有需要的人', stageId: 6 },
      { id: 'q13a4', text: '取得更大的成就', stageId: 4 }
    ]
  },
  {
    id: 'q14',
    text: '你对死亡的看法是？',
    answers: [
      { id: 'q14a1', text: '是可怕的结局，尽量不去想', stageId: 1 },
      { id: 'q14a2', text: '是一个谜，让我思考生命的意义', stageId: 5 },
      { id: 'q14a3', text: '是生命的必然，让我更珍惜当下', stageId: 6 },
      { id: 'q14a4', text: '是生命的一部分，无需恐惧', stageId: 7 }
    ]
  },
  {
    id: 'q15',
    text: '你对自己与他人关系的看法是？',
    answers: [
      { id: 'q15a1', text: '保持适当距离，先保护自己', stageId: 1 },
      { id: 'q15a2', text: '寻找与自己契合的人', stageId: 2 },
      { id: 'q15a3', text: '每个人都是相互连接的，值得关怀', stageId: 6 },
      { id: 'q15a4', text: '建立互利共赢的人际关系', stageId: 4 }
    ]
  },
  {
    id: 'q16',
    text: '当面对权威时，你会？',
    answers: [
      { id: 'q16a1', text: '服从权威，相信权威知道什么是最好的', stageId: 1 },
      { id: 'q16a2', text: '质疑权威，寻找自己的答案', stageId: 2 },
      { id: 'q16a3', text: '既尊重又理性判断，不盲从', stageId: 5 },
      { id: 'q16a4', text: '将权威视为服务他人的工具', stageId: 6 }
    ]
  },
  {
    id: 'q17',
    text: '你对"自我"的理解是？',
    answers: [
      { id: 'q17a1', text: '就是我的身体和身份，我需要保护它', stageId: 1 },
      { id: 'q17a2', text: '在不断探索中发现和定义自己', stageId: 2 },
      { id: 'q17a3', text: '是更广阔存在的一部分，与万物相连', stageId: 7 },
      { id: 'q17a4', text: '是不断成长和自我超越的主体', stageId: 5 }
    ]
  },
  {
    id: 'q18',
    text: '在闲暇时间，你更喜欢？',
    answers: [
      { id: 'q18a1', text: '做熟悉的、安全的事情', stageId: 1 },
      { id: 'q18a2', text: '探索新的兴趣和爱好', stageId: 2 },
      { id: 'q18a3', text: '与朋友和家人相聚', stageId: 3 },
      { id: 'q18a4', text: '学习提升自己，追求进步', stageId: 4 }
    ]
  },
  {
    id: 'q19',
    text: '你如何看待自己的情绪？',
    answers: [
      { id: 'q19a1', text: '情绪是需要控制的麻烦', stageId: 1 },
      { id: 'q19a2', text: '情绪是了解自己的窗口', stageId: 2 },
      { id: 'q19a3', text: '情绪会影响人际关系', stageId: 3 },
      { id: 'q19a4', text: '情绪可以被管理和利用', stageId: 4 }
    ]
  },
  {
    id: 'q20',
    text: '你对灵性成长的态度是？',
    answers: [
      { id: 'q20a1', text: '不太理解，也不感兴趣', stageId: 1 },
      { id: 'q20a2', text: '开始好奇，想了解更多', stageId: 5 },
      { id: 'q20a3', text: '是重要的人生课题', stageId: 6 },
      { id: 'q20a4', text: '是生命的本质和目的', stageId: 7 }
    ]
  },
  {
    id: 'q21',
    text: '当你帮助他人时，你的感受是？',
    answers: [
      { id: 'q21a1', text: '希望得到回报', stageId: 1 },
      { id: 'q21a2', text: '感觉良好', stageId: 2 },
      { id: 'q21a3', text: '是社会责任', stageId: 3 },
      { id: 'q21a4', text: '是生命的自然表达', stageId: 7 }
    ]
  }
];

export const questionStats = {
  totalQuestions: 21,
  stageDistribution: [
    { stage: 1, count: 15, percentage: 28.6 },
    { stage: 2, count: 8, percentage: 15.2 },
    { stage: 3, count: 7, percentage: 13.3 },
    { stage: 4, count: 8, percentage: 15.2 },
    { stage: 5, count: 8, percentage: 15.2 },
    { stage: 6, count: 7, percentage: 13.3 },
    { stage: 7, count: 7, percentage: 13.3 }
  ],
  dimensions: [
    { name: '生存安全', questions: ['q1', 'q2', 'q4', 'q6', 'q7', 'q9', 'q13', 'q15'] },
    { name: '自我探索', questions: ['q1', 'q2', 'q4', 'q6', 'q13', 'q15', 'q17', 'q18', 'q19'] },
    { name: '社会关系', questions: ['q1', 'q2', 'q4', 'q6', 'q7', 'q10', 'q11', 'q15', 'q18'] },
    { name: '成就目标', questions: ['q1', 'q2', 'q4', 'q6', 'q7', 'q9', 'q10', 'q11', 'q13', 'q15'] },
    { name: '意义寻求', questions: ['q3', 'q5', 'q7', 'q8', 'q9', 'q10', 'q12', 'q14', 'q16', 'q17', 'q20'] },
    { name: '服务贡献', questions: ['q3', 'q5', 'q8', 'q9', 'q12', 'q13', 'q14', 'q15', 'q16', 'q21'] },
    { name: '灵性觉醒', questions: ['q3', 'q5', 'q8', 'q11', 'q12', 'q14', 'q17', 'q20', 'q21'] }
  ]
};
