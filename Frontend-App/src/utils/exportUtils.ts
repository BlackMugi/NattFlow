import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import type {
  MethodesPaiementType,
  MethodePaiementData,
} from '../hooks/useDashboard';
import type { CotisationResponseDTO } from '../types/cotisation.types';
import type { PaiementResponseDTO } from '../types/paiement.types';


interface ExportData {
  totalUsers: number;
  totalCotisations: number;
  totalEncaisse: number;
  enAttenteCount: number;
  moisLabels: string[];
  moisMontant: number[];
  tauxPaiementParMois: number[];
  moisNombre: number[];
  methodesPaiement: MethodesPaiementType;
}

export const exportToPDF = (data: ExportData): void => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Rapport Financier - NattFlow', 14, 20);
  doc.setFontSize(12);
  doc.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, 14, 30);

  const tableData = [
    ['Métrique', 'Valeur'],
    ['Total Membres', data.totalUsers.toString()],
    ['Total Cotisations', data.totalCotisations.toString()],
    ['Total Encaissé', `${data.totalEncaisse.toLocaleString('fr-FR')} FCFA`],
    ['Paiements en attente', data.enAttenteCount.toString()],
    ['', ''],
    ['Détails par mois (6 derniers mois)'],
    ...data.moisLabels.map((mois, i) => [
      mois,
      `Encaissé: ${data.moisMontant[i].toLocaleString('fr-FR')} FCFA, Taux: ${data.tauxPaiementParMois[i]}%, Nb: ${data.moisNombre[i]}`,
    ]),
    ['', ''],
    ['Détails par méthode de paiement'],
    ...Object.entries(data.methodesPaiement).map(
      ([methode, d]: [string, MethodePaiementData]) => [
        methode,
        `${d.count} paiements, Total: ${d.total.toLocaleString('fr-FR')} FCFA`,
      ],
    ),
  ];

  autoTable(doc, {
    body: tableData,
    startY: 40,
    theme: 'striped',
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [255, 114, 0] },
  });

  doc.save('rapport-nattflow.pdf');
};

export const exportToExcel = (data: ExportData): void => {
  const excelData = [
    { Métrique: 'Total Membres', Valeur: data.totalUsers },
    { Métrique: 'Total Cotisations', Valeur: data.totalCotisations },
    { Métrique: 'Total Encaissé (FCFA)', Valeur: data.totalEncaisse },
    { Métrique: 'Paiements en attente', Valeur: data.enAttenteCount },
    {},
    { Métrique: 'Performance par mois' },
    ...data.moisLabels.map((mois, i) => ({
      Mois: mois,
      Encaissé_FCFA: data.moisMontant[i],
      Taux_Paiement: `${data.tauxPaiementParMois[i]}%`,
      Nombre_Paiements: data.moisNombre[i],
    })),
    {},
    { Métrique: 'Détails par méthode' },
    ...Object.entries(data.methodesPaiement).map(
      ([methode, d]: [string, MethodePaiementData]) => ({
        Méthode: methode,
        Nombre_Paiements: d.count,
        Total_Encaissé_FCFA: d.total,
      }),
    ),
  ];

  const ws = XLSX.utils.json_to_sheet(excelData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Rapport NattFlow');
  XLSX.writeFile(
    wb,
    `rapport-nattflow-${new Date().toISOString().split('T')[0]}.xlsx`,
  );
};


export const exportCotisationsCSV = (cotisations: CotisationResponseDTO[]): void => {
  const headers = ['ID', 'Libellé', 'Mois', 'Montant (FCFA)', 'Date Échéance'];
  const rows = cotisations.map(c => [
    c.idCotisation,
    c.libelle,
    c.mois,
    c.montant,
    new Date(c.dateEcheance).toLocaleDateString('fr-FR'),
  ]);
  const csv  = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'cotisations.csv';
  a.click();
  URL.revokeObjectURL(url);
};

export const exportPaiementsCSV = (paiements: PaiementResponseDTO[]): void => {
  const headers = ['ID', 'Membre', 'Cotisation', 'Montant', 'Méthode', 'Statut', 'Date'];
  const rows = paiements.map(p => [
    p.idPaiement,
    `${p.prenomUser} ${p.nomUser}`,
    p.libelleCotisation,
    p.montant,
    p.method,
    p.statut,
    new Date(p.datePaiement).toLocaleDateString('fr-FR'),
  ]);
  const csv  = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'paiements.csv';
  a.click();
  URL.revokeObjectURL(url);
};