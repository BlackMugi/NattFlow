import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { getDashboardPath } from '../utils/routeUtils';

export function useLoginForm() {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);

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

  return {
    email, setEmail,
    password, setPassword,
    showPassword, setShowPassword,
    error,
    loading,
    onSubmit,
  };
}