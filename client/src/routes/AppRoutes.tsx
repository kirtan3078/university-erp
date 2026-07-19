import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import StudentLogin from "../pages/public/StudentLogin";
import StudentRegister from "../pages/public/StudentRegister";
import LoginSelection from "../pages/public/LoginSelection";
import Admissions from "../pages/public/Admissions";
import AuthPlaceholder from "../pages/public/AuthPlaceholder";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/student/Dashboard";
import Attendance from "../pages/student/Attendance";
import Results from "../pages/student/Results";
import Fees from "../pages/student/Fees";
import Timetable from "../pages/student/Timetable";
import Profile from "../pages/student/Profile";
import Settings from "../pages/student/Settings";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AuthPlaceholder title="About" subtitle="A premium institutional overview experience." />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/courses" element={<AuthPlaceholder title="Courses" subtitle="Explore programs and academic offerings." />} />
        <Route path="/notices" element={<AuthPlaceholder title="Notices" subtitle="Stay updated with institutional announcements." />} />
        <Route path="/contact" element={<AuthPlaceholder title="Contact" subtitle="Reach out for academic support and institutional assistance." />} />
        <Route path="/login" element={<LoginSelection />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/register" element={<StudentRegister />} />
        <Route path="/register/student" element={<StudentRegister />} />
        <Route path="/login/faculty" element={<AuthPlaceholder title="Faculty Login" subtitle="Faculty access for attendance, marks and timetable workflows." />} />
        <Route path="/login/admin" element={<AuthPlaceholder title="Admin Login" subtitle="Administrative access for ERP oversight and governance." />} />
        <Route path="/login/forgot-password" element={<AuthPlaceholder title="Forgot Password" subtitle="Recover your portal access securely." />} />
        <Route path="/student/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="courses" element={<AuthPlaceholder title="Courses" subtitle="Semester subjects and course materials." />} />
          <Route path="assignments" element={<AuthPlaceholder title="Assignments" subtitle="Track pending and submitted assignments." />} />
          <Route path="examination" element={<AuthPlaceholder title="Examination" subtitle="Exam schedules and assessment timelines." />} />
          <Route path="results" element={<Results />} />
          <Route path="fees" element={<Fees />} />
          <Route path="hall-ticket" element={<AuthPlaceholder title="Hall Ticket" subtitle="Download your exam hall ticket securely." />} />
          <Route path="certificates" element={<AuthPlaceholder title="Certificates" subtitle="Access completed certificates and documents." />} />
          <Route path="notices" element={<AuthPlaceholder title="Notices" subtitle="Institutional announcements and reminders." />} />
          <Route path="library" element={<AuthPlaceholder title="Library" subtitle="Book loans, due dates and digital resources." />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/faculty/dashboard" element={<AuthPlaceholder title="Faculty Dashboard" subtitle="Faculty operations, schedules and student activity." />} />
        <Route path="/admin/dashboard" element={<AuthPlaceholder title="Admin Dashboard" subtitle="University-wide administration and ERP control center." />} />
      </Routes>
    </BrowserRouter>
  );
}