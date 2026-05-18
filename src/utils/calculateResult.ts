import type { TestResult, StageId, Answer, ConfidenceLevel, DevelopmentTrend, CombinationInterpretation } from '../types';
import { stages } from '../data/stages';

export function calculateResult(answers: Answer[], totalQuestions: number): TestResult {
  const stageScores: Record<StageId, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0
  };

  answers.forEach(answer => {
    stageScores[answer.stageId]++;
  });

  let dominantStage: StageId = 1;
  let maxScore = 0;

  Object.entries(stageScores).forEach(([stageIdStr, score]) => {
    const stageId = parseInt(stageIdStr) as StageId;
    if (score > maxScore) {
      maxScore = score;
      dominantStage = stageId;
    }
  });

  const confidence = calculateConfidence(stageScores, answers);
  const combinationStages = calculateCombinationStages(stageScores, maxScore);
  const developmentTrend = calculateDevelopmentTrend(stageScores, dominantStage, maxScore);

  return {
    dominantStage,
    stageScores,
    totalQuestions,
    confidence,
    combinationStages,
    developmentTrend
  };
}

export function calculateConfidence(stageScores: Record<StageId, number>, answers: Answer[]): ConfidenceLevel {
  const scores = Object.values(stageScores);
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
  const stdDev = Math.sqrt(variance);

  const maxPossibleStdDev = Math.sqrt((answers.length * Math.pow(scores.length - 1, 2) + (scores.length - 1) * Math.pow(-mean, 2)) / scores.length);
  const normalizedStdDev = stdDev / maxPossibleStdDev;

  if (normalizedStdDev > 0.5) return 'high';
  if (normalizedStdDev > 0.25) return 'medium';
  return 'low';
}

export function calculateCombinationStages(stageScores: Record<StageId, number>, maxScore: number): StageId[] | undefined {
  const threshold = maxScore * 0.8;
  const combinationStages = (Object.entries(stageScores) as [string, number][])
    .filter(([, score]) => score >= threshold)
    .map(([stageIdStr]) => parseInt(stageIdStr) as StageId)
    .sort((a, b) => a - b);

  return combinationStages.length > 1 ? combinationStages : undefined;
}

export function calculateDevelopmentTrend(stageScores: Record<StageId, number>, dominantStage: StageId, _maxScore: number): DevelopmentTrend {
  const adjacentStages: StageId[] = [];
  
  if (dominantStage > 1) adjacentStages.push((dominantStage - 1) as StageId);
  if (dominantStage < 7) adjacentStages.push((dominantStage + 1) as StageId);

  const dominantScore = stageScores[dominantStage];
  let adjacentStage: StageId = dominantStage;
  let direction: 'ascending' | 'descending' | 'stable' = 'stable';

  if (adjacentStages.length > 0) {
    const adjacentScores = adjacentStages.map(id => ({ id, score: stageScores[id] }));
    adjacentScores.sort((a, b) => b.score - a.score);
    
    if (adjacentScores[0].score > dominantScore * 0.5) {
      adjacentStage = adjacentScores[0].id;
      direction = adjacentStage > dominantStage ? 'ascending' : adjacentStage < dominantStage ? 'descending' : 'stable';
    }
  }

  const description = generateTrendDescription(dominantStage, adjacentStage, direction);

  return {
    current: dominantStage,
    direction,
    adjacentStage,
    description
  };
}

function generateTrendDescription(dominantStage: StageId, adjacentStage: StageId, direction: 'ascending' | 'descending' | 'stable'): string {
  const dominantStageInfo = stages.find(s => s.id === dominantStage)!;
  const adjacentStageInfo = stages.find(s => s.id === adjacentStage)!;

  if (direction === 'ascending') {
    return `你目前处于阶段${dominantStage}（${dominantStageInfo.name}）向阶段${adjacentStage}（${adjacentStageInfo.name}）发展的过程中。你的内心正在寻求更深层的意义和价值，准备迈向更高的意识层次。`;
  } else if (direction === 'descending') {
    return `你目前处于阶段${dominantStage}（${dominantStageInfo.name}）阶段，同时保持着对阶段${adjacentStage}（${adjacentStageInfo.name}）的关注。这种跨度显示了你整合不同层次智慧的能力。`;
  } else {
    return `你目前稳定地处于阶段${dominantStage}（${dominantStageInfo.name}）。这个阶段的特点与你当前的思维模式和行为方式高度一致，展现了你的内在统一性。`;
  }
}

export function getCombinationInterpretation(stages: StageId[]): CombinationInterpretation | null {
  if (stages.length < 2) return null;

  const themes: Record<string, string> = {
    '1-2': '安全与探索的平衡',
    '2-3': '自我认同与社会融入',
    '3-4': '社会角色与个人成就',
    '4-5': '成就追求与意义寻找',
    '5-6': '内在成长与服务他人',
    '6-7': '服务他人与觉醒合一',
    '1-3': '从生存到社会适应的过渡',
    '3-5': '社会角色与内在价值的整合',
    '4-6': '个人成长与利他主义的结合',
    '5-7': '意义寻求与觉醒的深化'
  };

  const key = stages.sort((a, b) => a - b).join('-');
  const theme = themes[key] || '多维度发展';

  const descriptions: Record<string, string> = {
    '1-2': '你正在从关注基本安全需求逐渐转向探索自我身份。这是一个充满好奇心的阶段，你在寻找属于自己的独特道路。',
    '2-3': '你既渴望保持自我独立性，又重视社会关系和归属感。这种平衡显示了你正在整合个人需求与社会期待。',
    '3-4': '你既重视社会角色和认可，又追求个人成就和目标实现。这显示了你既有社会适应能力，又有进取精神。',
    '4-5': '你在追求成功的同时，开始思考更深层的人生意义。这是从外在成就向内在价值转变的阶段。',
    '5-6': '你从对意义的寻求转向实际的行动，通过服务他人来体现自己的价值。这是智慧与慈悲并重的阶段。',
    '6-7': '你在服务他人中体验到与万物的连接，准备达到更高的觉醒状态。这是接近完全觉醒的阶段。'
  };

  return {
    stages,
    mainTheme: theme,
    description: descriptions[key] || '你的发展呈现出多维度特征，在不同层次间展现出平衡与整合的能力。'
  };
}

export function getConfidenceExplanation(confidence: ConfidenceLevel): string {
  const explanations: Record<ConfidenceLevel, string> = {
    high: '你的回答显示出很高的一致性。你对自己所处的意识层次有清晰的认识，测试结果具有很高的参考价值。',
    medium: '你的回答显示出中等程度的一致性。你可能处于发展的过渡期，或者在不同情境下展现出不同的层次特征。',
    low: '你的回答显示出较大的多样性。这可能表明你正在经历内在的转变，或者你的思维模式具有很强的灵活性。'
  };
  return explanations[confidence];
}
