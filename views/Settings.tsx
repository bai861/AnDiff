import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Settings, ShieldCheck, SlidersHorizontal, Server } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="text-science-600" />
            Settings
          </h1>
          <p className="text-slate-500">Configure simulated platform behavior, model routing, and result handling.</p>
        </div>
        <Button onClick={handleSave}>{saved ? 'Saved' : 'Save Changes'}</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Inference Runtime">
          <div className="space-y-5">
            <Select label="Default Model" options={['AnDiff-v2.1 Production', 'AnDiff-v1.8 Stable', 'Research Checkpoint']} />
            <Select label="Default Strategy" options={['ConstGen', 'FreeGen', 'Auto Select']} />
            <Range label="Max Batch Size" value="64" />
            <Toggle label="Enable TensorRT Acceleration" checked />
            <Toggle label="Cache Completed Runs" checked />
          </div>
        </Card>

        <Card title="Security & Data">
          <div className="space-y-5">
            <Toggle label="Require User Authentication" checked />
            <Toggle label="Store Sequence History" checked />
            <Toggle label="Mask Exported Project IDs" />
            <Select label="Retention Window" options={['30 days', '90 days', '180 days']} />
            <Select label="Result Store" options={['MySQL Cluster', 'Local Indexed Cache', 'S3-Compatible Bucket']} />
          </div>
        </Card>
      </div>

      <Card title="System Modules">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Module icon={<Server />} title="API Gateway" body="Nginx reverse proxy with simulated load-balanced FastAPI workers." />
          <Module icon={<SlidersHorizontal />} title="Inference Queue" body="Redis-backed job queue with cached candidate ranking." />
          <Module icon={<ShieldCheck />} title="Audit Layer" body="Tracks run metadata, export actions, and operator settings." />
        </div>
      </Card>
    </div>
  );
};

const Select = ({ label, options }: { label: string; options: string[] }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <select className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white">
      {options.map(option => <option key={option}>{option}</option>)}
    </select>
  </div>
);

const Range = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="text-sm font-medium text-slate-700 flex justify-between">
      {label}
      <span className="text-slate-400 font-normal">{value}</span>
    </label>
    <input type="range" min="1" max="128" defaultValue={value} className="w-full accent-science-600" />
  </div>
);

const Toggle = ({ label, checked = false }: { label: string; checked?: boolean }) => (
  <label className="flex items-center justify-between gap-4">
    <span className="text-sm font-medium text-slate-700">{label}</span>
    <input type="checkbox" defaultChecked={checked} className="w-5 h-5 accent-science-600" />
  </label>
);

const Module = ({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) => (
  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
    <div className="text-science-600 mb-3">{icon}</div>
    <h3 className="font-semibold text-slate-900">{title}</h3>
    <p className="text-sm text-slate-600 mt-1">{body}</p>
  </div>
);
