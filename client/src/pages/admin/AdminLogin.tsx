import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/admin/login", {
        email,
        password,
      });

      localStorage.setItem("authToken", res.data.token);

      login(res.data.user);

      navigate("/admin/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl bg-slate-900 p-8"
      >
        <h1 className="mb-6 text-3xl font-bold text-white">
          Admin Login
        </h1>

        <input
          className="mb-4 w-full rounded p-3"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="mb-6 w-full rounded p-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full rounded bg-cyan-500 p-3 font-bold"
        >
          Login
        </button>
      </form>
    </div>
  );
}