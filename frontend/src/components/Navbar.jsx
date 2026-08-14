import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link2, LogOut, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch {
      toast.error('Logout failed. Please try again.');
    }
  };

  const isHome = location.pathname === '/';
  const isHistory = location.pathname === '/history';

  return (
    <header className="sticky top-0 z-40 w-full bg-[#040e09]/70 backdrop-blur-md border-b border-emerald-950/40">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-emerald-400 group">
          <Link2 className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-editorial text-xl font-semibold tracking-wide text-emerald-100">
            Clicky
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden sm:flex items-center gap-8 text-xs font-semibold tracking-wider">
          <Link
            to="/"
            className={`transition-colors pb-1 ${
              isHome
                ? 'text-emerald-300 border-b-2 border-emerald-400 font-bold'
                : 'text-emerald-500/70 hover:text-emerald-300'
            }`}
          >
            Home
          </Link>
          <Link
            to={isAuthenticated ? "/history" : "/login"}
            className={`transition-colors pb-1 ${
              isHistory
                ? 'text-emerald-300 border-b-2 border-emerald-400 font-bold'
                : 'text-emerald-500/70 hover:text-emerald-300'
            }`}
          >
            History
          </Link>
        </nav>

        {/* Right: Auth / Action Buttons */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {/* User capsule */}
              <div className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-[#0a1e14] border border-emerald-900/50 text-xs text-emerald-300">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-emerald-900/60 flex items-center justify-center text-emerald-400">
                    <User className="w-3 h-3" />
                  </div>
                )}
                <span className="font-medium max-w-[120px] truncate text-emerald-200">{user?.name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-emerald-900/60 bg-[#0a1e14]/60 hover:bg-emerald-950 text-xs font-medium text-emerald-400 hover:text-emerald-200 transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs font-semibold text-emerald-300/80 hover:text-emerald-200 transition-colors px-2 py-1"
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-[#34d399] hover:bg-[#2ee59d] text-[#051d10] text-xs font-bold shadow-md shadow-emerald-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
