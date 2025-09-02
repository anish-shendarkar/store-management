import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStoreById, rateStore } from "../services/userApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/star-rating";
import { Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Store {
  id: number;
  name: string;
  email: string;
  address: string;
  overallRating: number;
  userRating?: number;
  rating: { id: number; value: number; user: { name: string } }[];
}

export default function StoreDetails() {
  const { storeId } = useParams<{ storeId: string }>();
  const [store, setStore] = useState<Store | null>(null);
  const [myRating, setMyRating] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (storeId) {
      fetchStoreById(Number(storeId)).then((res) => {
        setStore(res);
        setMyRating(res.userRating || 0);
      });
    }
  }, [storeId]);

  const handleRating = async () => {
    if (!storeId || myRating === 0) return;
    try {
      setSubmitting(true);
      await rateStore(Number(storeId), myRating);
      const updated = await fetchStoreById(Number(storeId));
      setStore(updated);
      setMyRating(updated.userRating || 0);
    } finally {
      setSubmitting(false);
    }
  };

  if (!store) return <p>Loading...</p>;

  return (
    <div className="space-y-6 mx-6 mt-6">
      <header>
        <h1 className="text-balance text-2xl font-semibold tracking-tight font-serif">
          {store.name}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Store details and community ratings.
        </p>
      </header>

      {/* Overview */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-serif">Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <StarRating
              value={Math.round(store.overallRating)}
              readOnly
              size={20}
            />
            <span className="font-medium">
              {store.overallRating.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="size-4 text-slate-500" />
            <span className="truncate">{store.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-slate-500" />
            <span className="truncate">{store.address}</span>
          </div>
        </CardContent>
      </Card>

      {/* User Rating */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-serif">Your Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <StarRating
              value={myRating}
              onChange={setMyRating}
              readOnly={false}
              size={24}
              label="Your rating"
            />
            <div className="text-sm text-slate-600">
              {myRating > 0
                ? `Selected: ${myRating} star${myRating === 1 ? "" : "s"}`
                : store.userRating
                ? `Your current rating: ${store.userRating}`
                : "Pick a rating from 1 to 5"}
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleRating} disabled={submitting || myRating === 0}>
              {submitting ? "Submitting..." : "Submit rating"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => setMyRating(0)}
              disabled={submitting || myRating === 0}
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Ratings */}
      <section>
        <h2 className="text-lg font-medium mb-3 font-serif">Recent Ratings</h2>
        <Separator />
        <ul className="mt-3 divide-y">
          {store.rating.length === 0 && (
            <li className="py-4 text-sm text-muted-foreground">
              No ratings yet. Be the first to rate this store.
            </li>
          )}
          {store.rating.map((r) => (
            <li key={r.id} className="py-3 flex items-center justify-between">
              <div className="min-w-0">
                <p className="font-medium text-slate-800 truncate">
                  {r.user?.name ?? "Anonymous"}
                </p>
                <p className="text-xs text-slate-500">left a rating</p>
              </div>
              <StarRating value={r.value} readOnly size={18} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
