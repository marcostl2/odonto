import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  LogOut, 
  Activity,
  Menu
} from 'lucide-react';

export const Layout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-100 hidden md:flex flex-col shadow-xl z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
          <Activity className="w-8 h-8 text-blue-500 mr-3" />
          <span className="text-xl font-bold tracking-tight">OdontoFlow</span>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg transition-colors group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            <span className="font-medium">Painel Principal</span>
          </NavLink>

          <NavLink 
            to="/financial" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg transition-colors group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <DollarSign className="w-5 h-5 mr-3" />
            <span className="font-medium">Financeiro</span>
          </NavLink>

          {/* This link is usually hidden in sidebar and accessed via Home, but added here for quick access demo */}
          <div className="mt-8 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Atalhos
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-slate-900 z-10 flex items-center justify-between px-4">
          <div className="flex items-center text-white">
            <Activity className="w-6 h-6 text-blue-500 mr-2" />
            <span className="font-bold text-lg">OdontoFlow</span>
          </div>
          <button className="text-white">
            <Menu className="w-6 h-6" />
          </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto md:p-8 p-4 pt-20 md:pt-8 scroll-smooth">
        <Outlet />
      </main>
    </div>
  );
};
