import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export function UserSearch() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex space-x-4">
            <button className="font-medium text-blue-600">Chat Analytics</button>
            <button className="text-gray-600">Voice Analytics</button>
            <button className="text-gray-600">New User Analytics</button>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {['Dashboard', 'Sensal Users', 'Usage', 'Audio/Video', 'Sessions', 'Transcript', 'AI Chatbot', 'Response Workflows', 'Bot Messages'].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox id={item} checked={['Sensal Users', 'Sessions'].includes(item)} />
                <label htmlFor={item} className="text-sm font-medium leading-none">
                  {item}
                </label>
              </div>
            ))}
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-2 font-medium">USER ID</th>
                  <th className="text-left pb-2 font-medium">USER NAME</th>
                  <th className="text-left pb-2 font-medium">CHAT SESSIONS</th>
                  <th className="text-left pb-2 font-medium">TOTAL MESSAGES</th>
                  <th className="text-left pb-2 font-medium">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {[64890, 69730, 13419].map((id) => (
                  <tr key={id} className="border-b">
                    <td className="py-3">{id}</td>
                    <td className="py-3">N/A</td>
                    <td className="py-3">1</td>
                    <td className="py-3">0</td>
                    <td className="py-3">
                      <Checkbox checked />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="text-sm text-gray-500">2023-03-07 - 2023-09-13</div>
        </div>
      </CardContent>
    </Card>
  )
}