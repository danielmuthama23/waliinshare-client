import { AppsOverview } from "@/components/dashboard/apps-overview"
import { ActiveUsers } from "@/components/dashboard/active-users"
import { UsageTrends } from "@/components/dashboard/usage-trends"
import { UserSearch } from "@/components/dashboard/user-search"
import { TimeFilter } from "@/components/dashboard/time-filter"

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Supernomics</h1>
        <TimeFilter />
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AppsOverview />
        <ActiveUsers />
      </div>
      
      <UsageTrends />
      <UserSearch />
    </div>
  )
}