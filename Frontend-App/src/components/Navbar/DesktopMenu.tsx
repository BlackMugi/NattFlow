import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'font-bold text-[#ff7200]' : 'hover:text-[#ff7200] transition-colors';

function DesktopMenu() {
  return (
    <nav className="hidden md:flex items-center text-lg gap-6 text-white">
      <NavLink to="/" className={linkClass}>Accueil</NavLink>
      <NavLink to="#" className={linkClass}>Suivis du statut</NavLink>
      <NavLink to="#" className={linkClass}>Mes Paiements</NavLink>
    </nav>
  );
}

export default DesktopMenu;