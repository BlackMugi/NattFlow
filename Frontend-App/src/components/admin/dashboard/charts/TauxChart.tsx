import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import type { TooltipItem } from 'chart.js';
import { COLORS } from '../../../../hooks/useDashboard';

const gridColor = 'rgba(255,255,255,0.05)';
const tickColor = 'rgba(255,255,255,0.25)';
const tooltipBg = '#1a1a1a';

interface Props {
  moisLabels:          string[];
  tauxPaiementParMois: number[];
}

export function TauxChart({ moisLabels, tauxPaiementParMois }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = new Chart(ref.current, {
      type: 'bar',
      data: {
        labels:   moisLabels,
        datasets: [{
          label:           'Taux de paiement (%)',
          data:            tauxPaiementParMois,
          backgroundColor: COLORS.orange,
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
            bodyColor:       COLORS.orange,
            callbacks: { label: (ctx: TooltipItem<'bar'>) => ` ${ctx.raw}%` },
          },
        },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } } },
          y: {
            min: 0,
            max: 100,
            grid: { color: gridColor },
            ticks: { color: tickColor, font: { size: 11 }, callback: (v) => `${v}%` },
          },
        },
      },
    });
    return () => chart.destroy();
  }, [moisLabels, tauxPaiementParMois]);

  if (moisLabels.length === 0) {
    return <p className="text-white/30 text-sm text-center py-8">Pas encore de données</p>;
  }

  return <canvas ref={ref} height={220} />;
}