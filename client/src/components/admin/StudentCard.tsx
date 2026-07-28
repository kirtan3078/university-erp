import React from "react";

export type Student = {
  _id: string;
  fullName: string;
  enrollmentNumber: string;
  email: string;
  department: string;
  course: string;
  semester: number;
  mobileNumber: string;
  isActivated: boolean;
};

export default function StudentCard({
  student,
}: {
  student: Student;
}) {
  return (
    <div>
      <p className="font-semibold text-white">{student.fullName}</p>
      <p className="mt-1 text-sm text-slate-400">{student.email}</p>
    </div>
  );
}
