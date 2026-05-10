import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Wallet,
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import Logo from '../../../assets/img/Logo.png';
import { useAuth } from '../../../hooks/useAuth';

interface Props {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

const NAV_ITEMS = [
  { to: '/admin',               icon: LayoutDashboard, label: 'Dashboard'      },
  { to: '/admin/utilisateurs',  icon: Users,           label: 'Utilisateurs'   },
  { to: '/admin/cotisations',   icon: Wallet,          label: 'Cotisations'    },
  { to: '/admin/paiements',     icon: CreditCard,      label: 'Paiements'      },
  { to: '/admin/notifications', icon: Bell,            label: 'Notifications'  },
];

export function AdminSidebar({ collapsed, setCollapsed }: Props) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen z-40 flex flex-col
        bg-[#0d0d0d] border-r border-white/10
        transition-all duration-300
        ${collapsed ? 'w-20' : 'w-60'}
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10 min-h-17">
        <img src={Logo} alt="logo" className="h-8 shrink-0" />
        {!collapsed && (
          <span className="font-['Poppins',sans-serif] text-[18px] font-extrabold text-white tracking-[-0.5px] whitespace-nowrap">
            Natt<span className="text-[#ff7200]">Flow</span>
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 px-2 py-4 overflow-y-auto">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin'}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg
              text-sm font-medium transition-all duration-150 group
              ${isActive
                ? 'bg-[#ff7200] text-white'
                : 'text-white/60 hover:bg-white/5 hover:text-white'}
            `}
          >
            <Icon size={20} className="shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">{label}</span>}

            {/* Tooltip quand collapsed */}
            {collapsed && (
              <div className="
                absolute left-20 bg-[#1a1a1a] text-white text-xs
                px-2 py-1 rounded-md whitespace-nowrap
                opacity-0 group-hover:opacity-100 pointer-events-none
                transition-opacity duration-150 border border-white/10
                shadow-lg
              ">
                {label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer : user + déconnexion */}
      <div className="border-t border-white/10 px-2 py-3 flex flex-col gap-1">
        {/* Profil */}
        <div className={`flex items-center gap-3 px-3 py-2 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-[#ff7200] flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold">
              {user?.prenom?.[0]?.toUpperCase() ?? '?'}
            </span>
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-white text-sm font-semibold truncate">{user?.prenom}</span>
              <span className="text-white/40 text-xs truncate">{user?.email}</span>
            </div>
          )}
        </div>

        {/* Déconnexion */}
        <button
          onClick={handleLogout}
          className={`
            flex items-center gap-3 px-3 py-2.5 rounded-lg w-full
            text-red-400 hover:bg-red-500/10 hover:text-red-300
            transition-all duration-150 text-sm font-medium
            ${collapsed ? 'justify-center' : ''}
          `}
        >
          <LogOut size={20} className="shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>

      {/* Bouton collapse */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="
          absolute -right-3 top-18
          w-6 h-6 rounded-full
          bg-[#ff7200] text-white
          flex items-center justify-center
          shadow-md hover:bg-[#be5500]
          transition-colors duration-150
        "
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  );
}