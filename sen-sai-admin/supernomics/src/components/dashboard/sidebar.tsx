import { LayoutDashboard, Users, PieChart, MessageSquare, Settings } from "lucide-react"

interface SidebarProps {
  activePage: string
  setActivePage: (page: string) => void
}

export function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Organizations', icon: Users },
    { name: 'Usage', icon: PieChart },
    { name: 'Roles', icon: Settings },
    { name: 'System Users', icon: Users },
    { name: 'Feedback', icon: MessageSquare },
    { name: 'Recharge', icon: Settings },
    { name: 'Payment Logs', icon: Settings },
  ]

  return (
    <div className="w-64 border-r bg-white p-4">
      <div className="mb-8 flex items-center space-x-2">
        <h1 className="text-xl font-bold">SenSai Admin</h1>
      </div>
      
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActivePage(item.name.toLowerCase())}
            className={`flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              activePage === item.name.toLowerCase()
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="text-xs text-gray-500">
          <div>VT10420350</div>
        </div>
      </div>
    </div>
  )
}