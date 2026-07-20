import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { Download } from 'lucide-react';
import * as Icons from 'lucide-react';
import TabGroup from '../../../components/molecules/TabGroup/TabGroup';
import StatCard from '../../../components/atoms/StatCard/StatCard';
import ChartCard from '../../../components/molecules/ChartCard/ChartCard';
import Button from '../../../components/atoms/Button/Button';
import {
  performanceStats,
  studyTimeTrend,
  lessonsCompleted,
  skillRadarData
} from '../../../data/mockData';
import styles from './PerformanceObservatory.module.css';

export default function PerformanceObservatory() {
  const [activeRange, setActiveRange] = useState('week');

  return (
    <div className={styles.container}>
      
      <div className={styles.observatoryHeader}>
        <div>
          <h2 className={styles.title}>This Week</h2>
          <p className={styles.subtitle}>Analyze cognitive growth and learning velocity.</p>
        </div>
      </div>

      
      <div className={styles.statsGrid}>
        {performanceStats.map((stat, index) => {
          const LucideIcon = Icons[stat.icon] || Icons.TrendingUp;
          return (
            <StatCard
              key={stat.id}
              icon={<LucideIcon size={20} />}
              label={stat.label}
              value={stat.value}
              subtitle={stat.subtitle || 'Compared to last cycle'}
              trend={stat.trend}
              trendUp={stat.trendUp}
              colorIndex={index}
            />
          );
        })}
      </div>

      
      <div className={styles.chartsGrid}>
        
        <ChartCard
          title="Study Time Trend"
          subtitle="Hours completed daily during this timeline"
          className={styles.fullWidthChart}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={studyTimeTrend} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorStudyHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06D6E0" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-surface-light)',
                  border: 'var(--glass-border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                }}
              />
              <Area type="monotone" dataKey="hours" stroke="#06D6E0" strokeWidth={2} fillOpacity={1} fill="url(#colorStudyHours)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        
        <ChartCard
          title="Lessons Completed"
          subtitle="Total modules finalized per week"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={lessonsCompleted} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-surface-light)',
                  border: 'var(--glass-border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                }}
              />
              <Bar dataKey="lessons" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        
        <ChartCard
          title="Skill Radar Mapping"
          subtitle="Current clearance level per technology"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillRadarData}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="subject" stroke="var(--text-secondary)" fontSize={10} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="var(--text-muted)" fontSize={10} />
              <Radar
                name="Skill"
                dataKey="score"
                stroke="#7C3AED"
                fill="#7C3AED"
                fillOpacity={0.25}
              />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
