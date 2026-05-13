import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import type { TooltipItem } from 'chart.js';
import { COLORS } from '../../../../hooks/useDashboard';

const gridColor = 'rgba(255,255,255,0.05)';
const tickColor = 'rgba(255,255,255,0.25)';
const tooltipBg = '#1a1a1a';

interface Props {
  moisLabels: string[];
  moisNombre: number[];
}

export function NombreChart({ moisLabels, moisNombre }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = new Chart(ref.current, {
      type: 'bar',
      data: {
        labels:   moisLabels,
        datasets: [{
          label:           'Nombre de paiements',
          data:            moisNombre,
          backgroundColor: COLORS.green,
          borderRadius:    4,
        }],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: tooltipBg,
            titleColor:      '#fff',
            bodyColor:       COLORS.green,
            callbacks: { label: (ctx: TooltipItem<'bar'>) => ` ${ctx.raw} paiements` },
          },
        },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } } },
          y: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } } },
        },
      },
    });
    return () => chart.destroy();
  }, [moisLabels, moisNombre]);

  if (moisLabels.length === 0) {
    return <p className="text-white/30 text-sm text-center py-8">Pas encore de données</p>;
  }

  return <canvas ref={ref} height={220} />;
}