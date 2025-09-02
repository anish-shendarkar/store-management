import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { postNewStore } from "../services/adminApi";

export function NewStore() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.ownerId) {
      alert({
        title: "Missing required fields",
        description: "Name and Owner are required.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...formData,
        ownerId: Number(formData.ownerId), 
      };

      await postNewStore(payload);

      alert({ title: "Store created successfully!" });
      navigate("/admin");
    } catch (err: any) {
      alert({
        title: "Error",
        description: err.message || "Could not create store",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Store name"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="store@example.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          placeholder="123 Main St, City"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ownerId">Owner</Label>
        <Input
          id="ownerId"
          name="ownerId"
          placeholder="Owner ID"
          value={formData.ownerId}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Store"}
        </Button>
      </div>
    </form>
  );
}
