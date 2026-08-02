    import { useEffect, useMemo, useState } from "react";

import {
  departments,
  semesters,
} from "../../data/academicData";

export interface NoticeFormData {
  title: string;

  category: string;

  description: string;

  content: string;

  audience: string;

  department: string;

  course: string;

  semester: number | "";

  priority: string;

  publishDate: string;

  expiryDate: string;

  status: string;

  isPinned: boolean;

  isActive: boolean;
}

interface NoticeFormProps {
  initialValues?: NoticeFormData;

  loading?: boolean;

  submitLabel?: string;

  onSubmit: (
    values: NoticeFormData
  ) => void | Promise<void>;
}

const defaultValues: NoticeFormData = {
  title: "",

  category: "General",

  description: "",

  content: "",

  audience: "Everyone",

  department: "",

  course: "",

  semester: "",

  priority: "Medium",

  publishDate: new Date()
    .toISOString()
    .split("T")[0],

  expiryDate: "",

  status: "Draft",

  isPinned: false,

  isActive: true,
};

export default function NoticeForm({
  initialValues,
  loading = false,
  submitLabel = "Save Notice",
  onSubmit,
}: NoticeFormProps) {
  const [form, setForm] =
    useState<NoticeFormData>(
      initialValues || defaultValues
    );

  useEffect(() => {
    if (initialValues) {
      setForm(initialValues);
    }
  }, [initialValues]);

  const selectedDepartment =
    useMemo(
      () =>
        departments.find(
          (d) =>
            d.name ===
            form.department
        ),
      [form.department]
    );

  const availableCourses =
    selectedDepartment?.courses ?? [];

  console.log("FORM", form);
console.log("AVAILABLE COURSES", availableCourses);
console.log("SEMESTER TYPE", typeof form.semester, form.semester);
      // =====================================
  // Handle Input Change
  // =====================================
const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement |
    HTMLSelectElement |
    HTMLTextAreaElement
  >
) => {
  const { name, value, type } = e.target;

  if (type === "checkbox") {
    const checked = (e.target as HTMLInputElement).checked;

    setForm((prev) => ({
      ...prev,
      [name]: checked,
    }));

    return;
  }

  if (name === "department") {
    setForm((prev) => ({
      ...prev,
      department: value,
      course: "",
      semester: "",
    }));
    return;
  }

  if (name === "course") {
    setForm((prev) => ({
      ...prev,
      course: value,
      semester: "",
    }));
    return;
  }

  setForm((prev) => ({
    ...prev,
    [name]:
      name === "semester"
        ? value === ""
          ? ""
          : Number(value)
        : value,
  }));
};

  // =====================================
  // Reset Course & Semester
  // =====================================

  // =====================================
  // Validation
  // =====================================

  const validate = () => {
    if (!form.title.trim()) {
      alert("Notice title is required.");
      return false;
    }

    if (!form.description.trim()) {
      alert("Description is required.");
      return false;
    }

    if (!form.content.trim()) {
      alert("Notice content is required.");
      return false;
    }

    if (
      form.audience ===
        "Department" &&
      !form.department
    ) {
      alert(
        "Please select a department."
      );
      return false;
    }

    if (
      form.audience ===
        "Course" &&
      (!form.department ||
        !form.course)
    ) {
      alert(
        "Please select department and course."
      );
      return false;
    }

    if (
      form.audience ===
        "Semester" &&
      (!form.department ||
        !form.course ||
        form.semester === "")
    ) {
      alert(
        "Please select department, course and semester."
      );
      return false;
    }

    if (
      form.expiryDate &&
      form.expiryDate <
        form.publishDate
    ) {
      alert(
        "Expiry date cannot be before publish date."
      );
      return false;
    }

    return true;
  };

  // =====================================
  // Submit
  // =====================================

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(form);
  };
    // =====================================
  // UI
  // =====================================
  console.log("FORM STATE:", form);
console.log("SEMESTER:", form.semester, typeof form.semester);
console.log("COURSE:", form.course);
console.log("DEPARTMENT:", form.department);
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* ============================= */}
      {/* Basic Information */}
      {/* ============================= */}

      <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Notice Title */}

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Notice Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter notice title"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 transition focus:border-cyan-500 focus:outline-none"
            />

          </div>

          {/* Category */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 transition focus:border-cyan-500 focus:outline-none"
            >
              <option value="Academic">
                Academic
              </option>

              <option value="Exam">
                Exam
              </option>

              <option value="Fee">
                Fee
              </option>

              <option value="Holiday">
                Holiday
              </option>

              <option value="Event">
                Event
              </option>

              <option value="Placement">
                Placement
              </option>

              <option value="Scholarship">
                Scholarship
              </option>

              <option value="Sports">
                Sports
              </option>

              <option value="Library">
                Library
              </option>

              <option value="Hostel">
                Hostel
              </option>

              <option value="General">
                General
              </option>
            </select>

          </div>

          {/* Priority */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Priority
            </label>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 transition focus:border-cyan-500 focus:outline-none"
            >
              <option value="Low">
                Low
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="High">
                High
              </option>

              <option value="Urgent">
                Urgent
              </option>
            </select>

          </div>

          {/* Description */}

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Short Description
            </label>

            <textarea
              rows={3}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Short description shown in notice list"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 transition focus:border-cyan-500 focus:outline-none"
            />

          </div>

          {/* Notice Content */}

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Notice Content
            </label>

            <textarea
              rows={10}
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write the complete notice here..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 transition focus:border-cyan-500 focus:outline-none"
            />

          </div>

        </div>

      </div>
            {/* ============================= */}
      {/* Audience */}
      {/* ============================= */}

      <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Audience
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Audience */}

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Audience
            </label>

            <select
              name="audience"
              value={form.audience}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 transition focus:border-cyan-500 focus:outline-none"
            >
              <option value="Everyone">
                Everyone
              </option>

              <option value="Students">
                Students
              </option>

              <option value="Faculty">
                Faculty
              </option>

              <option value="Department">
                Department
              </option>

              <option value="Course">
                Course
              </option>

              <option value="Semester">
                Semester
              </option>

            </select>

          </div>

          {/* Department */}

          {(form.audience === "Department" ||
            form.audience === "Course" ||
            form.audience === "Semester") && (

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Department
              </label>

              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 transition focus:border-cyan-500 focus:outline-none"
              >

                <option value="">
                  Select Department
                </option>

                {departments.map((dept) => (

                  <option
                    key={dept.code}
                    value={dept.name}
                  >
                    {dept.name}
                  </option>

                ))}

              </select>

            </div>

          )}

          {/* Course */}

          {(form.audience === "Course" ||
            form.audience === "Semester") && (

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Course
              </label>

              <select
                name="course"
                value={form.course}
                onChange={handleChange}
                disabled={!form.department}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 transition focus:border-cyan-500 focus:outline-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed"
              >

                <option value="">
                  Select Course
                </option>

                {availableCourses.map((course) => (

                  <option
                    key={course.code}
                    value={course.name}
                  >
                    {course.name}
                  </option>

                ))}

              </select>

            </div>

          )}

          {/* Semester */}

          {form.audience === "Semester" && (

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Semester
              </label>

              <select
                name="semester"
                value={form.semester}
                onChange={handleChange}
                disabled={!form.course}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 transition focus:border-cyan-500 focus:outline-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed"
              >

                <option value="">
                  Select Semester
                </option>

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

          )}

        </div>

      </div>
            {/* ============================= */}
      {/* Publish Settings */}
      {/* ============================= */}

      <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Publish Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Publish Date */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Publish Date
            </label>

            <input
              type="date"
              name="publishDate"
              value={form.publishDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white [color-scheme:dark] focus:border-cyan-500 focus:outline-none"
            />

          </div>

          {/* Expiry Date */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Expiry Date
            </label>

            <input
              type="date"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
             className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white [color-scheme:dark] focus:border-cyan-500 focus:outline-none"
            />

          </div>

          {/* Status */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white [color-scheme:dark] focus:border-cyan-500 focus:outline-none"
            >
              <option value="Draft">
                Draft
              </option>

              <option value="Published">
                Published
              </option>

              <option value="Archived">
                Archived
              </option>

            </select>

          </div>

          {/* Notice Options */}

          <div className="space-y-4">

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                name="isPinned"
                checked={form.isPinned}
                onChange={handleChange}
                className="h-5 w-5 accent-cyan-500"
              />

              <span className="font-medium text-slate-300">
                Pin this notice
              </span>

            </label>

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="h-5 w-5 accent-cyan-500"
              />

              <span className="font-medium text-slate-300">
                Active Notice
              </span>

            </label>

          </div>

        </div>

      </div>
            {/* ============================= */}
      {/* Attachment */}
      {/* ============================= */}

      <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Attachment
        </h2>

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Upload Attachment
          </label>

          <input
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            disabled
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 transition focus:border-cyan-500 focus:outline-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed"
          />

          <p className="text-sm text-slate-400 mt-2">
            Attachment upload will be enabled in the next update.
          </p>

        </div>

      </div>

      {/* ============================= */}
      {/* Submit */}
      {/* ============================= */}

      <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl">

        <div className="flex justify-end gap-4">

          <button
            type="reset"
            onClick={() =>
              setForm(defaultValues)
            }
            className="px-6 py-3 rounded-xl border border-slate-700 bg-slate-800 text-white transition hover:bg-slate-700"
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg hover:from-cyan-400 hover:to-blue-500  text-white transition disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : submitLabel}
          </button>

        </div>

      </div>

    </form>
  );
}