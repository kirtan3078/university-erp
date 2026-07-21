import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "@/services/api";

type RegisterFormValues = {
  fullName: string;
  enrollmentNumber: string;
  email: string;
  mobileNumber: string;
  department: string;
  course: string;
  semester: number;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

const departments = ["Computer Science", "Mechanical", "Electrical", "Civil", "Business Administration"];
const courses = ["B.Tech", "M.Tech", "MBA", "BBA", "B.Sc"];
const semesters = [
  { label: "1st Semester", value: 1 },
  { label: "2nd Semester", value: 2 },
  { label: "3rd Semester", value: 3 },
  { label: "4th Semester", value: 4 },
  { label: "5th Semester", value: 5 },
  { label: "6th Semester", value: 6 },
  { label: "7th Semester", value: 7 },
  { label: "8th Semester", value: 8 },
];

export default function StudentRegister() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      fullName: "",
      enrollmentNumber: "",
      email: "",
      mobileNumber: "",
      department: "",
      course: "",
      semester: 1,
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const password = watch("password");

  const onSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await api.post("/api/auth/student/register", {
        fullName: values.fullName,
        enrollmentNumber: values.enrollmentNumber,
        email: values.email,
        mobileNumber: values.mobileNumber,
        department: values.department,
        course: values.course,
        semester: values.semester,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      navigate("/login/student", {
        replace: true,
        state: { successMessage: "Registration successful. Please log in." },
      });
    } catch (error) {
      const message = error instanceof Error && "response" in error
        ? ((error as { response?: { data?: { message?: string } } }).response?.data?.message || "Registration failed. Please try again.")
        : "Registration failed. Please try again.";
      setSubmitError(message);
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
        <div className="w-full max-w-5xl rounded-[2rem] border border-white/10 bg-slate-900/60 p-4 shadow-[0_20px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:p-8">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6 sm:p-8 lg:p-10">
            <div className="max-w-2xl text-center sm:mx-auto">
              <span className="inline-flex items-center rounded-full border border-sky-400/25 bg-sky-400/10 px-4 py-2 text-sm text-sky-200 backdrop-blur-sm">
                <span className="mr-2 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                Student onboarding
              </span>
              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Create Your Student Account
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                Join the University ERP and access your academic dashboard from day one.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  id="fullName"
                  className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="Enter your full name"
                  {...register("fullName", { required: "Full name is required" })}
                />
                {errors.fullName ? <p className="mt-2 text-sm text-rose-300">{errors.fullName.message}</p> : null}
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300" htmlFor="enrollmentNumber">
                  Enrollment Number
                </label>
                <input
                  id="enrollmentNumber"
                  className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="20250001"
                  {...register("enrollmentNumber", {
                    required: "Enrollment number is required",
                    minLength: { value: 4, message: "Enrollment number must be at least 4 characters" },
                  })}
                />
                {errors.enrollmentNumber ? <p className="mt-2 text-sm text-rose-300">{errors.enrollmentNumber.message}</p> : null}
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="student@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
                  })}
                />
                {errors.email ? <p className="mt-2 text-sm text-rose-300">{errors.email.message}</p> : null}
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300" htmlFor="mobileNumber">
                  Mobile Number
                </label>
                <input
                  id="mobileNumber"
                  className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="9876543210"
                  {...register("mobileNumber", {
                    required: "Mobile number is required",
                    minLength: { value: 10, message: "Mobile number must be at least 10 digits" },
                  })}
                />
                {errors.mobileNumber ? <p className="mt-2 text-sm text-rose-300">{errors.mobileNumber.message}</p> : null}
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300" htmlFor="department">
                  Department
                </label>
                <select
                  id="department"
                  className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20"
                  {...register("department", { required: "Department is required" })}
                >
                  <option value="">Select department</option>
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
                {errors.department ? <p className="mt-2 text-sm text-rose-300">{errors.department.message}</p> : null}
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300" htmlFor="course">
                  Course
                </label>
                <select
                  id="course"
                  className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20"
                  {...register("course", { required: "Course is required" })}
                >
                  <option value="">Select course</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
                {errors.course ? <p className="mt-2 text-sm text-rose-300">{errors.course.message}</p> : null}
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300" htmlFor="semester">
                  Semester
                </label>
                <select
                  id="semester"
                  className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20"
                  {...register("semester", {
  required: "Semester is required",
  valueAsNumber: true,
})}
                >
                  <option value="">Select semester</option>
                  {semesters.map((semester) => (
                  <option key={semester.value} value={semester.value}>
                    {semester.label}
                      </option>
                    ))}
                </select>
                {errors.semester ? <p className="mt-2 text-sm text-rose-300">{errors.semester.message}</p> : null}
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="Create a strong password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                />
                {errors.password ? <p className="mt-2 text-sm text-rose-300">{errors.password.message}</p> : null}
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="Re-enter your password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === password || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword ? <p className="mt-2 text-sm text-rose-300">{errors.confirmPassword.message}</p> : null}
              </div>

              <div className="md:col-span-2">
                <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-800/50 px-4 py-3 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-white/10 bg-slate-800 accent-cyan-500"
                    {...register("agreeToTerms", { required: "You must accept the terms and conditions" })}
                  />
                  <span>
                    I agree to the University ERP terms, privacy policy, and academic conduct guidelines.
                  </span>
                </label>
                {errors.agreeToTerms ? <p className="mt-2 text-sm text-rose-300">{errors.agreeToTerms.message}</p> : null}
              </div>

              {submitError ? <p className="md:col-span-2 text-sm text-rose-300">{submitError}</p> : null}

              <div className="md:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Link to="/login/student" className="text-sm text-slate-400 transition hover:text-white">
                  Already have an account? Sign in
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-400 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                      Creating account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
