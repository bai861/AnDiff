import React from 'react';
import { Card } from '../components/ui/Card';
import { Activity, Database, Zap, FileText } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">AnDiff Operations Dashboard</h1>
        <p className="text-slate-500">Template-free nanobody humanization with autoregressive adaptive diffusion.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={<Database className="text-science-600" />}
          label="Training Sequences"
          value="4.23M"
          sub="OAS heavy chains + VHH"
        />
        <StatsCard
          icon={<Zap className="text-yellow-500" />}
          label="Humanized Variants"
          value="18,640"
          sub="Last run: 3 mins ago"
        />
        <StatsCard
          icon={<Activity className="text-green-500" />}
          label="Function Retention"
          value="96%"
          sub="ConstGen wet-lab tier"
        />
        <StatsCard
          icon={<FileText className="text-purple-500" />}
          label="Active Model"
          value="AnDiff-v2.1"
          sub="VH/VHH dual objective"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Project Roadmap & Deployment Status" className="lg:col-span-2">
          <div className="space-y-4">
            <RoadmapItem
              done
              title="Phase 1: Antibody Data Curation"
              desc="Collected IMGT-aligned human VH and camelid VHH sequences from OAS, SAbDab, and UniProt."
            />
            <RoadmapItem
              done
              title="Phase 2: Human Heavy-Chain Pretraining"
              desc="Learned CDR-to-FR reconstruction patterns from 3.39M high-quality human heavy-chain sequences."
            />
            <RoadmapItem
              active
              title="Phase 3: Nanobody Humanization Fine-Tuning"
              desc="Optimizing humanness while stabilizing VHH naturalness with AbNatiV-guided objectives."
            />
            <RoadmapItem
              title="Phase 4: Enterprise Validation"
              desc="Batch inference, exportable reports, and wet-lab validation for clinical candidate screening."
            />
          </div>
        </Card>

        <Card title="Quick Actions">
          <div className="flex flex-col gap-3">
            <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors flex items-center justify-between group">
              <span className="font-medium text-slate-700">New Humanization Run</span>
              <span className="text-science-600 group-hover:translate-x-1 transition-transform">-&gt;</span>
            </button>
            <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors flex items-center justify-between group">
              <span className="font-medium text-slate-700">Review Inference Queue</span>
              <span className="text-science-600 group-hover:translate-x-1 transition-transform">-&gt;</span>
            </button>
            <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors flex items-center justify-between group">
              <span className="font-medium text-slate-700">Upload CDR Panel</span>
              <span className="text-science-600 group-hover:translate-x-1 transition-transform">-&gt;</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

const StatsCard = ({ icon, label, value, sub }: any) => (
  <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
    <div className="p-3 bg-slate-50 rounded-full border border-slate-100">
      {icon}
    </div>
    <div>
      <div className="text-slate-500 text-sm font-medium">{label}</div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-xs text-slate-400">{sub}</div>
    </div>
  </div>
);

const RoadmapItem = ({ done, active, title, desc }: any) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 
        ${done ? 'bg-science-600 border-science-600 text-white' :
          active ? 'bg-white border-science-600 text-science-600' : 'bg-slate-100 border-slate-300'}`}>
        {done && <span className="text-xs">✓</span>}
        {active && <div className="w-2 h-2 bg-science-600 rounded-full animate-pulse"></div>}
      </div>
      <div className="w-0.5 h-full bg-slate-200 my-1 last:hidden"></div>
    </div>
    <div className="pb-6">
      <h4 className={`font-semibold ${active ? 'text-science-700' : 'text-slate-800'}`}>{title}</h4>
      <p className="text-sm text-slate-600 mt-1">{desc}</p>
    </div>
  </div>
);
