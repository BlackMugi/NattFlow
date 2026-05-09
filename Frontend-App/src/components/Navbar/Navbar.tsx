import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/Logo.png';
import DesktopMenu from './DesktopMenu.tsx';
import MobileMenu from './MobileMenu.tsx';
import UserDropdown from './UserDropdown.tsx';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        <div className="flex items-center gap-8">
          <Link to="/" className="flex justify-center items-center gap-2">
            <img src={Logo} alt="logo" className="max-h-10" />
            <span className="font-['Poppins',sans-serif] text-[21px] font-extrabold text-white tracking-[-0.5px]">
              Natt<span className="text-[#ff7200]">Flow</span>
            </span>
          </Link>

          <DesktopMenu />
        </div>

        <div className="flex items-center gap-4">
          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:block">
            <UserDropdown />
          </div>
        </div>
      </div>
      
      {mobileOpen && <MobileMenu />}
    </header>
  );
}

export default Navbar;