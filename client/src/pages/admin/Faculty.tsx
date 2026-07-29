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
import { departments } from "../../data/academicData";

interface Faculty {
  _id: string;
  fullName: string;
  employeeId: string;
  email: string;
  department: string;
  mobileNumber: string;
  profileImage: string;
  isActivated: boolean;
}

export default function Faculty() {
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState("");

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [selectedFaculty, setSelectedFaculty] =
    useState<Faculty | null>(null);

  const fetchFaculties = async () => {
    try {
      const res = await api.get("/api/admin/faculties", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFaculties(res.data.faculties);
    } catch (err: any) {
      console.error(err);

      toast.error(
        err.response?.data?.message ??
          "Unable to fetch faculties."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  const filteredFaculties = useMemo(() => {
    return faculties.filter((faculty) => {
      const matchesSearch =
        faculty.fullName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        faculty.employeeId
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        faculty.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesDepartment =
        departmentFilter === "" ||
        faculty.department === departmentFilter;

      return (
        matchesSearch &&
        matchesDepartment
      );
    });
  }, [
    faculties,
    search,
    departmentFilter,
  ]);

  const totalFaculties = faculties.length;

  const activeFaculties = faculties.filter(
    (faculty) => faculty.isActivated
  ).length;

  const pendingFaculties = faculties.filter(
    (faculty) => !faculty.isActivated
  ).length;

  const handleDelete = async () => {
    if (!selectedFaculty) return;

    try {
      await api.delete(
        `/api/admin/faculties/${selectedFaculty._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFaculties((prev) =>
        prev.filter(
          (faculty) =>
            faculty._id !== selectedFaculty._id
        )
      );

      toast.success(
        "Faculty deleted successfully."
      );

      setDeleteModal(false);
      setSelectedFaculty(null);
    } catch (err: any) {
      console.error(err);

      toast.error(
        err.response?.data?.message ??
          "Unable to delete faculty."
      );
    }
  };

  return (
        <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Faculty Management
          </h1>

          <p className="mt-2 text-slate-400">
            View, search and manage all registered faculty members.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/faculties/create")}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/30"
        >
          <Plus size={18} />
          Add Faculty
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Total Faculty
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                {totalFaculties}
              </h2>
            </div>

            <div className="rounded-xl bg-cyan-500/10 p-4">
              <Users
                size={28}
                className="text-cyan-400"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Active Faculty
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                {activeFaculties}
              </h2>
            </div>

            <div className="rounded-xl bg-green-500/10 p-4">
              <UserCheck
                size={28}
                className="text-green-400"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Pending Faculty
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                {pendingFaculties}
              </h2>
            </div>

            <div className="rounded-xl bg-yellow-500/10 p-4">
              <UserX
                size={28}
                className="text-yellow-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="Search by name, employee ID or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-white placeholder:text-slate-500 transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) =>
              setDepartmentFilter(e.target.value)
            }
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          >
            <option value="">
              All Departments
            </option>

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
      </div>
            {/* Faculty Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/80 shadow-xl backdrop-blur-xl">
        {loading ? (
          <div className="flex h-72 items-center justify-center">
            <Loader2
              size={42}
              className="animate-spin text-cyan-400"
            />
          </div>
        ) : filteredFaculties.length === 0 ? (
          <div className="flex h-72 flex-col items-center justify-center">
            <Users
              size={52}
              className="mb-4 text-slate-600"
            />

            <h3 className="text-xl font-semibold text-white">
              No Faculty Found
            </h3>

            <p className="mt-2 text-slate-400">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-slate-700 bg-slate-800/80">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Faculty
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Employee ID
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Department
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Mobile
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredFaculties.map((faculty) => (
                  <tr
                    key={faculty._id}
                    className="border-b border-slate-800 transition-all duration-300 hover:bg-slate-800/60"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        {faculty.profileImage ? (
                          <img
                            src={faculty.profileImage}
                            alt={faculty.fullName}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20 text-lg font-bold text-cyan-400">
                            {faculty.fullName.charAt(0).toUpperCase()}
                          </div>
                        )}

                        <div>
                          <p className="font-semibold text-white">
                            {faculty.fullName}
                          </p>

                          <p className="mt-1 text-sm text-slate-400">
                            {faculty.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      {faculty.employeeId}
                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      {faculty.department}
                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      {faculty.mobileNumber}
                    </td>

                    <td className="px-6 py-5 text-center">
                      {faculty.isActivated ? (
                        <span className="rounded-full bg-green-500/15 px-3 py-1 text-sm font-medium text-green-400">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-sm font-medium text-yellow-400">
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() =>
                            navigate(
                              `/admin/faculties/edit/${faculty._id}`
                            )
                          }
                          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-500"
                        >
                          <Pencil size={16} />
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            setSelectedFaculty(faculty);
                            setDeleteModal(true);
                          }}
                          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-red-500"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
            {/* Delete Confirmation Modal */}
      {deleteModal && selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">
            <div className="flex justify-center">
              <div className="rounded-full bg-red-500/15 p-4">
                <Trash2
                  size={36}
                  className="text-red-400"
                />
              </div>
            </div>

            <h2 className="mt-6 text-center text-2xl font-bold text-white">
              Delete Faculty
            </h2>

            <p className="mt-3 text-center text-slate-400">
              Are you sure you want to delete
              <span className="font-semibold text-white">
                {" "}
                {selectedFaculty.fullName}
              </span>
              ?
            </p>

            <p className="mt-2 text-center text-sm text-red-400">
              This action cannot be undone.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => {
                  setDeleteModal(false);
                  setSelectedFaculty(null);
                }}
                className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 font-medium text-slate-300 transition-all duration-300 hover:border-slate-500 hover:bg-slate-700 hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}