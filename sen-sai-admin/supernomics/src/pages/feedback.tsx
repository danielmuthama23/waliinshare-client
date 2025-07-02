import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TimeFilter } from "@/components/dashboard/time-filter"

export function Feedback() {
  const feedbackData = [
    { id: 1, rating: 5, comment: "Excellent service, very responsive", date: "2023-10-15", user: "user_64890" },
    { id: 2, rating: 4, comment: "Helpful but sometimes slow", date: "2023-10-14", user: "user_69730" },
    { id: 3, rating: 3, comment: "Average experience", date: "2023-10-12", user: "user_13419" },
    { id: 4, rating: 5, comment: "Solved my problem quickly", date: "2023-10-10", user: "user_78542" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Feedback</h1>
        <TimeFilter />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feedback Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">4.25</div>
              <div className="text-sm text-gray-500">Average Rating</div>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">24</div>
              <div className="text-sm text-gray-500">Total Feedback</div>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">18</div>
              <div className="text-sm text-gray-500">Positive (4-5 stars)</div>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-gray-500">Critical (1-2 stars)</div>
            </div>
          </div>

          <div className="space-y-4">
            {feedbackData.map((feedback) => (
              <div key={feedback.id} className="border rounded-lg p-4">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < feedback.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">{feedback.date}</div>
                </div>
                <p className="mt-2">{feedback.comment}</p>
                <div className="mt-2 text-sm text-gray-500">User: {feedback.user}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}