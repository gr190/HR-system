import React, { useState } from 'react';
import { Menu, Home, Users, FileText, BarChart2, Settings, Sun, Moon, LogOut, MessageSquare } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePermissions } from '../hooks/usePermissions';

export default function Layout() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { hasPermission } = usePermissions();

  const navItems = [
    { path: '/dashboard', label: 'ダッシュボード', icon: <Home className="w-5 h-5" />, requiredLevel: 1 },
    { path: '/employees', label: '社員一覧', icon: <Users className="w-5 h-5" />, requiredLevel: 2 },
    { path: '/evaluations', label: '評価シート', icon: <FileText className="w-5 h-5" />, requiredLevel: 2 },
    { path: '/departments', label: '部署管理', icon: <BarChart2 className="w-5 h-5" />, requiredLevel: 3 },
    { path: '/objectives', label: '目標管理', icon: <FileText className="w-5 h-5" />, requiredLevel: 1 },
    { path: '/feedback', label: 'フィードバック', icon: <MessageSquare className="w-5 h-5" />, requiredLevel: 1 },
  ];

  const filteredNavItems = navItems.filter(item => hasPermission(item.requiredLevel));

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="メニュー"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold truncate">評価管理システム</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="ダークモード切替"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <div className="flex h-screen pt-[56px] md:pt-0">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-200 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:relative md:translate-x-0 flex flex-col ${
            sidebarOpen ? 'shadow-lg md:shadow-none' : ''
          }`}
          style={{ height: 'calc(100% - 56px)', marginTop: '56px' }}
        >
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
            <div className="hidden md:block px-4 py-6 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">評価管理システム</h1>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="hidden md:block">
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                >
                  <LogOut className="w-5 h-5" />
                  <span>ログアウト</span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <header className="hidden md:block bg-white dark:bg-gray-800 shadow-sm">
            <div className="px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {user?.name} ({user?.role})
                </span>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}