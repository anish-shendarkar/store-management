import { useEffect, useState } from "react";
import { fetchStores, searchStores } from "../services/userApi";
import { Link } from "react-router-dom";

interface Store {
  id: number;
  name: string;
  email: string;
  address: string;
}

export default function Stores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStores().then(setStores);
  }, []);

  const handleSearch = async () => {
    if (search.trim()) {
      const results = await searchStores(search);
      setStores(results);
    } else {
      const all = await fetchStores();
      setStores(all);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Stores</h1>
      <div className="my-4 flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or address"
          className="border p-2 rounded"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {stores.map((store) => (
          <div key={store.id} className="rounded-lg p-4 shadow-md border-2 border-transparent transition-all duration-300 hover:border-blue-500 hover:shadow-green-300 cursor-pointer">
            <h2 className="font-semibold">{store.name}</h2>
            <p>{store.email}</p>
            <p>{store.address}</p>
            <Link to={`/stores/${store.id}`} className="text-blue-600">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
