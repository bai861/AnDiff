import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AVAILABLE_SCORERS } from '../constants';
import { ScorerType } from '../types';
import { Play } from 'lucide-react';

export const Training: React.FC = () => {
  const [selectedScorers, setSelectedScorers] = useState<ScorerType[]>([ScorerType.HUMANNESS, ScorerType.NATIVENESS, ScorerType.FR2]);
  const [isTraining, setIsTraining] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    '[System] AnDiff training environment ready.',
    '[System] GPU Available: NVIDIA A100 (40GB) x 2',
    '[Data] OAS human VH: 3,395,594 sequences | camelid VHH: 841,488 sequences'
  ]);

  const toggleScorer = (id: ScorerType) => {
    if (selectedScorers.includes(id)) {
      setSelectedScorers(selectedScorers.filter(s => s !== id));
    } else {
      setSelectedScorers([...selectedScorers, id]);
    }
  };

  const startTraining = () => {
    setIsTraining(true);
    setLogs(prev => [...prev, `[AnDiff] Initializing fine-tuning with objectives: ${selectedScorers.join(', ')}...`]);
    setTimeout(() => {
      setLogs(prev => [...prev, '[AnDiff] Loaded human VH pretraining checkpoint: epoch 50.']);
      setLogs(prev => [...prev, '[AnDiff] Starting VHH adaptation epoch 51... loss: 1.842 | VH: 0.884 | VHH drift: 0.026']);
    }, 1000);
    setTimeout(() => {
      setLogs(prev => [...prev, '[Queue] TensorRT calibration job scheduled for AnDiff-v2.1.']);
    }, 2300);
    setTimeout(() => {
      setIsTraining(false);
      setLogs(prev => [...prev, '[AnDiff] Fine-tuning paused after simulated validation checkpoint.']);
    }, 4200);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Model Training</h1>
          <p className="text-slate-500">Configure dual-stage nanobody humanization training and guided fine-tuning.</p>
        </div>
        <Button
          size="lg"
          onClick={startTraining}
          isLoading={isTraining}
          className="shadow-lg shadow-science-500/20"
        >
          <Play className="w-4 h-4 mr-2" />
          Start Fine-Tuning
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Guidance Objectives">
            <p className="mb-4 text-sm text-slate-600">
              Select the differentiable objectives that steer framework reconstruction during VHH adaptation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AVAILABLE_SCORERS.map(scorer => (
                <div
                  key={scorer.id}
                  onClick={() => toggleScorer(scorer.id)}
                  className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                    selectedScorers.includes(scorer.id)
                      ? 'border-science-500 bg-science-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900">{scorer.name}</span>
                    {selectedScorers.includes(scorer.id) && (
                      <span className="text-science-600">Active</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{scorer.description}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Hyperparameters">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Learning Rate" value="8e-5" />
              <Field label="Batch Size" value="64" type="number" />
              <Field label="Diffusion Steps (T)" value="100" type="number" />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Sampling Strategy</label>
                <select className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white">
                  <option>FreeGen + ConstGen Mixed</option>
                  <option>FreeGen Only</option>
                  <option>ConstGen Only</option>
                </select>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Live Terminal" className="bg-slate-900 text-slate-200 border-slate-800 h-96 overflow-hidden flex flex-col">
            <div className="font-mono text-xs space-y-2 flex-1 overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className="break-all border-l-2 border-transparent hover:border-slate-600 pl-2">
                  <span className="text-slate-500 mr-2">{new Date().toLocaleTimeString()}</span>
                  {log}
                </div>
              ))}
              {isTraining && (
                <div className="animate-pulse">_</div>
              )}
            </div>
          </Card>

          <Card title="Dataset Split">
            <div className="space-y-4">
              <Split label="Human VH Pretraining" value="3.39M" width="80%" color="bg-science-500" />
              <Split label="VHH Fine-Tuning" value="841k" width="20%" color="bg-purple-500" />
              <Split label="Independent Validation" value="318" width="12%" color="bg-yellow-500" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, type = 'text' }: { label: string; value: string; type?: string }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input type={type} defaultValue={value} className="w-full border border-slate-300 rounded-md px-3 py-2" />
  </div>
);

const Split = ({ label, value, width, color }: { label: string; value: string; width: string; color: string }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width }}></div>
    </div>
  </div>
);
