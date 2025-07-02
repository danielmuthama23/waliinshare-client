import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function AppsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Apps</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-600">All Apps</span>
            <span className="text-sm font-medium">Chatbot</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Total Chat Sessions</span>
              <span className="text-sm font-medium">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Total Messages</span>
              <span className="text-sm font-medium">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Total Voice Sessions</span>
              <span className="text-sm font-medium">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Total Voice Duration</span>
              <span className="text-sm font-medium">0.05 min</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}