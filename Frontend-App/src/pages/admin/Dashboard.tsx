import { Users, Wallet, TrendingUp, Clock, FileText, FileSpreadsheet } from 'lucide-react';
import { Chart, registerables } from 'chart.js';
import { useDashboard, COLORS } from '../../hooks/useDashboard';
import { exportToPDF, exportToExcel } from '../../utils/exportUtils';
import { StatCard } from '../../components/admin/dashboard/StatCard';
import { MontantsChart } from '../../components/admin/dashboard/charts/MontantsChart';
import { MethodesChart } from '../../components/admin/dashboard/charts/MethodesChart';
import { TauxChart } from '../../components/admin/dashboard/charts/TauxChart';
import { NombreChart } from '../../components/admin/dashboard/charts/NombreChart';
import { DerniersMembres } from '../../components/admin/dashboard/tables/DerniersMembres';
import { DerniersPaiements } from '../../components/admin/dashboard/tables/DerniersPaiements';

Chart.register(...registerables);
function Dashboard() {
  const {
    loading, users, totalUsers, totalCotisations,
    totalEncaisse, enAttente,
    moisLabels, moisMontant, moisNombre, tauxPaiementParMois,
    methodesPaiement, derniersPaiements,
  } = useDashboard();

  const handleExportPDF = () => exportToPDF({
    totalUsers, totalCotisations, totalEncaisse,
    enAttenteCount:      enAttente.length,
    moisLabels, moisMontant, tauxPaiementParMois, moisNombre,
    methodesPaiement,
  });

  const handleExportExcel = () => exportToExcel({
    totalUsers, totalCotisations, totalEncaisse,
    enAttenteCount:      enAttente.length,
    moisLabels, moisMontant, tauxPaiementParMois, moisNombre,
    methodesPaiement,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <p className="text-gray-400">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-black">

      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-gray-500">Vue d'ensemble de NattFlow</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportPDF}
            className="px-4 py-2 bg-[#ff7200]/20 text-[#ff7200] rounded-lg hover:bg-[#ff7200]/30 transition-colors flex items-center gap-2"
          >
            <FileText size={18} /> PDF
          </button>
          <button
            onClick={handleExportExcel}
            className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors flex items-center gap-2"
          >
            <FileSpreadsheet size={18} /> Excel
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Users size={22} />}     label="Membres"     value={totalUsers} />
        <StatCard icon={<Wallet size={22} />}    label="Cotisations" value={totalCotisations}                          accent={COLORS.green} />
        <StatCard icon={<TrendingUp size={22} />} label="Encaissé"   value={`${totalEncaisse.toLocaleString('fr-FR')} F`} accent={COLORS.green} />
        <StatCard icon={<Clock size={22} />}     label="En attente"  value={enAttente.length} sub="paiements à valider" accent={COLORS.yellow} />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2 bg-[#0d0d0d] rounded-xl p-6">
          <p className="text-white font-semibold mb-4">Montants encaissés par mois (6 derniers mois)</p>
          <MontantsChart moisLabels={moisLabels} moisMontant={moisMontant} />
        </div>
        <div className="bg-[#0d0d0d] rounded-xl p-6">
          <p className="text-white font-semibold mb-4">Répartition par méthode de paiement</p>
          <MethodesChart methodesPaiement={methodesPaiement} totalPaiements={derniersPaiements.length} />
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <DerniersMembres users={users} />
        <div className="bg-[#0d0d0d] rounded-xl p-6">
          <p className="text-white font-semibold mb-4">Taux de paiement par mois (%)</p>
          <TauxChart moisLabels={moisLabels} tauxPaiementParMois={tauxPaiementParMois} />
        </div>
      </div>

      {/* Charts row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#0d0d0d] rounded-xl p-6">
          <p className="text-white font-semibold mb-4">Nombre de paiements par mois</p>
          <NombreChart moisLabels={moisLabels} moisNombre={moisNombre} />
        </div>
        <DerniersPaiements paiements={derniersPaiements} />
      </div>

    </div>
  );
}


export default Dashboard