export type StageId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Stage {
  id: StageId;
  name: string;
  description: string;
  characteristics: string[];
  growthAdvice: string[];
}

export interface StageDetail {
  definition: string;
  characteristics: string[];
  typicalBehaviors: string[];
  representativeGroups: string[];
  developmentSigns: string[];
  commonPitfalls: string[];
  growthSuggestions: string[];
}

export interface Answer {
  id: string;
  text: string;
  stageId: StageId;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

export interface TestResult {
  dominantStage: StageId;
  stageScores: Record<StageId, number>;
  totalQuestions: number;
  confidence: ConfidenceLevel;
  combinationStages?: StageId[];
  developmentTrend?: DevelopmentTrend;
}

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface DevelopmentTrend {
  current: StageId;
  direction: 'ascending' | 'descending' | 'stable';
  adjacentStage: StageId;
  description: string;
}

export interface CombinationInterpretation {
  stages: StageId[];
  mainTheme: string;
  description: string;
}
