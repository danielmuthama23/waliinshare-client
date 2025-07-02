import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function TimeFilter() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="space-x-2">
          <span>Last 30 days</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Today</DropdownMenuItem>
        <DropdownMenuItem>Yesterday</DropdownMenuItem>
        <DropdownMenuItem>Last 7 days</DropdownMenuItem>
        <DropdownMenuItem>Last 30 days</DropdownMenuItem>
        <DropdownMenuItem>Custom</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}