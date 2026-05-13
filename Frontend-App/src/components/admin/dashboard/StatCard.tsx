import { COLORS } from '../../../hooks/useDashboard';

interface Props {
  icon:    React.ReactNode;
  label:   string;
  value:   string | number;
  sub?:    string;
  accent?: string;
}

export function StatCard({ icon, label, value, sub, accent = COLORS.orange }: Props) {
  return (
    <div className="bg-[#0d0d0d] rounded-xl px-6 py-5 flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${accent}20` }}
      >
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <div>
        <p className="text-white/40 text-xs uppercase mb-0.5">{label}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
        {sub && <p className="text-white/30 text-xs mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}