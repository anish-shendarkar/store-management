import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStoreById, rateStore } from "../services/userApi";

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

  useEffect(() => {
    if (storeId) fetchStoreById(Number(storeId)).then(setStore);
  }, [storeId]);

  const handleRating = async () => {
    if (!storeId || myRating === 0) return;
    await rateStore(Number(storeId), myRating);
    const updated = await fetchStoreById(Number(storeId));
    setStore(updated);
  };

  if (!store) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{store.name}</h1>
      <p>Email: {store.email}</p>
      <p>Address: {store.address}</p>
      <p className="mt-2">⭐ Overall Rating: {store.overallRating}</p>

      <div className="mt-4">
        <label>Your Rating: </label>
        <select value={myRating} onChange={(e) => setMyRating(Number(e.target.value))}>
          <option value={0}>Select</option>
          {[1, 2, 3, 4, 5].map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
        <button onClick={handleRating} className="ml-2 bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
          Submit
        </button>
      </div>

      <h2 className="mt-6 font-semibold">Ratings:</h2>
      <ul className="space-y-2">
        {store.rating.map((r) => (
          <li key={r.id} className="border p-2 rounded">
            {r.user.name}: ⭐ {r.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
