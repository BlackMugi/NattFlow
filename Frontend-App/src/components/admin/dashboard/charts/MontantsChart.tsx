import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import type { TooltipItem } from 'chart.js';
import { COLORS } from '../../../../hooks/useDashboard';

const gridColor   = 'rgba(255,255,255,0.05)';
const tickColor   = 'rgba(255,255,255,0.25)';
const tooltipBg   = '#1a1a1a';

interface Props {
  moisLabels:  string[];
  moisMontant: number[];
}

export function MontantsChart({ moisLabels, moisMontant }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current || moisLabels.length === 0) return;
    const maxValue   = Math.max(...moisMontant, 0);
    const suggestedMax = Math.ceil(maxValue / 15000) * 15000;

    const chart = new Chart(ref.current, {
      type: 'line',
      data: {
        labels: moisLabels,
        datasets: [{
          label:              'Encaissé (FCFA)',
          data:               moisMontant,
          borderColor:        COLORS.orange,
          backgroundColor:    `${COLORS.orange}20`,
          borderWidth:        2,
          pointBackgroundColor: COLORS.orange,
          pointRadius:        4,
          fill:               true,
          tension:            0.3,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: tooltipBg,
            titleColor:      '#fff',
            bodyColor:       COLORS.orange,
            callbacks: {
              label: (ctx: TooltipItem<'line'>) => ` ${(ctx.raw as number).toLocaleString('fr-FR')} FCFA`,
            },
          },
        },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } } },
          y: {
            min: 0,
            max: suggestedMax,
            grid: { color: gridColor },
            ticks: {
              color: tickColor,
              font: { size: 11 },
              stepSize: 15000,
              callback: (v) => `${(Number(v) / 1000).toFixed(0)}k`,
            },
          },
        },
      },
    });
    return () => chart.destroy();
  }, [moisLabels, moisMontant]);

  if (moisLabels.length === 0) {
    return <p className="text-white/30 text-sm text-center py-8">Pas encore de données</p>;
  }

  return <canvas ref={ref} height={220} />;
}