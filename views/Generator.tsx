import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SequenceEditor } from '../components/SequenceEditor';
import { generateAntibodies } from '../services/mockBackend';
import { AntibodySequence, GenerationMode } from '../types';
import { Dna, Sliders, AlertCircle, Download, Server } from 'lucide-react';
import { DEFAULT_MOTIF } from '../constants';

export const Generator: React.FC = () => {
  const [mode, setMode] = useState<GenerationMode>(GenerationMode.FREEGEN);
  const [seedSequence, setSeedSequence] = useState<string>(DEFAULT_MOTIF);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<AntibodySequence[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResults([]);
    try {
      const data = await generateAntibodies(mode, { batchSize: 6 }, seedSequence);
      setResults(data);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Dna className="text-science-600" />
            Antibody Generator
          </h1>
          <p className="text-slate-500">
            Humanize nanobody frameworks from CDR input using AnDiff autoregressive adaptive diffusion.
          </p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setMode(GenerationMode.FREEGEN)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === GenerationMode.FREEGEN ? 'bg-white text-science-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            FreeGen
          </button>
          <button
            onClick={() => setMode(GenerationMode.CONSTGEN)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === GenerationMode.CONSTGEN ? 'bg-white text-science-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            ConstGen
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <Card title="Configuration">
            <div className="space-y-4">
              {mode === GenerationMode.CONSTGEN ? (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800 flex gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>
                    <strong>ConstGen Mode:</strong> CDRs and key FR2 residues are preserved while the remaining framework positions are reconstructed.
                  </span>
                </div>
              ) : (
                <div className="p-4 bg-science-50 border border-science-100 rounded-md text-sm text-science-800 flex gap-2">
                  <Server className="w-5 h-5 flex-shrink-0" />
                  <span>
                    <strong>FreeGen Mode:</strong> only the antigen-binding CDR signal is locked and the framework is generated without a parent-template dependency.
                  </span>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">IMGT Length Window</label>
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue="118" className="w-20 border border-slate-300 rounded px-2 py-1" />
                  <span className="text-slate-400">-</span>
                  <input type="number" defaultValue="152" className="w-20 border border-slate-300 rounded px-2 py-1" />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 flex justify-between">
                    Temperature
                    <span className="text-slate-400 font-normal">0.8</span>
                  </label>
                  <input type="range" min="0" max="2" step="0.1" defaultValue="0.8" className="w-full accent-science-600" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 flex justify-between">
                    Humanness Guidance
                    <span className="text-slate-400 font-normal">3.0</span>
                  </label>
                  <input type="range" min="0" max="10" step="0.5" defaultValue="3" className="w-full accent-science-600" />
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                isLoading={isGenerating}
                className="w-full h-12 text-lg shadow-md"
              >
                {isGenerating ? 'Diffusing Frameworks...' : 'Generate Sequences'}
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <Card title="CDR / Framework Mask Editor">
            <SequenceEditor
              initialSequence={seedSequence}
              onChange={setSeedSequence}
            />
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center justify-between">
              Generated Humanized Candidates
              {results.length > 0 && <span className="text-sm font-normal text-slate-500">{results.length} sequences found</span>}
            </h3>

            {results.length === 0 && !isGenerating ? (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl h-64 flex flex-col items-center justify-center text-slate-400">
                <Sliders className="w-12 h-12 mb-2 opacity-50" />
                <p>Configure parameters and click Generate Sequences</p>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((candidate) => (
                  <div key={candidate.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4 animate-fade-in-up">
                    <div className="flex-1 overflow-hidden">
                      <div className="font-mono text-sm font-bold text-slate-800 break-all tracking-wider leading-7">
                        {candidate.sequence.split('').map((char, i) => (
                          <span key={i} className={seedSequence[i] && seedSequence[i] !== '#' ? 'text-science-600' : ''}>
                            {char}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-slate-500 mt-2 flex flex-wrap gap-2">
                        <span className="bg-slate-100 px-2 py-0.5 rounded">Length: {candidate.length}</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded">ID: {candidate.id}</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded">{mode}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center justify-between border-t border-slate-100 pt-3">
                      <Metric label="AbNatiV-VH" value={candidate.scores.vh} good />
                      <Metric label="AbNatiV-VHH" value={candidate.scores.vhh} good />
                      <Metric label="Germline" value={`${candidate.scores.germlineIdentity}%`} />
                      <Metric label="FR2 Distance" value={candidate.scores.fr2Distance} />
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Metric = ({ label, value, good }: { label: string; value: React.ReactNode; good?: boolean }) => (
  <div className="text-center min-w-24">
    <div className="text-xs text-slate-400 uppercase font-bold">{label}</div>
    <div className={`text-lg font-bold ${good ? 'text-green-600' : 'text-slate-700'}`}>
      {value}
    </div>
  </div>
);
