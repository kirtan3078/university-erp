import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";

import api from "../../services/api";
import {
  departments,
  semesters,
} from "../../data/academicData";

export default function CreateStudent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    enrollmentNumber: "",
    mobileNumber: "",
    department: "",
    course: "",
    semester: 1,
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const selectedDepartment = departments.find(
    (dept) => dept.name === formData.department
  );

  const availableCourses =
    selectedDepartment?.courses ?? [];

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      course: "",
    }));
  }, [formData.department]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "semester"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const token =
        localStorage.getItem("authToken");

      await api.post(
        "/api/admin/students",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Student created successfully!"
      );

      navigate("/admin/students");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Unable to create student."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl animate-in fade-in duration-500">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold tracking-tight text-white">
            Add New Student
          </h1>

          <p className="mt-2 text-slate-400">
            Register a new student into the
            University ERP system.
          </p>

        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/admin/students")
          }
          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-slate-300 transition-all duration-300 hover:border-cyan-500 hover:bg-slate-800 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/80 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/40 hover:shadow-cyan-500/10">

        <div className="border-b border-slate-700/60 bg-gradient-to-r from-cyan-500/10 via-slate-900 to-blue-600/10 px-8 py-6">

          <h2 className="text-2xl font-semibold text-white">
            Student Information
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Fill in all required details to
            create a new student account.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2"
        >
                    {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="student@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          {/* Enrollment Number */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Enrollment Number
            </label>

            <input
              type="text"
              name="enrollmentNumber"
              placeholder="Enter enrollment number"
              value={formData.enrollmentNumber}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Mobile Number
            </label>

            <input
              type="text"
              name="mobileNumber"
              placeholder="Enter mobile number"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          {/* Department */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Department
            </label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            >
              <option value="">Select Department</option>

              {departments.map((department) => (
                <option
                  key={department.code}
                  value={department.name}
                >
                  {department.code} - {department.name}
                </option>
              ))}
            </select>
          </div>

          {/* Course */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Course
            </label>

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              disabled={!selectedDepartment}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">
                {selectedDepartment
                  ? "Select Course"
                  : "Select Department First"}
              </option>

              {availableCourses.map((course) => (
                <option
                  key={course.code}
                  value={course.name}
                >
                  {course.code} - {course.name}
                </option>
              ))}
            </select>
          </div>
                    {/* Semester */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Semester
            </label>

            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            >
              {semesters.map((semester) => (
                <option
                  key={semester.value}
                  value={semester.value}
                >
                  {semester.label}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 pr-14 text-white placeholder:text-slate-500 transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300 hover:text-cyan-400"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>
          </div>

          {/* Divider */}
          <div className="md:col-span-2 pt-2">
            <div className="border-t border-slate-700/60"></div>
          </div>

          {/* Footer Text */}
          <div className="md:col-span-2">
            <p className="text-sm text-slate-400">
              After creating the student account,
              the student can log in using their
              Enrollment Number and Password.
            </p>
          </div>
                    {/* Action Buttons */}
          <div className="md:col-span-2 flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() => navigate("/admin/students")}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 font-medium text-slate-300 transition-all duration-300 hover:border-red-500 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <ArrowLeft size={18} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Create Student
                </>
              )}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}