import { useEffect, useState } from "react";
import {
    fetchTotalRatings,
    fetchAverageStoreRating,
} from "../services/ownerApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/logout";

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
    const [averageStoreRating, setAverageStoreRating] = useState(0);

    useEffect(() => {
        fetchTotalRatings().then(setTotalRatings);
        fetchAverageStoreRating().then(setAverageStoreRating);
    }, []);

    return (
        <main className="mx-auto w-full max-w-5xl p-6">
            <header className="mb-6">
                <h1 className="text-2xl font-semibold text-pretty">Owner Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                    Overview of your platform data
                </p>
                <LogoutButton />
            </header>

            <section
                aria-label="Key Metrics"
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
                <StatCard
                    title="Total Ratings on Store"
                    value={totalRatings}
                    href="/owner/ratings"
                    cta="View all ratings"
                />
                <StatCard
                    title="Average Rating"
                    value={averageStoreRating}
                />
            </section>
        </main>
    );
}
