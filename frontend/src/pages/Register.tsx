import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      await axios.post("http://localhost:3333/signup", { name, email, password, address });
      navigate("/login");
    } catch (err: any) {
      if (err.response?.data?.message) {
        const msg = err.response.data.message;

        if (Array.isArray(msg)) {
          const newErrors: { [key: string]: string } = {};
          msg.forEach((m: string) => {
            if (m.toLowerCase().includes("name")) newErrors.name = m;
            if (m.toLowerCase().includes("email")) newErrors.email = m;
            if (m.toLowerCase().includes("password")) newErrors.password = m;
            if (m.toLowerCase().includes("address")) newErrors.address = m;
          });
          setErrors(newErrors);
        } else {
          if (msg.toLowerCase().includes("exists")) {
            setErrors({ email: msg }); // show under email field
          } else {
            setErrors({ general: msg }); // show at bottom of form
          }
        }
      } else {
        setErrors({ general: "An unexpected error occurred." });
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister} className="p-4">
          <input
            className="border p-2 rounded mb-4 w-full"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}
          <input
            className="border p-2 rounded mb-4 w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
          <input
            className="border p-2 rounded mb-4 w-full"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}
          <input
            className="border p-2 rounded mb-4 w-full"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && <p className="text-red-500 text-sm mb-2">{errors.address}</p>}
          <button
            className='flex mx-auto px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200' type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
