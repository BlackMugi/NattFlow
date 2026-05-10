
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './middlewares/ProtectedRoute';
import Accueil from './pages/Accueil';
import SuivisStatus from './pages/SuivisStatus';
import Paiement from './pages/Paiement';
import Profil from './pages/Profil';
import LoginPage from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/suivis-du-status" element={<SuivisStatus />}/>
       <Route path="/suivis-du-status" element={<ProtectedRoute><SuivisStatus /></ProtectedRoute>}/>
        <Route path="/mes-paiements" element={<ProtectedRoute><Paiement /></ProtectedRoute>}/>
        <Route path="/profil" element={<ProtectedRoute><Profil /></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
