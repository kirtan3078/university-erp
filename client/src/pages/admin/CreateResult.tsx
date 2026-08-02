import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  Save,
  Plus,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

interface Student {
  _id: string;
  fullName: string;
  enrollmentNumber: string;
  department: string;
  course: string;
  semester: number;
}

interface Subject {
  subjectName: string;
  totalMarks: number;
  marksObtained: number;
}

export default function CreateResult() {
  const navigate = useNavigate();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [selectedStudentId, setSelectedStudentId] = useState("");

  const [subjects, setSubjects] = useState<Subject[]>([
    {
      subjectName: "",
      totalMarks: 100,
      marksObtained: 0,
    },
  ]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/admin/students");

      setStudents(res.data.students || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  const selectedStudent = students.find(
    (student) => student._id === selectedStudentId
  );

  const addSubject = () => {
    setSubjects([
      ...subjects,
      {
        subjectName: "",
        totalMarks: 100,
        marksObtained: 0,
      },
    ]);
  };

  const removeSubject = (index: number) => {
    if (subjects.length === 1) {
      toast.error("At least one subject is required.");
      return;
    }

    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const handleSubjectChange = (
    index: number,
    field: keyof Subject,
    value: string
  ) => {
    const updatedSubjects = [...subjects];

    updatedSubjects[index] = {
      ...updatedSubjects[index],
      [field]:
        field === "subjectName"
          ? value
          : Number(value),
    };

    setSubjects(updatedSubjects);
  };

  const totalMarks = useMemo(() => {
    return subjects.reduce(
      (sum, subject) => sum + Number(subject.totalMarks),
      0
    );
  }, [subjects]);

  const obtainedMarks = useMemo(() => {
    return subjects.reduce(
      (sum, subject) =>
        sum + Number(subject.marksObtained),
      0
    );
  }, [subjects]);

  const percentage = useMemo(() => {
    if (totalMarks === 0) return 0;

    return Number(
      ((obtainedMarks / totalMarks) * 100).toFixed(2)
    );
  }, [obtainedMarks, totalMarks]);

  const sgpa = useMemo(() => {
    return Number((percentage / 10).toFixed(2));
  }, [percentage]);

  const status = useMemo(() => {
    const failed = subjects.some(
      (subject) =>
        Number(subject.marksObtained) <
        Number(subject.totalMarks) * 0.35
    );

    return failed ? "Fail" : "Pass";
  }, [subjects]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
        e.preventDefault();

    if (!selectedStudentId) {
      toast.error("Please select a student.");
      return;
    }

    if (
      subjects.some(
        (subject) =>
          subject.subjectName.trim() === "" ||
          subject.totalMarks <= 0 ||
          subject.marksObtained < 0 ||
          subject.marksObtained > subject.totalMarks
      )
    ) {
      toast.error("Please enter valid subject details.");
      return;
    }

    try {
      setSaving(true);

      await api.post("/api/admin/results", {
        student: selectedStudentId,
        subjects,
        sgpa,
      });

      toast.success("Result published successfully.");

      navigate("/admin/results");
    } catch (error: any) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to publish result."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2
          size={42}
          className="animate-spin text-cyan-400"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Publish Result
          </h1>

          <p className="mt-2 text-slate-400">
            Create and publish a student's semester result.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/results")}
          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white transition hover:bg-slate-700"
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* Student Details */}
        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

          <h2 className="mb-6 text-2xl font-semibold text-white">
            Student Details
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Student
              </label>

              <select
                value={selectedStudentId}
                onChange={(e) =>
                  setSelectedStudentId(e.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                required
              >
                <option value="">
                  Select Student
                </option>

                {students.map((student) => (
                  <option
                    key={student._id}
                    value={student._id}
                  >
                    {student.fullName} (
                    {student.enrollmentNumber})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Enrollment Number
              </label>

              <input
                readOnly
                value={
                  selectedStudent?.enrollmentNumber || ""
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-300"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Department
              </label>

              <input
                readOnly
                value={
                  selectedStudent?.department || ""
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-300"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Course
              </label>

              <input
                readOnly
                value={
                  selectedStudent?.course || ""
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-300"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Semester
              </label>

              <input
                readOnly
                value={
                  selectedStudent?.semester || ""
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-300"
              />
            </div>

          </div>

        </div>

        {/* Subjects */}
        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-2xl font-semibold text-white">
              Subjects
            </h2>

            <button
              type="button"
              onClick={addSubject}
              className="flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-white transition hover:bg-cyan-500"
            >
              <Plus size={18} />
              Add Subject
            </button>

          </div>
                    <div className="overflow-x-auto">

            <table className="min-w-full border-collapse">

              <thead>

                <tr className="border-b border-slate-700 text-left text-slate-300">

                  <th className="px-4 py-3">Subject Name</th>
                  <th className="px-4 py-3">Total Marks</th>
                  <th className="px-4 py-3">Marks Obtained</th>
                  <th className="px-4 py-3 text-center">Action</th>

                </tr>

              </thead>

              <tbody>

                {subjects.map((subject, index) => (

                  <tr
                    key={index}
                    className="border-b border-slate-800"
                  >

                    <td className="p-3">

                      <input
                        type="text"
                        value={subject.subjectName}
                        onChange={(e) =>
                          handleSubjectChange(
                            index,
                            "subjectName",
                            e.target.value
                          )
                        }
                        placeholder="Subject Name"
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                      />

                    </td>

                    <td className="p-3">

                      <input
                        type="number"
                        value={subject.totalMarks}
                        onChange={(e) =>
                          handleSubjectChange(
                            index,
                            "totalMarks",
                            e.target.value
                          )
                        }
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                      />

                    </td>

                    <td className="p-3">

                      <input
                        type="number"
                        value={subject.marksObtained}
                        onChange={(e) =>
                          handleSubjectChange(
                            index,
                            "marksObtained",
                            e.target.value
                          )
                        }
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                      />

                    </td>

                    <td className="p-3 text-center">

                      <button
                        type="button"
                        onClick={() => removeSubject(index)}
                        className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-500"
                      >
                        <Trash2 size={18} />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* Summary */}

        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

          <h2 className="mb-6 text-2xl font-semibold text-white">
            Result Summary
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">

            <div className="rounded-xl bg-slate-800 p-5">

              <p className="text-sm text-slate-400">
                Total Marks
              </p>

              <h3 className="mt-2 text-3xl font-bold text-white">
                {totalMarks}
              </h3>

            </div>

            <div className="rounded-xl bg-slate-800 p-5">

              <p className="text-sm text-slate-400">
                Obtained Marks
              </p>

              <h3 className="mt-2 text-3xl font-bold text-white">
                {obtainedMarks}
              </h3>

            </div>

            <div className="rounded-xl bg-slate-800 p-5">

              <p className="text-sm text-slate-400">
                Percentage
              </p>

              <h3 className="mt-2 text-3xl font-bold text-cyan-400">
                {percentage}%
              </h3>

            </div>

            <div className="rounded-xl bg-slate-800 p-5">

              <p className="text-sm text-slate-400">
                SGPA
              </p>

              <h3 className="mt-2 text-3xl font-bold text-yellow-400">
                {sgpa}
              </h3>

            </div>

            <div className="rounded-xl bg-slate-800 p-5">

              <p className="text-sm text-slate-400">
                Status
              </p>

              <h3
                className={`mt-2 text-3xl font-bold ${
                  status === "Pass"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {status}
              </h3>

            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4">

          <button
            type="button"
            onClick={() => navigate("/admin/results")}
            className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 font-medium text-white transition hover:bg-slate-700"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition hover:from-cyan-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Publishing...
              </>
            ) : (
              <>
                <Save size={18} />
                Publish Result
              </>
            )}
          </button>

        </div>

      </form>

    </div>
  );
}