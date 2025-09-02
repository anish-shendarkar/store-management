'use client'

import { useEffect, useState } from "react"
import type { allUsers } from "@/lib/allUsers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { fetchAllUsersInfo } from "@/services/adminApi"

export default function NormalUsers() {
    const [users, setUsers] = useState<allUsers[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUsers() {
            try {
                const data = await fetchAllUsersInfo()
                const mapped = data.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    email: item.email,
                    address: item.address,
                    role: item.role,
                    averageRating: item.role === "owner" ? item.averageRating ?? null : null,
                }))
                setUsers(mapped)
            } catch (err) {
                console.error("Failed to load", err)
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
                    <h1 className="text-2xl font-semibold text-pretty">All Users</h1>
                </div>
                <Button asChild variant="secondary">
                    <a href="/admin">Back to Dashboard</a>
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
                                    <th className="py-2 pr-4">Address</th>
                                    <th className="py-2 pr-4">Role</th>
                                    <th className="py-2 pr-4">Average rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u.id} className="border-b last:border-0">
                                        <td className="py-2 pr-4 font-medium">{u.name}</td>
                                        <td className="py-2 pr-4">{u.email}</td>
                                        <td className="py-2 pr-4">{u.address}</td>
                                        <td className="py-2 pr-4">{u.role}</td>
                                        <td className="py-2 pr-2">
                                            {u.role === "owner" ? u.averageRating ?? "-" : "-"}
                                        </td>
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
