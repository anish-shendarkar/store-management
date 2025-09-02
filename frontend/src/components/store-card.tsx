"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Mail } from "lucide-react"
import { StarRating } from "./star-rating"

export type StoreSummary = {
  id: number
  name: string
  email?: string
  address?: string
  overallRating?: number
}

export function StoreCard({ store }: { store: StoreSummary }) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-pretty text-lg font-serif">{store.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-slate-600">
        {typeof store.overallRating === "number" && (
          <div className="flex items-center gap-2">
            <StarRating value={Math.round(store.overallRating)} readOnly size={18} />
            <span className="text-slate-700 font-medium">{store.overallRating.toFixed(1)}</span>
          </div>
        )}
        {store.email && (
          <div className="flex items-center gap-2">
            <Mail className="size-4 text-slate-500" />
            <span className="truncate">{store.email}</span>
          </div>
        )}
        {store.address && (
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-slate-500" />
            <span className="truncate">{store.address}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <link href={`/stores/${store.id}`}>View details</link>
        </Button>
      </CardFooter>
    </Card>
  )
}
