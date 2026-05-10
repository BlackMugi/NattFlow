import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/img/Logo.png';
import Epargne from '../assets/img/Eparngne 1.png';
import { login } from '../services/authService';
import { getDashboardPath } from '../utils/routeUtils';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [error, setError]               = useState('');
  const [loading, setLoading]           = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password);
      navigate(getDashboardPath(user));  
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="flex shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-xl overflow-hidden w-[90vw] max-w-225">

        {/* Partie formulaire */}
        <div className="bg-[#c4c4c4] flex flex-col p-6 sm:p-8 w-[50%] min-w-70 rounded-tl-xl rounded-bl-xl">
          
          <div className="flex items-center mb-6">
            <img src={Logo} alt="Logo NattFlow" className="h-10" />
            <span className="font-['Poppins',sans-serif] text-[21px] font-extrabold text-white tracking-[-0.5px]">
              Natt<span className="text-[#ff7200]">Flow</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold font-['Barlow_Condensed'] mb-2">
            Bienvenue !
          </h1>
          <p className="text-sm sm:text-base text-black mb-6">
            Connectez-vous pour accéder à votre espace de travail
          </p>

          <form onSubmit={onSubmit}>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <label className="flex flex-col mb-4">
              <span className="flex items-center gap-2 text-black text-sm">
                <Mail size={16} /> Email
              </span>
              <input
                type="email"
                placeholder="exemple@nattflow.sn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 px-3 py-2 border border-[#1c1c1c33] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </label>

            <label className="flex flex-col mb-4">
              <span className="flex items-center gap-2 text-black text-sm">
                <Lock size={16} /> Mot de passe
              </span>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-[#1c1c1c33] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <div className="flex justify-between items-center mb-6 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 border border-[#1c1c1c33]" />
                Se souvenir de moi
              </label>
              <span className="text-[#ff7400] font-semibold cursor-pointer">
                Mot de passe oublié ?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}  
              className="w-full bg-[#ff7400] text-white py-2 rounded-lg hover:bg-[#be5500] transition disabled:opacity-50"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>

        {/* Partie image */}
        <div className="relative w-[50%] min-w-50 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,116,0,0.6)_0%,rgba(255,116,0,0.85)_50%,#ff7400_100%)] flex items-center justify-center rounded-tr-xl rounded-br-xl overflow-hidden">
          <img src={Epargne} alt="illustration" className="max-w-87.5 object-contain" />
        </div>

      </div>
    </div>
  );
}

export default LoginPage;