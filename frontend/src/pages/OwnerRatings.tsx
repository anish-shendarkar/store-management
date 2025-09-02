'use client'

import { useEffect, useState } from "react"
import type { User } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { fetchStoreRatings } from "@/services/ownerApi"

export default function OwnerRatings() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchStoreRatings()
        const mapped = data.map((item: any) => ({
          id: item.user.id,
          name: item.user.name,
          email: item.user.email,
          rating: item.value,
        }))
        setUsers(mapped)
      } catch (err) {
        console.error("Failed to load ratings", err)
      } finally {
        setLoading(false)
      }
    }
    loadUsers()
  }, [])

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <main className="mx-auto w-full max-w-5xl p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-pretty">Users Ratings</h1>
        </div>
        <Button asChild variant="secondary">
          <a href="/owner">Back to Dashboard</a>
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Users ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left">
                <tr className="border-b">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Rating</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b last:border-0">
                    <td className="py-2 pr-4 font-medium">{u.name}</td>
                    <td className="py-2 pr-4">{u.email}</td>
                    <td className="py-2 pr-4">{u.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
