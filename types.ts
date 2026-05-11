export enum GenerationMode {
  FREEGEN = 'freegen',
  CONSTGEN = 'constgen'
}

export enum ScorerType {
  HUMANNESS = 'AbNatiV_VH',
  NATIVENESS = 'AbNatiV_VHH',
  GERMLINE = 'Germline_Identity',
  FR2 = 'FR2_Conservation',
  LIABILITY = 'Developability_Liability'
}

export interface AntibodySequence {
  id: string;
  sequence: string;
  length: number;
  scores: {
    vh?: number;
    vhh?: number;
    germlineIdentity?: number;
    fr2Distance?: number;
    developability?: number;
  };
  source: 'Generated' | 'Natural' | 'Fine-tuned';
  generationMode?: GenerationMode;
}

export interface ModelConfig {
  baseModel: 'AnDiff-v1.8' | 'AnDiff-v2.1' | 'Research';
  diffusionSteps: number;
  temperature: number;
  topK: number;
  guidanceScale: number;
}

export interface TrainingJob {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  progress: number;
  currentEpoch: number;
  totalEpochs: number;
  loss: number;
}
