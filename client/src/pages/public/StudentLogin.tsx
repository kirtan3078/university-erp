import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";

type LoginFormValues = {
  enrollmentNumber: string;
  password: string;
  rememberMe: boolean;
};

export default function StudentLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const successMessage = (location.state as { successMessage?: string } | null)?.successMessage || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      enrollmentNumber: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const normalizedIdentifier = values.enrollmentNumber.trim();
      const payload = normalizedIdentifier.includes("@")
        ? { email: normalizedIdentifier, password: values.password }
        : { enrollmentNumber: normalizedIdentifier, password: values.password };

      const response = await api.post("/api/auth/student/login", payload);

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("authToken", token);
      }

      if (user) {
        login(user);
      }

      navigate("/student/dashboard");
    } catch (error) {
      const message = error instanceof Error && "response" in error
        ? ((error as { response?: { data?: { message?: string; error?: string } } }).response?.data?.message ||
          (error as { response?: { data?: { message?: string; error?: string } } }).response?.data?.error ||
          "Unable to sign in right now.")
        : "Unable to sign in right now.";

      setSubmitError(message || "Unable to sign in right now. Please verify your enrollment number and password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#020617] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_34%),radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.14),_transparent_26%),linear-gradient(135deg,_rgba(2,6,23,0.97),_rgba(2,8,23,1))]" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-6%] top-10 h-72 w-72 rounded-full bg-sky-500/15 blur-[120px]" />
        <div className="absolute bottom-[-6%] right-[-4%] h-72 w-72 rounded-full bg-fuchsia-500/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-900/60 p-5 shadow-[0_20px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:p-8">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6 sm:p-8">
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-500 text-2xl shadow-lg shadow-cyan-500/20">
                🎓
              </div>
            </div>

            <div className="mt-6 text-center">
              <h1 className="text-3xl font-semibold text-white">Student Login</h1>
              <p className="mt-2 text-sm leading-7 text-slate-400">Access your University ERP account.</p>
            </div>

            {successMessage ? (
              <div className="mt-6 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                {successMessage}
              </div>
            ) : null}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-sm text-slate-300" htmlFor="enrollmentNumber">
                  Enrollment Number
                </label>
                <input
                  id="enrollmentNumber"
                  type="text"
                  autoComplete="username"
                  className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="Enter enrollment number"
                  {...register("enrollmentNumber", {
                    required: "Enrollment number is required",
                    minLength: {
                      value: 4,
                      message: "Enrollment number must be at least 4 characters",
                    },
                  })}
                />
                {errors.enrollmentNumber && (
                  <p className="mt-2 text-sm text-rose-300">{errors.enrollmentNumber.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && <p className="mt-2 text-sm text-rose-300">{errors.password.message}</p>}
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/10 bg-slate-800 accent-cyan-500"
                  {...register("rememberMe")}
                />
                Remember Me
              </label>

              {submitError ? <p className="text-sm text-rose-300">{submitError}</p> : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-400 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                    Signing in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
              <Link to="/" className="transition hover:text-white">
                Back to Home
              </Link>
              <Link to="/register/student" className="transition hover:text-white">
                Don&apos;t have an account? Create Account
              </Link>
              <Link to="/forgot-password" className="transition hover:text-white">
                Forgot Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
