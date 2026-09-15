export default function StatsCard({ title, value, icon, description }) {
  return (
    <div className="bg-surface-card border border-surface-border rounded-2xl p-6 shadow-sm space-y-2 flex flex-col justify-between">
      <div className="flex items-center justify-between text-surface-muted">
        <span className="text-xs font-bold uppercase tracking-wider">{title}</span>
        <div className="p-2 rounded-xl bg-surface-primary/10 text-surface-primary">
          {icon}
        </div>
      </div>
      <div>
        <div className="text-3xl font-black text-surface-text">{value}</div>
        {description && <p className="text-xs text-surface-muted mt-1">{description}</p>}
      </div>
    </div>
  );
}