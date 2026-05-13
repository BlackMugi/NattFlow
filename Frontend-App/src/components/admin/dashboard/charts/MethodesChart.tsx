import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import type { MethodesPaiementType } from '../../../../hooks/useDashboard';

const tooltipBg = '#1a1a1a';

interface Props {
  methodesPaiement: MethodesPaiementType;
  totalPaiements:   number;
}

export function MethodesChart({ methodesPaiement, totalPaiements }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = new Chart(ref.current, {
      type: 'doughnut',
      data: {
        labels:   Object.keys(methodesPaiement),
        datasets: [{
          data:            Object.values(methodesPaiement).map(m => m.count),
          backgroundColor: Object.values(methodesPaiement).map(m => m.color),
          borderWidth:     0,
          hoverOffset:     6,
        }],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: true,
        cutout:              '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: 'rgba(255,255,255,0.5)', font: { size: 11 }, padding: 16, usePointStyle: true },
          },
          tooltip: { backgroundColor: tooltipBg, titleColor: '#fff', bodyColor: '#fff' },
        },
      },
    });
    return () => chart.destroy();
  }, [methodesPaiement]);

  if (totalPaiements === 0) {
    return <p className="text-white/30 text-sm text-center py-8">Pas encore de données</p>;
  }

  return <canvas ref={ref} height={220} />;
}