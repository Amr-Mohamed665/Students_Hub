import * as Icons from 'lucide-react';
import StatCard from '../../atoms/StatCard/StatCard';

export default function StatsRow({ stats }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 'var(--space-5)',
        width: '100%',
        marginBottom: 'var(--space-6)',
      }}
    >
      {stats.map((stat, idx) => {
        const LucideIcon = Icons[stat.icon] || Icons.TrendingUp;
        return (
          <StatCard
            key={stat.id}
            icon={<LucideIcon size={20} />}
            label={stat.label}
            value={stat.value}
            subtitle={stat.subtitle}
            trend={stat.trend}
            trendUp={stat.trendUp}
            colorIndex={idx}
          />
        );
      })}
    </div>
  );
}
