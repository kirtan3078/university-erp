import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  CreditCard,
  Wallet,
  CircleDollarSign,
  Clock3,
} from "lucide-react";

import toast from "react-hot-toast";
import api from "../../services/api";
import { departments } from "../../data/academicData";

interface Fee {
  _id: string;

  studentName: string;
  enrollmentNumber: string;

  department: string;

  course: string;

  semester: number;

  totalFee: number;

  paidAmount: number;

  dueAmount: number;

  status: string;
}

export default function Fees() {
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const [fees, setFees] = useState<Fee[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [departmentFilter, setDepartmentFilter] =
    useState("");

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [selectedFee, setSelectedFee] =
    useState<Fee | null>(null);

  const fetchFees = async () => {
    try {
      const res = await api.get(
        "/api/admin/fees",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFees(res.data.fees);

    } catch (err: any) {

      console.error(err);

      toast.error(
        err.response?.data?.message ??
          "Unable to fetch fees."
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const filteredFees = useMemo(() => {

    return fees.filter((fee) => {

      const matchesSearch =
        fee.studentName
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        fee.enrollmentNumber
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesDepartment =
        departmentFilter === "" ||
        fee.department === departmentFilter;

      return (
        matchesSearch &&
        matchesDepartment
      );

    });

  }, [
    fees,
    search,
    departmentFilter,
  ]);

  const totalFees = fees.length;

  const paidStudents = fees.filter(
    (f) => f.status === "Paid"
  ).length;

  const pendingStudents = fees.filter(
    (f) => f.status !== "Paid"
  ).length;

  const totalCollection = fees.reduce(
    (sum, f) => sum + f.paidAmount,
    0
  );
    return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Fee Management
          </h1>

          <p className="mt-2 text-slate-400">
            Manage student fee records, payments and dues.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/fees/create")}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/30"
        >
          <Plus size={18} />
          Create Fee
        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-400">
                Total Records
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                {totalFees}
              </h2>

            </div>

            <div className="rounded-xl bg-cyan-500/10 p-4">
              <CreditCard
                size={28}
                className="text-cyan-400"
              />
            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-400">
                Paid Students
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-400">
                {paidStudents}
              </h2>

            </div>

            <div className="rounded-xl bg-green-500/10 p-4">
              <Wallet
                size={28}
                className="text-green-400"
              />
            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-400">
                Pending
              </p>

              <h2 className="mt-2 text-3xl font-bold text-yellow-400">
                {pendingStudents}
              </h2>

            </div>

            <div className="rounded-xl bg-yellow-500/10 p-4">
              <Clock3
                size={28}
                className="text-yellow-400"
              />
            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-400">
                Collection
              </p>

              <h2 className="mt-2 text-3xl font-bold text-cyan-400">
                ₹{totalCollection.toLocaleString()}
              </h2>

            </div>

            <div className="rounded-xl bg-cyan-500/10 p-4">
              <CircleDollarSign
                size={28}
                className="text-cyan-400"
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
              placeholder="Search by student name or enrollment number..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-white placeholder:text-slate-500 transition focus:border-cyan-500 focus:outline-none"
            />

          </div>

          {/* Department */}

          <select
            value={departmentFilter}
            onChange={(e) =>
              setDepartmentFilter(
                e.target.value
              )
            }
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white transition focus:border-cyan-500 focus:outline-none"
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
            {/* Fee Table */}

      <div className="overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/80 shadow-xl backdrop-blur-xl">

        {loading ? (

          <div className="flex h-72 items-center justify-center">
            <Loader2
              size={42}
              className="animate-spin text-cyan-400"
            />
          </div>

        ) : filteredFees.length === 0 ? (

          <div className="flex h-72 flex-col items-center justify-center">

            <CreditCard
              size={52}
              className="mb-4 text-slate-600"
            />

            <h3 className="text-xl font-semibold text-white">
              No Fee Records Found
            </h3>

            <p className="mt-2 text-slate-400">
              Create a fee record to get started.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="border-b border-slate-700 bg-slate-800/80">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Student
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Department
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Semester
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Total
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Paid
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Due
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

                {filteredFees.map((fee) => (

                  <tr
                    key={fee._id}
                    className="border-b border-slate-800 transition hover:bg-slate-800/60"
                  >

                    <td className="px-6 py-5">

                      <div>

                        <p className="font-semibold text-white">
                          {fee.studentName}
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          {fee.enrollmentNumber}
                        </p>

                      </div>

                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      {fee.department}
                    </td>

                    <td className="px-6 py-5 text-center text-slate-300">
                      {fee.semester}
                    </td>

                    <td className="px-6 py-5 text-center font-semibold text-white">
                      ₹{fee.totalFee}
                    </td>

                    <td className="px-6 py-5 text-center text-green-400 font-semibold">
                      ₹{fee.paidAmount}
                    </td>

                    <td className="px-6 py-5 text-center text-red-400 font-semibold">
                      ₹{fee.dueAmount}
                    </td>

                    <td className="px-6 py-5 text-center">

                      {fee.status === "Paid" ? (

                        <span className="rounded-full bg-green-500/15 px-3 py-1 text-sm font-medium text-green-400">
                          Paid
                        </span>

                      ) : fee.status === "Partially Paid" ? (

                        <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-sm font-medium text-yellow-400">
                          Partial
                        </span>

                      ) : (

                        <span className="rounded-full bg-red-500/15 px-3 py-1 text-sm font-medium text-red-400">
                          Pending
                        </span>

                      )}

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() =>
                            navigate(`/admin/fees/view/${fee._id}`)
                          }
                          className="rounded-lg bg-cyan-600 p-2 text-white transition hover:bg-cyan-500"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/admin/fees/edit/${fee._id}`)
                          }
                          className="rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-500"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedFee(fee);
                            setDeleteModal(true);
                          }}
                          className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-500"
                          title="Delete"
                        >
                          <Trash2 size={18} />
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

      {/* Delete Modal */}

      {deleteModal && selectedFee && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

            <h2 className="text-center text-2xl font-bold text-white">
              Delete Fee Record
            </h2>

            <p className="mt-4 text-center text-slate-400">

              Delete fee record of

              <span className="font-semibold text-white">
                {" "}
                {selectedFee.studentName}
              </span>

              ?

            </p>

            <div className="mt-8 flex gap-4">

              <button
                onClick={() => {
                  setDeleteModal(false);
                  setSelectedFee(null);
                }}
                className="flex-1 rounded-xl border border-slate-700 bg-slate-800 py-3 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>

              <button
                onClick={async () => {

                  try {

                    await api.delete(
                      `/api/admin/fees/${selectedFee._id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );

                    setFees((prev) =>
                      prev.filter(
                        (f) =>
                          f._id !== selectedFee._id
                      )
                    );

                    toast.success(
                      "Fee record deleted successfully."
                    );

                    setDeleteModal(false);
                    setSelectedFee(null);

                  } catch (err: any) {

                    toast.error(
                      err.response?.data?.message ??
                        "Unable to delete fee."
                    );

                  }

                }}
                className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-500"
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