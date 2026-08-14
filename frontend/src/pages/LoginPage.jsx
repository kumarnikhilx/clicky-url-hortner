import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/', { replace: true });
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Check your credentials.';
      toast.error(message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl border border-emerald-900/50 bg-[#071610]/90 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-900/50 text-emerald-400 mb-3 shadow-inner">
              <LogIn className="w-6 h-6" />
            </div>
            <h1 className="font-editorial text-2xl sm:text-3xl font-semibold text-emerald-100 tracking-tight">
              Welcome back
            </h1>
            <p className="text-xs sm:text-sm text-emerald-500/70 mt-1">
              Sign in to your Clicky account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-emerald-300 mb-1.5" htmlFor="login-email">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-900/50 bg-[#091a13] text-emerald-50 text-sm outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 transition-all placeholder:text-emerald-700/60 font-normal"
                disabled={loading}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-300 mb-1.5" htmlFor="login-password">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-emerald-900/50 bg-[#091a13] text-emerald-50 text-sm outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 transition-all placeholder:text-emerald-700/60 font-normal"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-300 transition-colors cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#34d399] hover:bg-[#2ee59d] active:bg-[#22c55e] text-[#051d10] text-xs font-bold shadow-md transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              <span>{loading ? 'Logging in...' : 'Sign In'}</span>
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-emerald-500/70 mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
