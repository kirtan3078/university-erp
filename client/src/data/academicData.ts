// ================================
// Academic Data
// One Source of Truth
// ================================

export interface Course {
  code: string;
  name: string;
}

export interface Department {
  code: string;
  name: string;
  courses: Course[];
}

export const departments: Department[] = [
  {
    code: "IT",
    name: "Information Technology",
    courses: [
      {
        code: "BSCIT",
        name: "B.Sc. Information Technology",
      },
      {
        code: "MSCIT",
        name: "M.Sc. Information Technology",
      },
    ],
  },

  {
    code: "CSE",
    name: "Computer Science Engineering",
    courses: [
      {
        code: "BTCSE",
        name: "B.Tech Computer Science Engineering",
      },
      {
        code: "MTCSE",
        name: "M.Tech Computer Science Engineering",
      },
    ],
  },

  {
    code: "CE",
    name: "Civil Engineering",
    courses: [
      {
        code: "BTCE",
        name: "B.Tech Civil Engineering",
      },
      {
        code: "MTCE",
        name: "M.Tech Civil Engineering",
      },
    ],
  },

  {
    code: "ME",
    name: "Mechanical Engineering",
    courses: [
      {
        code: "BTME",
        name: "B.Tech Mechanical Engineering",
      },
      {
        code: "MTME",
        name: "M.Tech Mechanical Engineering",
      },
    ],
  },

  {
    code: "EE",
    name: "Electrical Engineering",
    courses: [
      {
        code: "BTEE",
        name: "B.Tech Electrical Engineering",
      },
      {
        code: "MTEE",
        name: "M.Tech Electrical Engineering",
      },
    ],
  },

  {
    code: "EC",
    name: "Electronics & Communication",
    courses: [
      {
        code: "BTEC",
        name: "B.Tech Electronics & Communication",
      },
      {
        code: "MTEC",
        name: "M.Tech Electronics & Communication",
      },
    ],
  },

  {
    code: "BCA",
    name: "Bachelor of Computer Applications",
    courses: [
      {
        code: "BCA",
        name: "Bachelor of Computer Applications",
      },
    ],
  },

  {
    code: "MCA",
    name: "Master of Computer Applications",
    courses: [
      {
        code: "MCA",
        name: "Master of Computer Applications",
      },
    ],
  },

  {
    code: "BBA",
    name: "Bachelor of Business Administration",
    courses: [
      {
        code: "BBA",
        name: "Bachelor of Business Administration",
      },
    ],
  },

  {
    code: "MBA",
    name: "Master of Business Administration",
    courses: [
      {
        code: "MBA",
        name: "Master of Business Administration",
      },
    ],
  },

  {
    code: "BCOM",
    name: "Bachelor of Commerce",
    courses: [
      {
        code: "BCOM",
        name: "Bachelor of Commerce",
      },
    ],
  },
];

export const semesters = [
  {
    value: 1,
    label: "Semester 1",
  },
  {
    value: 2,
    label: "Semester 2",
  },
  {
    value: 3,
    label: "Semester 3",
  },
  {
    value: 4,
    label: "Semester 4",
  },
  {
    value: 5,
    label: "Semester 5",
  },
  {
    value: 6,
    label: "Semester 6",
  },
  {
    value: 7,
    label: "Semester 7",
  },
  {
    value: 8,
    label: "Semester 8",
  },
];

export const courses: Course[] = departments.flatMap(
  (department) => department.courses
);