import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from './Layout/Layout';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user && user.role) {
      const role = user.role.toLowerCase();
      if (role === 'admin') navigate('/admin');
      else if (role === 'teacher') navigate('/teacher');
      else if (role === 'student') navigate('/student');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Login attempt with:', formData);
      const user = await login(formData);
      console.log('Login successful, user:', user);
      setError('');
      const role = user.role.toLowerCase();
      console.log('Redirecting to role-based path:', role);
      if (role === 'admin') navigate('/admin');
      else if (role === 'teacher') navigate('/teacher');
      else navigate('/student');
    } catch (err) {
      console.error('Detailed login failure:', err);
      if (err.response) {
        console.log('Error response data:', err.response.data);
        setError(err.response.data.message || 'Invalid identity credentials.');
      } else if (err.request) {
        console.log('Error request:', err.request);
        setError('Security system unreachable. Please ensure the backend authentication server is active on port 5000.');
      } else {
        console.log('General error:', err.message);
        setError('Authentication protocol failure. please refer to system logs.');
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] opacity-40 translate-x-1/2 -translate-y-1/2"></div>

        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4">
          <div className="glass-card border-brand-primary/10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-3 mb-8">
                <div
                  className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transition-transform border-2 border-brand-secondary"
                  onClick={() => navigate('/')}
                >
                  <span className="text-brand-secondary font-black text-3xl font-serif">S</span>
                </div>
              </div>
              <h1 className="text-4xl font-black text-brand-primary tracking-tight mb-3 font-serif">
                Portal Login
              </h1>
              <p className="text-slate-500 font-semibold mb-1">Welcome to SJIS Digital Hub</p>
              <p className="text-brand-primary/60 font-bold uppercase tracking-widest text-[10px]">
                Secure Academic Authentication
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="label-text">Identity Handle</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g. admin_01"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="label-text">Security Token</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl animate-in fade-in slide-in-from-top-4">
                  <p className="text-rose-600 font-black text-xs text-center uppercase tracking-widest flex items-center justify-center gap-3">
                    <span className="text-lg">⚠️</span>
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-5 btn-primary text-lg tracking-tight"
              >
                Login
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-50 text-center">
              <p className="text-slate-400 text-xs font-bold leading-relaxed px-4">
                By authenticating, you agree to our institutional security protocols and data sovereignty policies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

