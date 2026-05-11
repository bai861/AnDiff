import { ScorerType } from './types';

export const API_BASE_URL = 'https://andiff-inference.cluster.local';

export const AMINO_ACIDS = [
  'A', 'R', 'N', 'D', 'C', 'Q', 'E', 'G', 'H', 'I',
  'L', 'K', 'M', 'F', 'P', 'S', 'T', 'W', 'Y', 'V'
];

export const SPECIAL_TOKENS = {
  MASK: '#',
  PAD: '-',
  UNKNOWN: 'X'
};

export const AVAILABLE_SCORERS = [
  { id: ScorerType.HUMANNESS, name: 'AbNatiV-VH Humanness', description: 'Maximizes similarity to human heavy-chain framework distributions.' },
  { id: ScorerType.NATIVENESS, name: 'AbNatiV-VHH Nativeness', description: 'Stabilizes single-domain antibody naturalness during humanization.' },
  { id: ScorerType.GERMLINE, name: 'Human Germline Identity', description: 'Aligns generated FR regions with the nearest human germline family.' },
  { id: ScorerType.FR2, name: 'FR2 Key Residue Lock', description: 'Preserves nanobody residues that support CDR conformation and binding.' },
];

export const DEFAULT_MOTIF = "EVQLVESGGGLVQPGGSLRLSC#######YAMSWVRQAPGKGLEWVSA";
