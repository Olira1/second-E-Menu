import React, { useState } from 'react'
import { MenuProvider } from './context/MenuContext'
import { Sidebar } from './components/Sidebar'
import { Navbar } from './components/Navbar'
import { Dashboard } from './pages/Dashboard'
import { NewMenu } from './pages/NewMenu'
import { EditMenu } from './pages/EditMenu'

function App() {
  const [activeView, setActiveView] = useState('dashboard')

  const getPageTitle = () => {
    switch (activeView) {
      case 'dashboard':
        return 'Dashboard'
      case 'new-menu':
        return 'Add New Item'
      case 'edit-menu':
        return 'Edit Menu'
      case 'orders':
        return 'Orders'
      case 'settings':
        return 'Settings'
      default:
        return 'Dashboard'
    }
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />
      case 'new-menu':
        return <NewMenu />
      case 'edit-menu':
        return <EditMenu />
      case 'orders':
        return (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-white mb-2">
              Orders Page
            </h3>
            <p className="text-slate-400">This feature is coming soon!</p>
          </div>
        )
      case 'settings':
        return (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-white mb-2">
              Settings Page
            </h3>
            <p className="text-slate-400">This feature is coming soon!</p>
          </div>
        )
      default:
        return <Dashboard />
    }
  }

  return (
    <MenuProvider>
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Sidebar fixed with custom dark color */}
        <div className="w-64 fixed top-0 left-0 h-full">
          <Sidebar activeView={activeView} onViewChange={setActiveView} />
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 ml-64">
          {/* Navbar */}
          {/* <Navbar title={getPageTitle()} /> */}

          {/* Scrollable page body */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </MenuProvider>
  )
}

export default App
