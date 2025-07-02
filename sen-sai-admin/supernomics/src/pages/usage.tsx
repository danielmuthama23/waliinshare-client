import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TimeFilter } from "@/components/dashboard/time-filter"

export function Usage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Usage Analytics</h1>
        <TimeFilter />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Chat Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 rounded bg-gray-100 flex items-center justify-center text-gray-400">
              Chat sessions chart will appear here
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Voice Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 rounded bg-gray-100 flex items-center justify-center text-gray-400">
              Voice sessions chart will appear here
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 rounded bg-gray-100 flex items-center justify-center text-gray-400">
            User activity chart will appear here
          </div>
        </CardContent>
      </Card>
    </div>
  )
}