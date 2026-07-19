import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import StudentLogin from "../pages/public/StudentLogin";
import Admissions from "../pages/public/Admissions";
import Examination from "../pages/public/Examination";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/examination" element={<Examination />} />
      </Routes>
    </BrowserRouter>
  );
}