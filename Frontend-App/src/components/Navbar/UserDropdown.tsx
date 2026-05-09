import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function UserDropdown() {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, firstLetter, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isLoggedIn) {
    return (
      <Link
        to="/login"
        className="px-4 py-2 bg-[#ff7200] text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
      >
        Se connecter
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center cursor-pointer bg-[#0e00ab] w-8 h-8 rounded-full font-bold text-white"
      >
        {firstLetter}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-40 bg-[#171717] shadow-lg rounded-lg overflow-hidden z-50">
          <Link
            to="/profile"
            className="block px-4 py-2 hover:bg-[#1b1b1b] text-white hover:text-[#ff7200] hover:font-bold transition-colors"
          >
            Profil
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 bg-[#171717] hover:bg-red-500 hover:text-gray-100 text-red-500"
          >
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;