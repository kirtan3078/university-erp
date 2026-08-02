import {
  GraduationCap,
  Users,
  UserCog,
  CalendarDays,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const stats = [
  {
    title: "Students",
    value: "2,547",
    icon: Users,
  },
  {
    title: "Faculty",
    value: "184",
    icon: UserCog,
  },
  {
    title: "Established",
    value: "1990",
    icon: CalendarDays,
  },
  {
    title: "Campus",
    value: "Surat",
    icon: MapPin,
  },
];

const contacts = [
  {
    icon: Phone,
    text: "+91 98765 43210",
  },
  {
    icon: Mail,
    text: "admin@universityerp.com",
  },
  {
    icon: MapPin,
    text: "Veer Narmad South Gujarat University, Surat",
  },
];
const socials = [
  {
    icon: FaInstagram,
    href: "#",
  },
  {
    icon: FaFacebook,
    href: "#",
  },
  {
    icon: FaLinkedin,
    href: "#",
  },
  {
    icon: FaYoutube,
    href: "#",
  },
];

export default function AdminFooter() {
  return (
    <footer className="mt-12 rounded-3xl border border-slate-700/60 bg-slate-900/80 shadow-2xl backdrop-blur-xl overflow-hidden">
              {/* ===================================== */}
      {/* Hero */}
      {/* ===================================== */}

      <div className="relative overflow-hidden border-b border-slate-700/60 px-8 py-10">

        {/* Decorative Background */}
        <div className="absolute -left-20 top-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute -right-16 bottom-0 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center">

          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">

            <GraduationCap
              size={34}
              className="text-white"
            />

          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white">
            University ERP
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400 leading-relaxed">
            Empowering Education Through Technology with a
            modern, secure and efficient University Management
            System.
          </p>

        </div>

      </div>
            {/* ===================================== */}
      {/* Statistics */}
      {/* ===================================== */}

      <div className="grid grid-cols-1 gap-5 border-b border-slate-700/60 p-8 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-700
                bg-slate-800/70
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-500/60
                hover:shadow-xl
                hover:shadow-cyan-500/10
              "
            >

              {/* Decorative Glow */}
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-500/10 blur-2xl transition group-hover:bg-cyan-500/20" />

              <div className="relative z-10 flex items-center gap-4">

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-cyan-500
                    to-blue-600
                    shadow-lg
                    transition
                    group-hover:scale-110
                  "
                >
                  <Icon
                    size={28}
                    className="text-white"
                  />
                </div>

                <div>

                  <h3 className="text-3xl font-bold text-white">
                    {item.value}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {item.title}
                  </p>

                </div>

              </div>

            </div>
          );
        })}

      </div>
            {/* ===================================== */}
      {/* Contact & Social */}
      {/* ===================================== */}

      <div className="grid grid-cols-1 gap-10 border-b border-slate-700/60 p-8 lg:grid-cols-2">

        {/* Contact */}

        <div>

          <h3 className="mb-6 text-xl font-semibold text-white">
            Contact Information
          </h3>

          <div className="space-y-4">

            {contacts.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.text}
                  className="flex items-center gap-4 text-slate-300"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 border border-slate-700">

                    <Icon
                      size={20}
                      className="text-cyan-400"
                    />

                  </div>

                  <span className="text-sm sm:text-base">
                    {item.text}
                  </span>

                </div>
              );
            })}

          </div>

        </div>

        {/* Social */}

        <div className="flex flex-col justify-between">

          <div>

            <h3 className="mb-6 text-xl font-semibold text-white">
              Connect With Us
            </h3>

            <div className="flex flex-wrap gap-4">

              {socials.map((item, index) => {
                const Icon = item.icon;

                return (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      group
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-slate-700
                      bg-slate-800
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-cyan-500
                      hover:bg-cyan-500
                    "
                  >

                    <Icon
                      size={24}
                      className="text-slate-300 transition group-hover:text-white"
                    />

                  </a>
                );
              })}

            </div>

          </div>

          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800/60 p-5">

            <p className="text-sm leading-7 text-slate-400">
              Building the future of education with a modern,
              secure and user-friendly ERP platform for
              students, faculty and administrators.
            </p>

          </div>

        </div>

      </div>

      {/* ===================================== */}
      {/* Bottom Bar */}
      {/* ===================================== */}

      <div className="flex flex-col items-center justify-between gap-4 px-8 py-6 text-center text-sm text-slate-400 md:flex-row">

        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">
            University ERP
          </span>{" "}
          • All Rights Reserved.
        </p>

        <div className="flex items-center gap-4">

          <span className="rounded-full border border-slate-700 bg-slate-800 px-4 py-1">
            Version 1.0.0
          </span>

          <span className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1 text-green-400">

            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>

            Online

          </span>

        </div>

      </div>

    </footer>
)}