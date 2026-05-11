import { AntibodySequence, GenerationMode } from '../types';
import { API_BASE_URL, DEFAULT_MOTIF } from '../constants';

const HUMAN_FR_RESIDUES = ['V', 'Q', 'L', 'E', 'S', 'G', 'P', 'A', 'R', 'T', 'I', 'Y', 'W', 'F', 'D', 'K', 'N'];
const CDR_BIASED_RESIDUES = ['Y', 'S', 'G', 'T', 'D', 'N', 'A', 'R', 'W', 'F'];

const mutateResidue = (fixed: string, mode: GenerationMode, index: number) => {
  if (fixed && fixed !== '#') return fixed;
  const pool = mode === GenerationMode.CONSTGEN && index % 11 < 3 ? CDR_BIASED_RESIDUES : HUMAN_FR_RESIDUES;
  return pool[Math.floor(Math.random() * pool.length)];
};

const normalizeSeed = (seedSequence?: string) => {
  return (seedSequence || DEFAULT_MOTIF).replace(/\s/g, '').toUpperCase();
};

export const generateAntibodies = async (
  mode: GenerationMode,
  config: any,
  seedSequence?: string
) : Promise<AntibodySequence[]> => {
  console.log(`Submitting simulated inference job to ${API_BASE_URL}/humanize`);
  await new Promise(resolve => setTimeout(resolve, 1200));

  const template = normalizeSeed(seedSequence);
  const resultCount = config?.batchSize || 6;

  return Array.from({ length: resultCount }, (_, index) => {
    const sequence = template
      .split('')
      .map((char, pos) => mutateResidue(mode === GenerationMode.FREEGEN && pos % 7 !== 0 ? '#' : char, mode, pos + index))
      .join('');

    const vhBase = mode === GenerationMode.FREEGEN ? 0.89 : 0.85;
    const vhhBase = mode === GenerationMode.CONSTGEN ? 0.91 : 0.86;

    return {
      id: `AND-${Date.now().toString().slice(-5)}-${index + 1}`,
      sequence,
      length: sequence.length,
      scores: {
        vh: Number((vhBase + Math.random() * 0.05).toFixed(3)),
        vhh: Number((vhhBase + Math.random() * 0.04).toFixed(3)),
        germlineIdentity: Number((84 + Math.random() * 8).toFixed(1)),
        fr2Distance: Number((mode === GenerationMode.CONSTGEN ? 0.7 + Math.random() * 0.9 : 2.8 + Math.random() * 1.4).toFixed(1)),
        developability: Number((0.78 + Math.random() * 0.16).toFixed(3)),
      },
      source: 'Generated',
      generationMode: mode,
    };
  });
};

export const trainModel = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/train`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error("Training failed to start");
    return await response.json();
  } catch (error) {
    console.error("Training Trigger Failed:", error);
    return false;
  }
};
