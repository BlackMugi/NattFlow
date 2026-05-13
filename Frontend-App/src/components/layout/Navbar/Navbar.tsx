import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../../assets/img/Logo.png';
import { Menu, X, Bell } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import {
  getNotificationsByUser,
  marquerCommeLu,
} from '../../../services/notificationService';
import type { NotificationResponseDTO } from '../../../types/notification.types';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'font-bold text-[#ff7200]'
    : 'hover:text-[#ff7200] transition-colors';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationResponseDTO[]>(
    [],
  );

  const notifRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, isLoggedIn, firstLetter, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Ferme les dropdowns au clic extérieur
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setNotifOpen(false);
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Charge les notifications de l'utilisateur connecté
  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const res = await getNotificationsByUser(user.idUser, 1, 5);
        setNotifications(Array.isArray(res) ? res : (res?.data ?? []));
      } catch {
        /* silencieux */
      }
    };
    void load();
    const interval = setInterval(() => void load(), 30_000);
    return () => clearInterval(interval);
  }, [user]);

  const nonLues = (notifications ?? []).filter((n) => !n.lu);

  const handleMarquerLu = async (id: number) => {
    await marquerCommeLu(id);
    setNotifications((prev) =>
      prev.map((n) => (n.idNotification === id ? { ...n, lu: true } : n)),
    );
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
            <NavLink to="/" className={linkClass}>
              Accueil
            </NavLink>
            <NavLink to="/suivis-du-status" className={linkClass}>
              Suivis du statut
            </NavLink>
            <NavLink to="/mes-paiements" className={linkClass}>
              Mes Paiements
            </NavLink>
          </nav>
        </div>

        {/* Droite */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {isLoggedIn && (
            <>
              {/* Cloche notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="cursor-pointer relative flex items-center justify-center w-9 h-9 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Bell size={20} />
                  {nonLues.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#ff7200] text-white text-[10px] font-bold flex items-center justify-center">
                      {nonLues.length > 9 ? '9+' : nonLues.length}
                    </span>
                  )}
                </button>

                {notifOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-[#171717] shadow-xl rounded-xl overflow-hidden z-50 border border-white/10">
                    <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                      <p className="text-white font-semibold text-sm">
                        Notifications
                      </p>
                      {nonLues.length > 0 && (
                        <span className="text-xs text-[#ff7200]">
                          {nonLues.length} non lue
                          {nonLues.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="text-white/30 text-sm text-center py-8">
                          Aucune notification
                        </p>
                      ) : (
                        notifications.map((n) => (
                          <button
                            key={n.idNotification}
                            onClick={() => {
                              void handleMarquerLu(n.idNotification);
                              setNotifOpen(false);
                              navigate(
                                `/mes-notifications/${n.idNotification}`,
                                { state: { notification: n } },
                              );
                            }}
                            className={`cursor-pointer w-full text-left px-4 py-3 border-b border-white/5 flex gap-3 hover:bg-white/5 transition-colors ${!n.lu ? 'bg-[#ff7200]/5' : ''}`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.lu ? 'bg-[#ff7200]' : 'bg-white/20'}`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-xs font-semibold truncate">
                                {n.titre}
                              </p>
                              <p className="text-white/50 text-xs truncate">
                                {n.message}
                              </p>
                              <p className="text-white/30 text-[10px] mt-0.5">
                                {new Date(n.dateCreation).toLocaleDateString(
                                  'fr-FR',
                                )}
                              </p>
                            </div>
                            {!n.lu && (
                              <div className="w-1.5 h-1.5 rounded-full bg-[#ff7200] shrink-0 mt-1.5" />
                            )}
                          </button>
                        ))
                      )}
                    </div>

                    <div className="px-4 py-2 border-t border-white/10">
                      <Link
                        to="/mes-notifications"
                        onClick={() => setNotifOpen(false)}
                        className="text-xs text-[#ff7200] hover:underline"
                      >
                        Voir toutes les notifications →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Avatar dropdown */}
              <div className="hidden md:block relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center cursor-pointer bg-[#ff7200] w-9 h-9 rounded-full font-bold text-white"
                >
                  {firstLetter}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-[#171717] shadow-lg rounded-lg overflow-hidden z-50 border border-white/10">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-white text-sm font-semibold truncate">
                        {user?.prenom}
                      </p>
                      <p className="text-white/40 text-xs truncate">
                        {user?.email}
                      </p>
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
            </>
          )}

          {!isLoggedIn && (
            <Link
              to="/login"
              className="hidden md:block px-4 py-2 bg-[#ff7200] text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Se connecter
            </Link>
          )}
        </div>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0d0d0d] border-t border-white/10">
          <nav className="flex flex-col px-6 py-4 text-white gap-3">
            <NavLink
              to="/"
              className={linkClass}
              onClick={() => setMobileOpen(false)}
            >
              Accueil
            </NavLink>
            <NavLink
              to="/suivis-du-status"
              className={linkClass}
              onClick={() => setMobileOpen(false)}
            >
              Suivis du statut
            </NavLink>
            <NavLink
              to="/mes-paiements"
              className={linkClass}
              onClick={() => setMobileOpen(false)}
            >
              Mes Paiements
            </NavLink>

            <div className="border-t border-white/10 my-2" />

            {isLoggedIn ? (
              <>
                <Link
                  to="/profil"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm"
                >
                  Profil
                </Link>
                <Link
                  to="/mes-notifications"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm"
                >
                  Notifications{' '}
                  {nonLues.length > 0 && (
                    <span className="text-[#ff7200]">({nonLues.length})</span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-400 text-left text-sm"
                >
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
