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
    <header className="sticky top-0 z-40 w-full bg-[#EBF6F8]/90 backdrop-blur-md border-b border-[#B2E2EB]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-[#0083A0] group">
          <Link2 className="w-5 h-5 text-[#00A8CC] group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-editorial text-xl font-bold tracking-wide text-[#062E3B]">
            Clicky
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden sm:flex items-center gap-8 text-xs font-semibold tracking-wider">
          <Link
            to="/"
            className={`transition-colors pb-1 ${
              isHome
                ? 'text-[#062E3B] border-b-2 border-[#00A8CC] font-bold'
                : 'text-[#4A7A85] hover:text-[#062E3B]'
            }`}
          >
            Home
          </Link>
          <Link
            to={isAuthenticated ? "/history" : "/login"}
            className={`transition-colors pb-1 ${
              isHistory
                ? 'text-[#062E3B] border-b-2 border-[#00A8CC] font-bold'
                : 'text-[#4A7A85] hover:text-[#062E3B]'
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
              <div className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-[#DDF2F5] border border-[#B2E2EB] text-xs text-[#062E3B]">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#C6E9EF] flex items-center justify-center text-[#0083A0]">
                    <User className="w-3 h-3" />
                  </div>
                )}
                <span className="font-medium max-w-[120px] truncate text-[#062E3B]">{user?.name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#B2E2EB] bg-[#FFFFFF] hover:bg-[#DDF2F5] text-xs font-medium text-[#062E3B] hover:text-[#0083A0] transition-colors cursor-pointer shadow-sm"
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
                className="text-xs font-semibold text-[#062E3B] hover:text-[#0083A0] transition-colors px-2 py-1"
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00A8CC] to-[#20B2AA] hover:opacity-95 text-white text-xs font-bold shadow-md shadow-[#00A8CC]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
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
