import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

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
    <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl border border-[#B2E2EB] bg-[#FFFFFF]/95 backdrop-blur-xl shadow-2xl shadow-[#00A8CC]/10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#DDF2F5] border border-[#B2E2EB] text-[#0083A0] mb-3 shadow-inner">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#062E3B] tracking-tight">
            Welcome back
          </h1>
          <p className="text-xs sm:text-sm text-[#4A7A85] font-medium mt-1">
            Sign in to your Clicky account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#062E3B] mb-1.5" htmlFor="login-email">
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#B2E2EB] bg-[#FFFFFF] text-[#062E3B] text-sm outline-none focus:border-[#00A8CC] focus:ring-2 focus:ring-[#00A8CC]/20 transition-all placeholder:text-[#5E9EA8] font-medium shadow-sm"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#062E3B] mb-1.5" htmlFor="login-password">
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-[#B2E2EB] bg-[#FFFFFF] text-[#062E3B] text-sm outline-none focus:border-[#00A8CC] focus:ring-2 focus:ring-[#00A8CC]/20 transition-all placeholder:text-[#5E9EA8] font-medium shadow-sm"
                disabled={loading}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5E9EA8] hover:text-[#062E3B] transition-colors cursor-pointer"
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
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-[#00A8CC] to-[#20B2AA] hover:opacity-95 text-white text-xs font-bold shadow-md shadow-[#00A8CC]/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : null}
            <span>{loading ? 'Logging in...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-[#4A7A85] font-medium mt-6">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-[#0083A0] hover:text-[#005C70] font-bold transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
