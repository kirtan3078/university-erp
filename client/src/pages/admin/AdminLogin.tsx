import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-6">

      {/* Background Blur */}
      <div className="absolute left-[-200px] top-[-150px] h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute right-[-180px] bottom-[-150px] h-[450px] w-[450px] rounded-full bg-fuchsia-500/20 blur-[150px]" />

      {/* Outer Card */}
      <div className="relative w-full max-w-md rounded-[34px] border border-slate-700/60 bg-slate-900/60 p-8 backdrop-blur-xl">

        {/* Inner Card */}
        <div className="rounded-[28px] border border-slate-700 bg-[#0b1024]/90 p-8">

          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
              <span className="h-2.5 w-2.5 rounded-full bg-green-400"></span>
              Secure Administrator Access
            </div>
          </div>

          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-4xl shadow-xl shadow-cyan-500/20">
              🛡️
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-center text-4xl font-bold text-white">
            Administrator Login
          </h1>

          <p className="mt-3 text-center text-slate-400">
            Access the University ERP Administration Panel.
          </p>

          <form
            onSubmit={handleLogin}
            className="mt-10 space-y-6"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-3 text-white placeholder:text-slate-500 transition focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-3 text-white placeholder:text-slate-500 transition focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/20"
              />
            </div>

            <button
              disabled={loading}
              className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 py-3 font-bold text-black transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg
                    className="mr-2 h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      opacity="0.3"
                    />
                    <path
                      d="M22 12a10 10 0 00-10-10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>

                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="mt-8 space-y-3 text-center text-sm">
            <Link
              to="/login"
              className="block text-slate-400 transition hover:text-cyan-400"
            >
              ← Back to Portal Selection
            </Link>

            <Link
              to="/login/forgot-password"
              className="block text-slate-400 transition hover:text-cyan-400"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}