import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function ActiveUsers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-sm font-medium text-gray-600">Total Active Users</span>
            <p className="text-2xl font-bold">54</p>
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium text-gray-600">Chat Only Active Users</span>
            <p className="text-2xl font-bold">53</p>
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium text-gray-600">Voice Only Active Users</span>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium text-gray-600">Chat + Voice Active Users</span>
            <p className="text-2xl font-bold">1</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}