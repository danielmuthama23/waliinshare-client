import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function UsageTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-sm">Chatbot</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-sm">Voicebot</span>
          </div>
        </div>
        <div className="mt-4 h-64 rounded bg-gray-100">
          <div className="flex h-full items-center justify-center text-gray-400">
            Usage trends chart will appear here
          </div>
        </div>
      </CardContent>
    </Card>
  )
}