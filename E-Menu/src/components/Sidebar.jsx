import React, { useState } from 'react'
import {
  User,
  Home,
  Plus,
  ShoppingBag,
  Settings,
  Menu as MenuIcon,
  LogOut,
} from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
  { id: 'new-menu', label: 'New Menu', icon: Plus, path: '/new-menu' },
  { id: 'orders', label: 'Orders', icon: ShoppingBag, path: '/orders' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
]

export function Sidebar({ activeView, onViewChange }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`
        fixed left-0 top-0 h-full flex flex-col justify-between
        bg-[#0e1626] border-r border-slate-700 shadow-xl z-50
        transition-all duration-300 ease-in-out
        ${isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0 w-72'}
        lg:relative lg:translate-x-0
      `}
        aria-label="Sidebar"
      >
        {/* Top section (Profile + Navigation) */}
        <div>
          {/* Profile */}
          <button className="flex items-center space-x-2 p-4 hover:bg-slate-800 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div className="text-left">
                <p className="text-sm font-medium text-white">Admin</p>
                <p className="text-xs text-slate-400">Restaurant Owner</p>
              </div>
            )}
          </button>

          {/* Navigation */}
          <nav className="p-6">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeView === item.id

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        onViewChange(item.id)
                        if (window.innerWidth < 1024) setIsCollapsed(true)
                      }}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                        transition-all duration-200 hover:scale-105 group
                        ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }
                        ${isCollapsed ? 'lg:justify-center lg:px-2' : ''}
                      `}
                    >
                      <Icon
                        className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}
                      />
                      {!isCollapsed && (
                        <span className="font-medium">{item.label}</span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* Bottom section (Logout) */}
        <div className="p-6">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors">
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>

        {/* Collapse toggle (desktop) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:block absolute -right-3 top-8 w-6 h-6 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors"
        >
          <MenuIcon className="w-3 h-3 text-slate-300" />
        </button>
      </nav>

      {/* Mobile menu button */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="fixed top-6 left-6 z-30 lg:hidden p-3 bg-slate-800 rounded-xl shadow-lg border border-slate-700"
        >
          <MenuIcon className="w-6 h-6 text-white" />
        </button>
      )}
    </>
  )
}
