import { STATUT_PAIEMENT } from '../constants/paiement.constants';
import { usePaiement } from '../hooks/usePaiement';
import { PaiementModal } from '../components/paiement/PaiementModal';
import { CotisationDuMois } from '../components/paiement/CotisationDuMois';
import { CotisationList } from '../components/paiement/CotisationList';

export default function Paiement() {
  const {
    cotisations, loading,
    modal, setModal, closeModal,
    method, setMethod,
    payLoading, payError, paySuccess,
    totalVerse, cotisationDuMois, paiementDuMois,
    getPaiementPourCotisation, handlePayer,
  } = usePaiement();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0d0d0d]">Mes Paiements</h1>
        <p className="text-sm text-gray-500">Gérez vos cotisations et suivez vos versements</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        <div className="bg-[#0d0d0d] rounded-xl px-5 py-4">
          <p className="text-white/40 text-xs uppercase mb-1">Total à versé</p>
          <p className="text-white text-xl font-bold">{totalVerse.toLocaleString('fr-FR')} FCFA</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
          <p className="text-gray-400 text-xs uppercase mb-1">Cotisations</p>
          <p className="text-[#0d0d0d] text-xl font-bold">{cotisations.length}</p>
        </div>
        <div className={`rounded-xl px-5 py-4 border ${
          paiementDuMois?.statut === STATUT_PAIEMENT.VALIDE     ? 'bg-green-50 border-green-100'  :
          paiementDuMois?.statut === STATUT_PAIEMENT.EN_ATTENTE ? 'bg-yellow-50 border-yellow-100' :
          'bg-[#ff7200]/5 border-[#ff7200]/20'
        }`}>
          <p className="text-gray-400 text-xs uppercase mb-1">Mois en cours</p>
          <p className={`text-sm font-bold capitalize ${
            paiementDuMois?.statut === STATUT_PAIEMENT.VALIDE     ? 'text-green-600'  :
            paiementDuMois?.statut === STATUT_PAIEMENT.EN_ATTENTE ? 'text-yellow-600' :
            'text-[#ff7200]'
          }`}>
            {paiementDuMois?.statut === STATUT_PAIEMENT.VALIDE     ? '✓ Payé'        :
             paiementDuMois?.statut === STATUT_PAIEMENT.EN_ATTENTE ? '⏳ En attente' :
             cotisationDuMois ? '⚠ À payer' : 'Aucune cotisation'}
          </p>
        </div>
      </div>

      {cotisationDuMois && (
        <CotisationDuMois
          cotisation={cotisationDuMois}
          paiement={paiementDuMois}
          onPayer={c => setModal({ cotisation: c })}
        />
      )}

      <h2 className="text-base font-bold text-[#0d0d0d] mb-3">Toutes les cotisations</h2>
      <CotisationList
        cotisations={cotisations}
        loading={loading}
        idCotisationMoisCourant={cotisationDuMois?.idCotisation}
        getPaiement={getPaiementPourCotisation}
        onPayer={c => setModal({ cotisation: c })}
      />

      {modal && (
        <PaiementModal
          libelle={modal.cotisation.libelle}
          montant={modal.cotisation.montant}
          method={method}
          payLoading={payLoading}
          payError={payError}
          paySuccess={paySuccess}
          onClose={closeModal}
          onSubmit={handlePayer}
          onMethod={setMethod}
        />
      )}
    </div>
  );
}