import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Link2, LayoutDashboard, History, LogOut, LogIn, UserPlus, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
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

  return (
    <header className="sticky top-0 z-40 w-full bg-transparent backdrop-blur-md border-b border-slate-800/40">
      <div className="w-full px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-600 group-hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all">
            <Link2 className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg text-slate-100 tracking-tight">Clicky</span>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900/60 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/history"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900/60 transition-colors"
              >
                <History className="w-4 h-4 text-indigo-400" />
                <span>History</span>
              </Link>

              {/* User profile capsule */}
              <div className="hidden md:flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                    <User className="w-3 h-3" />
                  </div>
                )}
                <span className="font-medium max-w-[120px] truncate">{user?.name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800/80 bg-slate-900/40 hover:bg-slate-800 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
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
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900/60 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log in</span>
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
