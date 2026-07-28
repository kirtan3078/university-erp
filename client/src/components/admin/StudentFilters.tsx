import React from 'react';
import { Search } from 'lucide-react';
import type { Department, Semester } from '../../data/academicData';

export default function StudentFilters({
  search,
  setSearch,
  departmentFilter,
  setDepartmentFilter,
  semesterFilter,
  setSemesterFilter,
  departments,
  semesters,
}: {
  search: string;
  setSearch: (s: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (s: string) => void;
  semesterFilter: string;
  setSemesterFilter: (s: string) => void;
  departments: Department[];
  semesters: Semester[];
}) {
  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl">

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

        <div className="relative">

          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

          <input
            type="text"
            placeholder="Search by name, enrollment or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-white placeholder:text-slate-500 transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          />

        </div>

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
        >
          <option value="">All Departments</option>
          {departments.map((department) => (
            <option key={department.code} value={department.name}>
              {department.code} - {department.name}
            </option>
          ))}
        </select>

        <select
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
        >
          <option value="">All Semesters</option>
          {semesters.map((semester) => (
            <option key={semester.value} value={semester.value}>
              {semester.label}
            </option>
          ))}
        </select>

      </div>

    </div>
  );
}
