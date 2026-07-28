import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  Plus,
  Search,
  Pencil,
  Trash2,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";
import toast from "react-hot-toast";

import api from "../../services/api";
import { departments, semesters } from "../../data/academicData";
import StudentFilters from "../../components/admin/StudentFilters";
import StudentTable from "../../components/admin/StudentTable";
import StudentModal from "../../components/admin/StudentModal";

interface Student {
  _id: string;
  fullName: string;
  enrollmentNumber: string;
  email: string;
  department: string;
  course: string;
  semester: number;
  mobileNumber: string;
  isActivated: boolean;
}

export default function Students() {
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/api/admin/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data.students);
    } catch (err: any) {
      console.error(err);

      toast.error(
        err.response?.data?.message ??
          "Unable to fetch students."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.fullName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        student.enrollmentNumber
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        student.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesDepartment =
        departmentFilter === "" ||
        student.department === departmentFilter;

      const matchesSemester =
        semesterFilter === "" ||
        student.semester === Number(semesterFilter);

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesSemester
      );
    });
  }, [
    students,
    search,
    departmentFilter,
    semesterFilter,
  ]);

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.isActivated
  ).length;

  const pendingStudents = students.filter(
    (student) => !student.isActivated
  ).length;

  const handleDelete = async () => {
    if (!selectedStudent) return;

    try {
      await api.delete(
        `/api/admin/students/${selectedStudent._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents((prev) =>
        prev.filter((student) => student._id !== selectedStudent._id)
      );

      toast.success("Student deleted successfully.");

      setDeleteModal(false);
      setSelectedStudent(null);
    } catch (err: any) {
      console.error(err);

      toast.error(
        err.response?.data?.message ??
          "Unable to delete student."
      );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Student Management</h1>

          <p className="mt-2 text-slate-400">View, search and manage all registered students.</p>
        </div>

        <button
          onClick={() => navigate("/admin/students/create")}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/30"
        >
          <Plus size={18} />
          Add Student
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Students</p>

              <h2 className="mt-2 text-3xl font-bold text-white">{totalStudents}</h2>
            </div>

            <div className="rounded-xl bg-cyan-500/10 p-4">
              <Users size={28} className="text-cyan-400" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Active Students</p>

              <h2 className="mt-2 text-3xl font-bold text-white">{activeStudents}</h2>
            </div>

            <div className="rounded-xl bg-green-500/10 p-4">
              <UserCheck size={28} className="text-green-400" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Pending Students</p>

              <h2 className="mt-2 text-3xl font-bold text-white">{pendingStudents}</h2>
            </div>

            <div className="rounded-xl bg-yellow-500/10 p-4">
              <UserX size={28} className="text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters (moved to component) */}
      <StudentFilters
        search={search}
        setSearch={setSearch}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        semesterFilter={semesterFilter}
        setSemesterFilter={setSemesterFilter}
        departments={departments}
        semesters={semesters}
      />

      {/* Students Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/80 shadow-xl backdrop-blur-xl">
        <StudentTable
          loading={loading}
          students={filteredStudents}
          onEdit={(id) => navigate(`/admin/students/edit/${id}`)}
          onRequestDelete={(student) => {
            setSelectedStudent(student);
            setDeleteModal(true);
          }}
        />
      </div>

      <StudentModal
        open={deleteModal && selectedStudent != null}
        student={selectedStudent}
        onCancel={() => {
          setDeleteModal(false);
          setSelectedStudent(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
