import { useState } from 'react'
import { Dashboard } from './pages/dashboard'
import { Organizations } from './pages/organizations'
import { Usage } from './pages/usage'
import { Feedback } from './pages/feedback'
import { SystemUsers } from './pages/system-users'
import { Sidebar } from './components/dashboard/sidebar'
import { Toaster } from './components/ui/toaster'

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {
    switch (activePage.toLowerCase()) {
      case 'dashboard':
        return <Dashboard />
      case 'organizations':
        return <Organizations />
      case 'usage':
        return <Usage />
      case 'feedback':
        return <Feedback />
      case 'system users':
        return <SystemUsers />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 p-6 overflow-auto">
        {renderPage()}
      </main>
      <Toaster />
    </div>
  )
}

export default App