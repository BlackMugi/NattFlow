import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthRoute } from './middlewares/AuthRoute';
import { AdminRoute } from './middlewares/AdminRoute';
import { AdminLayout } from './components/layout/admin/AdminLayout';
import { MainLayout } from './components/layout/MainLayout';
import Accueil from './pages/Accueil';
import SuivisStatus from './pages/SuivisStatus';
import Paiement from './pages/Paiement';
import Profil from './pages/Profil';
import LoginPage from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import Utilisateurs from './pages/admin/Utilisateurs';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login seul, sans navbar */}
        <Route path="/login" element={<LoginPage />} />

        {/* Routes avec Navbar */}
        <Route element={<MainLayout />}>

          {/* Publiques */}
          <Route path="/" element={<Accueil />} />

          {/* Authentifiées */}
          <Route element={<AuthRoute />}>
            <Route path="/suivis-du-status" element={<SuivisStatus />} />
            <Route path="/mes-paiements" element={<Paiement />} />
            <Route path="/profil" element={<Profil />} />
          </Route>

        </Route>

        {/* Routes admin (sidebar, sans Navbar) */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/utilisateurs" element={<Utilisateurs />} />
            {/* <Route path="/admin/cotisations"  element={<Cotisations />} />  */}
            {/* <Route path="/admin/paiements"    element={<AdminPaiements />} />  */}
            {/* <Route path="/admin/notifications" element={<Notifications />} /> */}
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;