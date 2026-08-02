import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import StudentLogin from "../pages/public/StudentLogin";
import StudentRegister from "../pages/public/StudentRegister";
import LoginSelection from "../pages/public/LoginSelection";
import Admissions from "../pages/public/Admissions";
import AuthPlaceholder from "../pages/public/AuthPlaceholder";

import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Students from "../pages/admin/Students";
import CreateStudent from "../pages/admin/CreateStudent";
import EditStudent from "../pages/admin/EditStudent";
import ViewStudent from "../pages/admin/ViewStudent";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/student/Dashboard";
import Attendance from "../pages/student/Attendance";
import StudentResults from "../pages/student/Results";
import StudentFees from "../pages/student/Fees";
import Timetable from "../pages/student/Timetable";
import Profile from "../pages/student/Profile";
import Settings from "../pages/student/Settings";

import Faculty from "../pages/admin/Faculty";
import AddFaculty from "../pages/admin/AddFaculty";
import EditFaculty from "../pages/admin/EditFaculty";
import ViewFaculty from "../pages/admin/ViewFaculty";

import AdminAttendance from "../pages/admin/Attendance";
import CreateAttendance from "../pages/admin/CreateAttendance";
import EditAttendance from "../pages/admin/EditAttendance"; 

import AdminResults from "../pages/admin/Results";
import ViewResult from "../pages/admin/ViewResult";
import CreateResult from "../pages/admin/CreateResult";
import EditResult from "../pages/admin/EditResult";

import AdminFees from "../pages/admin/Fees";
import CreateFee from "../pages/admin/CreateFee";
import EditFee from "../pages/admin/EditFee";
import ViewFee from "../pages/admin/ViewFee";

import FeeTemplates from "../pages/admin/FeeTemplates";
import CreateFeeTemplate from "../pages/admin/CreateFeeTemplate";
import ViewFeeTemplate from "../pages/admin/ViewFeeTemplate";
import EditFeeTemplate from "../pages/admin/EditFeeTemplate";

import Notices from "../pages/admin/Notices";
import CreateNotice from "../pages/admin/CreateNotice";
import EditNotice from "../pages/admin/EditNotice";
import ViewNotice from "../pages/admin/ViewNotice";

import ProtectedRoute from "../components/auth/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========================= */}
        {/* Public Routes */}
        {/* ========================= */}


        <Route path="/" element={<Home />} />

        <Route
          path="/about"
          element={
            <AuthPlaceholder
              title="About"
              subtitle="A premium institutional overview experience."
            />
          }
        />

        <Route path="/admissions" element={<Admissions />} />

        <Route
          path="/courses"
          element={
            <AuthPlaceholder
              title="Courses"
              subtitle="Explore programs and academic offerings."
            />
          }
        />

        <Route
          path="/notices"
          element={
            <AuthPlaceholder
              title="Notices"
              subtitle="Stay updated with institutional announcements."
            />
          }
        />

        <Route
          path="/contact"
          element={
            <AuthPlaceholder
              title="Contact"
              subtitle="Reach out for academic support and institutional assistance."
            />
          }
        />

        <Route path="/login" element={<LoginSelection />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />

        <Route
          path="/login/faculty"
          element={
            <AuthPlaceholder
              title="Faculty Login"
              subtitle="Faculty access for attendance, marks and timetable workflows."
            />
          }
        />

        <Route
          path="/login/forgot-password"
          element={
            <AuthPlaceholder
              title="Forgot Password"
              subtitle="Recover your portal access securely."
            />
          }
        />

        <Route path="/register" element={<StudentRegister />} />
        <Route path="/register/student" element={<StudentRegister />} />

        {/* ========================= */}
        {/* Student Routes */}
        {/* ========================= */}

        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/student/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="results" element={<StudentResults />} />
            <Route path="fees" element={<StudentFees />} />
            <Route path="settings" element={<Settings />} />

            <Route
              path="courses"
              element={
                <AuthPlaceholder
                  title="Courses"
                  subtitle="Semester subjects and course materials."
                />
              }
            />

            <Route
              path="assignments"
              element={
                <AuthPlaceholder
                  title="Assignments"
                  subtitle="Track pending and submitted assignments."
                />
              }
            />

            <Route
              path="examination"
              element={
                <AuthPlaceholder
                  title="Examination"
                  subtitle="Exam schedules and assessment timelines."
                />
              }
            />

            <Route
              path="hall-ticket"
              element={
                <AuthPlaceholder
                  title="Hall Ticket"
                  subtitle="Download your exam hall ticket securely."
                />
              }
            />

            <Route
              path="certificates"
              element={
                <AuthPlaceholder
                  title="Certificates"
                  subtitle="Access completed certificates and documents."
                />
              }
            />

            <Route
              path="notices"
              element={
                <AuthPlaceholder
                  title="Notices"
                  subtitle="Institutional announcements and reminders."
                />
              }
            />

            <Route
              path="library"
              element={
                <AuthPlaceholder
                  title="Library"
                  subtitle="Book loans, due dates and digital resources."
                />
              }
            />
          </Route>
        </Route>

        {/* ========================= */}
        {/* Admin Routes */}
        {/* ========================= */}
<Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
  <Route path="/admin" element={<AdminLayout />}>
    <Route path="dashboard" element={<AdminDashboard />} />

    {/* Students */}
    <Route path="students" element={<Students />} />
    <Route path="students/create" element={<CreateStudent />} />
    <Route path="students/edit/:id" element={<EditStudent />} />
    <Route path="students/view/:id" element={<ViewStudent />}/>

    {/* Faculty */}
    <Route path="faculties" element={<Faculty />} />
    <Route path="faculties/create" element={<AddFaculty />} />
    <Route path="faculties/edit/:id" element={<EditFaculty />} />
    <Route path="faculties/view/:id" element={<ViewFaculty />} />
    {/* Attendance */}
    <Route path="attendance" element={<AdminAttendance />} />
    <Route path="attendance/create" element={<CreateAttendance />} />
    <Route path="attendance/edit/:id" element={<EditAttendance />} />

    {/* Results */}
    <Route path="results" element={<AdminResults />} />
    <Route path="results/create" element={<CreateResult />} />
    <Route path="results/view/:id" element={<ViewResult />} />
    <Route path="results/edit/:id" element={<EditResult />} />

    {/* Fees */}
    <Route path="fees" element={<AdminFees />} />
    <Route path="fees/create" element={<CreateFee />} />
    <Route path="fees/edit/:id" element={<EditFee />} />
    <Route path="fees/view/:id" element={<ViewFee />} />
    {/* Fee Templates */}

<Route
  path="fee-templates"
  element={<FeeTemplates />}
/>

<Route
  path="fee-templates/create"
  element={<CreateFeeTemplate />}
/>

<Route
  path="fee-templates/view/:id"
  element={<ViewFeeTemplate />}
/>

<Route
  path="fee-templates/edit/:id"
  element={<EditFeeTemplate />}
/>
{/* Notices */}

<Route
  path="notices"
  element={<Notices />}
/>

<Route
  path="notices/create"
  element={<CreateNotice />}
/>

<Route
  path="notices/edit/:id"
  element={<EditNotice />}
/>

<Route
  path="notices/view/:id"
  element={<ViewNotice />}
/>
  </Route>
</Route>

        {/* ========================= */}
        {/* Faculty Routes */}
        {/* ========================= */}

        <Route
          path="/faculty/dashboard"
          element={
            <AuthPlaceholder
              title="Faculty Dashboard"
              subtitle="Faculty operations, schedules and student activity."
            />
          }
        />

        {/* ========================= */}
        {/* 404 */}
        {/* ========================= */}

        <Route
          path="*"
          element={
            <AuthPlaceholder
              title="404"
              subtitle="Page not found."
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}