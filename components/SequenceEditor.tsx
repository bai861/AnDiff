import React, { useState, useEffect } from 'react';
import { SPECIAL_TOKENS } from '../constants';

interface SequenceEditorProps {
  initialSequence: string;
  onChange: (seq: string) => void;
}

export const SequenceEditor: React.FC<SequenceEditorProps> = ({ initialSequence, onChange }) => {
  const [sequence, setSequence] = useState<string[]>(initialSequence.split(''));

  useEffect(() => {
    onChange(sequence.join(''));
  }, [sequence, onChange]);

  const toggleMask = (index: number) => {
    const newSeq = [...sequence];
    if (newSeq[index] === SPECIAL_TOKENS.MASK) {
      newSeq[index] = 'G';
    } else {
      newSeq[index] = SPECIAL_TOKENS.MASK;
    }
    setSequence(newSeq);
  };

  const handleChangeChar = (index: number, char: string) => {
    const newSeq = [...sequence];
    // Allow A-Z and #
    if (/^[A-Za-z#]$/.test(char)) {
      newSeq[index] = char.toUpperCase();
      setSequence(newSeq);
    }
  };

  const addResidue = () => setSequence([...sequence, SPECIAL_TOKENS.MASK]);
  const removeResidue = () => setSequence(sequence.slice(0, -1));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
        {sequence.map((char, idx) => (
          <div key={idx} className="relative group flex flex-col items-center">
            <span className="text-xs text-slate-400 mb-1">{idx + 1}</span>
            <input
              type="text"
              value={char}
              onChange={(e) => handleChangeChar(idx, e.target.value)}
              className={`w-10 h-12 text-center text-lg font-mono border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-science-500 uppercase
                ${char === SPECIAL_TOKENS.MASK 
                  ? 'border-dashed border-slate-300 bg-slate-100 text-slate-400' 
                  : 'border-science-500 bg-white text-science-900 font-bold'
                }`}
            />
            <button
              onClick={() => toggleMask(idx)}
              className="mt-1 text-[10px] text-science-600 hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {char === SPECIAL_TOKENS.MASK ? 'Unmask' : 'Mask'}
            </button>
          </div>
        ))}
        
        <div className="flex flex-col gap-1 ml-2">
          <button 
            onClick={addResidue}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 transition-colors"
            title="Add Residue"
          >
            +
          </button>
          <button 
            onClick={removeResidue}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 transition-colors"
            title="Remove Residue"
          >
            -
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-500">
        <span className="font-bold">Instructions:</span> Use {SPECIAL_TOKENS.MASK} for framework positions that AnDiff should reconstruct. Type amino-acid letters to lock CDRs or conserved framework residues.
      </p>
    </div>
  );
};
