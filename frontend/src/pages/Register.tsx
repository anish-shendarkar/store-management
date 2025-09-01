import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3333/signup", { email, password });
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4">
      <h2>Register</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password"
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
}
