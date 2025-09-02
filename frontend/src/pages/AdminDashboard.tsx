import { useEffect, useState } from "react";
import {
    fetchTotalRatings,
    fetchTotalStores,
    fetchTotalUsers,
} from "../services/adminApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/logout";
import { Link } from "react-router-dom";

interface StatCardProps {
    title: string;
    value: number | string;
    href?: string;
    cta?: string;
}

function StatCard({ title, value, href, cta }: StatCardProps) {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="text-pretty">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between gap-4">
                <div className="text-3xl font-semibold">{value}</div>
                {href && cta ? (
                    <Button asChild>
                        <a href={href} aria-label={cta}>
                            {cta}
                        </a>
                    </Button>
                ) : null}
            </CardContent>
        </Card>
    );
}

export default function AdminDashboard() {
    const [totalRatings, setTotalRatings] = useState(0);
    const [totalStores, setTotalStores] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        fetchTotalRatings().then(setTotalRatings);
        fetchTotalStores().then(setTotalStores);
        fetchTotalUsers().then(setTotalUsers);
    }, []);

    return (
        <main className="mx-auto w-full max-w-5xl p-6">
            <header className="mb-6">
                <h1 className="text-2xl font-semibold text-pretty">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                    Overview of your platform data
                </p>
            </header>

            <section aria-label="Actions" className="mb-6 flex flex-wrap items-center gap-3">
                <LogoutButton />
                <Button asChild>
                    <Link to="/admin/stores/new">Add Store</Link>
                </Button>
                <Button variant="secondary" asChild>
                    <Link to="/admin/users/new">Add User</Link>
                </Button>
            </section>

            <section
                aria-label="Key Metrics"
                className="grid grid-cols-1 gap-4 md:grid-cols-3"
            >
                <StatCard
                    title="Total Users"
                    value={totalUsers}
                    href="/admin/users"
                    cta="View all users"
                />
                <StatCard
                    title="Total Stores"
                    value={totalStores}
                    href="/admin/stores"
                    cta="View all stores"
                />
                <StatCard title="Total Ratings" value={totalRatings} />
            </section>

            <section
                aria-label="Quick links"
                className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3"
            >
                <StatCard
                    title="Admin Users"
                    value="View"
                    href="/admin/users/admins"
                    cta="Admins"
                />
                <StatCard
                    title="Normal Users"
                    value="View"
                    href="/admin/users/regulars"
                    cta="Users"
                />
                <StatCard
                    title="All Users"
                    value="View"
                    href="/admin/users/all"
                    cta="All users"
                />
            </section>
        </main>
    );
}
