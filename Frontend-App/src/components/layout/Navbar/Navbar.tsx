import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../../assets/img/Logo.png';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'font-bold text-[#ff7200]' : 'hover:text-[#ff7200] transition-colors';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, isLoggedIn, firstLetter, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo + Nav */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex justify-center items-center gap-2">
            <img src={Logo} alt="logo" className="max-h-10" />
            <span className="font-['Poppins',sans-serif] text-[21px] font-extrabold text-white tracking-[-0.5px]">
              Natt<span className="text-[#ff7200]">Flow</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center text-lg gap-6 text-white">
            <NavLink to="/" className={linkClass}>Accueil</NavLink>
            <NavLink to="/suivis-du-status" className={linkClass}>Suivis du statut</NavLink>
            <NavLink to="/mes-paiements" className={linkClass}>Mes Paiements</NavLink>
          </nav>
        </div>

        {/* Droite : burger + dropdown */}
        <div className="flex items-center gap-4">
          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* User dropdown desktop */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center cursor-pointer bg-[#ff7200] w-9 h-9 rounded-full font-bold text-white"
                >
                  {firstLetter}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-[#171717] shadow-lg rounded-lg overflow-hidden z-50 border border-white/10">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-white text-sm font-semibold truncate">{user?.prenom}</p>
                      <p className="text-white/40 text-xs truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/profil"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-white/5 text-white hover:text-[#ff7200] transition-colors text-sm"
                    >
                      Profil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-sm"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-[#ff7200] text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Se connecter
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0d0d0d] border-t border-white/10">
          <nav className="flex flex-col px-6 py-4 text-white gap-3">
            <NavLink to="/" className={linkClass} onClick={() => setMobileOpen(false)}>Accueil</NavLink>
            <NavLink to="/suivis-du-status" className={linkClass} onClick={() => setMobileOpen(false)}>Suivis du statut</NavLink>
            <NavLink to="/mes-paiements" className={linkClass} onClick={() => setMobileOpen(false)}>Mes Paiements</NavLink>

            <div className="border-t border-white/10 my-2" />

            {isLoggedIn ? (
              <>
                <Link to="/profil" onClick={() => setMobileOpen(false)} className="text-sm">
                  Profil
                </Link>
                <button onClick={handleLogout} className="text-red-400 text-left text-sm">
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
      )}
    </header>
  );
}

export default Navbar;