import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BookOpen, Code2, Database, Workflow } from 'lucide-react';

export const Documentation: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="text-science-600" />
            Documentation
          </h1>
          <p className="text-slate-500">Operational guide for the AnDiff nanobody humanization platform.</p>
        </div>
        <Button variant="outline">Download API Spec</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Workflow" className="lg:col-span-2">
          <div className="space-y-5">
            <DocStep
              icon={<Database className="text-science-600" />}
              title="1. Prepare CDR Input"
              body="Submit IMGT-aligned CDR1, CDR2, and CDR3 residues, or paste a full VHH sequence and mask framework positions with #."
            />
            <DocStep
              icon={<Workflow className="text-science-600" />}
              title="2. Choose Sampling Strategy"
              body="Use FreeGen for maximum template-free humanness, or ConstGen when FR2 and structural residue conservation are critical."
            />
            <DocStep
              icon={<Code2 className="text-science-600" />}
              title="3. Review Ranked Candidates"
              body="Results are ranked by AbNatiV-VH, AbNatiV-VHH, human germline identity, FR2 distance, and developability score."
            />
          </div>
        </Card>

        <Card title="Service Status">
          <div className="space-y-4 text-sm">
            <Status label="Inference API" value="Online" />
            <Status label="TorchServe Model" value="AnDiff-v2.1" />
            <Status label="Redis Queue" value="Healthy" />
            <Status label="MySQL Result Store" value="Replicated" />
            <Status label="TensorRT Runtime" value="Enabled" />
          </div>
        </Card>
      </div>

      <Card title="REST API Preview">
        <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <div className="text-slate-400">POST /api/v1/humanize</div>
          <pre className="mt-3 whitespace-pre-wrap">{`{
  "strategy": "constgen",
  "imgt_scheme": true,
  "sequence": "EVQLVES...CAK#######WGQGTQVTVSS",
  "batch_size": 6,
  "objectives": ["AbNatiV_VH", "AbNatiV_VHH", "FR2_Conservation"]
}`}</pre>
        </div>
      </Card>
    </div>
  );
};

const DocStep = ({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) => (
  <div className="flex gap-4">
    <div className="p-3 bg-science-50 rounded-lg h-fit">{icon}</div>
    <div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600 mt-1">{body}</p>
    </div>
  </div>
);

const Status = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
    <span className="text-slate-500">{label}</span>
    <span className="font-semibold text-green-600">{value}</span>
  </div>
);
