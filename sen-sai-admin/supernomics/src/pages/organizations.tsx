import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"

export function Organizations() {
  const organizations = [
    { id: "ORG-001", name: "Supernomics", users: 54, sessions: 120 },
    { id: "ORG-002", name: "TechCorp", users: 32, sessions: 85 },
    { id: "ORG-003", name: "DataSystems", users: 28, sessions: 76 },
    { id: "ORG-004", name: "AnalyticsPro", users: 19, sessions: 42 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Organizations</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Organization
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Organizations</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search organizations..."
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-2 font-medium">ID</th>
                  <th className="text-left pb-2 font-medium">NAME</th>
                  <th className="text-left pb-2 font-medium">ACTIVE USERS</th>
                  <th className="text-left pb-2 font-medium">TOTAL SESSIONS</th>
                  <th className="text-left pb-2 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {organizations.map((org) => (
                  <tr key={org.id} className="border-b">
                    <td className="py-3">{org.id}</td>
                    <td className="py-3 font-medium">{org.name}</td>
                    <td className="py-3">{org.users}</td>
                    <td className="py-3">{org.sessions}</td>
                    <td className="py-3">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}