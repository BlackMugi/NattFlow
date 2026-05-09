import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getDashboardPath } from '../../utils/routeUtils'; 

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'font-bold text-[#ff7200]' : '';

function MobileMenu() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const dashboardPath = getDashboardPath();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="md:hidden bg-[#0d0d0d] border-t border-white/10">
      <nav className="flex flex-col px-6 py-4 text-white gap-3">
        <NavLink to="/" className={linkClass}>Accueil</NavLink>
        <NavLink to={dashboardPath} className={linkClass}>Tableau de travail</NavLink>
        <NavLink to="#" className={linkClass}>Suivis du statut</NavLink>
        <NavLink to="#" className={linkClass}>Mes Paiements</NavLink>

        <div className="border-t border-white/10 my-2" />

        {isLoggedIn ? (
          <>
            <Link to="/profile">Profil</Link>
            <button onClick={handleLogout} className="text-red-500 text-left">
              Déconnexion
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-[#ff7200] text-white font-bold rounded-lg text-center hover:bg-orange-600 transition-colors"
          >
            Se connecter
          </Link>
        )}
      </nav>
    </div>
  );
}

export default MobileMenu;