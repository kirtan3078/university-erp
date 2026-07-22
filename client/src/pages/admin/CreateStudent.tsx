import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "semester"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");

      await api.post("/api/admin/students", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Student created successfully.");

      navigate("/admin/students");
    } catch (err: any) {
      alert(err.response?.data?.message || "Unable to create student.");
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-8 text-3xl font-bold text-white">
        Add New Student
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl bg-slate-900 p-8"
      >
        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full rounded-lg p-3"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full rounded-lg p-3"
        />

        <input
          name="enrollmentNumber"
          placeholder="Enrollment Number"
          onChange={handleChange}
          className="w-full rounded-lg p-3"
        />

        <input
          name="mobileNumber"
          placeholder="Mobile Number"
          onChange={handleChange}
          className="w-full rounded-lg p-3"
        />

        <input
          name="department"
          placeholder="Department"
          onChange={handleChange}
          className="w-full rounded-lg p-3"
        />

        <input
          name="course"
          placeholder="Course"
          onChange={handleChange}
          className="w-full rounded-lg p-3"
        />

        <select
          name="semester"
          onChange={handleChange}
          className="w-full rounded-lg p-3"
          value={formData.semester}
        >
          {[1,2,3,4,5,6,7,8].map((sem) => (
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}
        </select>

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full rounded-lg p-3"
        />

        <button className="rounded-lg bg-cyan-500 px-6 py-3 font-bold text-black">
          Create Student
        </button>
      </form>
    </div>
  );
}