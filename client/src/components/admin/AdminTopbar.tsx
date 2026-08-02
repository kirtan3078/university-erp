import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  User,
  UserCircle,
  Lock,
} from "lucide-react";
import axios from "axios";
export default function AdminTopbar() {

  const navigate = useNavigate();

  // ===============================
  // States
  // ===============================

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  // ===============================
  // Refs
  // ===============================

  const profileRef =
    useRef<HTMLDivElement>(null);

  // ===============================
  // Greeting
  // ===============================

  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";

    if (hour < 17) return "Good Afternoon";

    if (hour < 21) return "Good Evening";

    return "Good Night";
  }, []);

  // ===============================
  // Today's Date
  // ===============================

  const today = useMemo(() => {
    return new Date().toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  }, []);

    // ===============================
  // Close Profile Dropdown
  // When Clicking Outside
  // ===============================

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node
        )
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  // ===============================
  // Close Dropdown / Modal
  // With ESC Key
  // ===============================

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setShowLogoutModal(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, []);

  // ===============================
  // Logout Handler
  // (API will be connected later)
  // ===============================

  const handleLogout = async () => {
    setShowLogoutModal(false);
try {
  await axios.post(
    "/api/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );

  navigate("/login");
} catch (error) {
  console.error(error);
}
  };

    return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">

        <div className="flex items-center justify-between gap-6 px-6 py-5 lg:px-8">

          {/* ===================================== */}
          {/* Left Section */}
          {/* ===================================== */}

          <div className="flex items-center gap-4">

            {/* Mobile Menu */}

            <button
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-slate-700
                bg-slate-900
                text-slate-300
                transition-all
                duration-300
                hover:border-cyan-500
                hover:text-cyan-400
                md:hidden
              "
            >
              <Menu size={22} />
            </button>

            {/* Welcome */}

            <div>

              <h2 className="flex items-center gap-2 text-2xl font-bold text-white">

                <ShieldCheck
                  size={24}
                  className="text-cyan-400"
                />

                <span>

                  {greeting},{" "}

                  <span className="text-cyan-400">

                    Administrator

                  </span>

                </span>

              </h2>

              <p className="mt-1 text-sm text-slate-400">

                {today}

              </p>

            </div>

          </div>
                    {/* ===================================== */}
          {/* Center Section - Search */}
          {/* ===================================== */}

          <div className="hidden flex-1 justify-center px-6 lg:flex">

            <div className="relative w-full max-w-2xl">

              <Search
                size={20}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                placeholder="Search students, faculty, notices, fees..."
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-700
                  bg-slate-900/70
                  py-3
                  pl-12
                  pr-24
                  text-white
                  placeholder:text-slate-500
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  focus:border-cyan-500
                  focus:ring-4
                  focus:ring-cyan-500/10
                  focus:outline-none
                "
              />

              {/* Shortcut */}

              <div
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  flex
                  items-center
                  gap-1
                  rounded-lg
                  border
                  border-slate-700
                  bg-slate-800
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-slate-400
                "
              >

                <span>Ctrl</span>

                <span className="font-bold">K</span>

              </div>

            </div>

          </div>
                    {/* ===================================== */}
          {/* Right Section */}
          {/* ===================================== */}

          <div className="flex items-center gap-3">

            {/* Mobile Search */}

            <button
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-slate-700
                bg-slate-900
                text-slate-300
                transition-all
                duration-300
                hover:border-cyan-500
                hover:text-cyan-400
                lg:hidden
              "
            >
              <Search size={20} />
            </button>

            {/* Notifications */}

            <button
              className="
                group
                relative
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-slate-700
                bg-slate-900
                text-slate-300
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-500
                hover:text-cyan-400
              "
            >

              <Bell
                size={20}
                className="transition group-hover:rotate-12"
              />

              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  text-[10px]
                  font-bold
                  text-white
                "
              >
                3
              </span>

            </button>

            {/* Settings */}

            <button
              className="
                group
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-slate-700
                bg-slate-900
                text-slate-300
                transition-all
                duration-300
                hover:border-cyan-500
                hover:text-cyan-400
              "
            >

              <Settings
                size={20}
                className="transition duration-300 group-hover:rotate-90"
              />

            </button>

            {/* Profile */}

            <div
              className="relative"
              ref={profileRef}
            >

              <button
                onClick={() =>
                  setProfileOpen(!profileOpen)
                }
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-slate-700
                  bg-slate-900
                  px-4
                  py-2
                  transition-all
                  duration-300
                  hover:border-cyan-500
                  hover:shadow-lg
                  hover:shadow-cyan-500/10
                "
              >

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-cyan-500
                    to-blue-600
                    shadow-lg
                  "
                >

                  <User
                    size={20}
                    className="text-white"
                  />

                </div>

                <div className="hidden text-left md:block">

                  <h4 className="text-sm font-semibold text-white">

                    Administrator

                  </h4>

                  <p className="text-xs text-slate-400">

                    System Administrator

                  </p>

                </div>

                <ChevronDown
                  size={18}
                  className={`text-slate-400 transition-transform duration-300 ${
                    profileOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />

              </button>
              {/* ===================================== */}
              {/* Profile Dropdown */}
              {/* ===================================== */}

              {profileOpen && (

                <div
                  className="
                    absolute
                    right-0
                    mt-3
                    w-72
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-700
                    bg-slate-900/95
                    shadow-2xl
                    backdrop-blur-xl
                    animate-in
                    fade-in
                    zoom-in-95
                    duration-200
                  "
                >

                  {/* User Info */}

                  <div className="border-b border-slate-700 px-5 py-4">

                    <div className="flex items-center gap-4">

                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-full
                          bg-gradient-to-br
                          from-cyan-500
                          to-blue-600
                        "
                      >

                        <User
                          size={22}
                          className="text-white"
                        />

                      </div>

                      <div>

                        <h3 className="font-semibold text-white">

                          Administrator

                        </h3>

                        <p className="text-sm text-slate-400">

                          admin@123.com

                        </p>

                      </div>

                    </div>

                  </div>

                  {/* Menu Items */}

                  <button
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      px-5
                      py-4
                      text-slate-300
                      transition
                      hover:bg-slate-800
                    "
                  >

                    <UserCircle size={19} />

                    My Profile

                  </button>

                  <button
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      px-5
                      py-4
                      text-slate-300
                      transition
                      hover:bg-slate-800
                    "
                  >

                    <Settings size={19} />

                    Settings

                  </button>

                  <button
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      px-5
                      py-4
                      text-slate-300
                      transition
                      hover:bg-slate-800
                    "
                  >

                    <Lock size={19} />

                    Change Password

                  </button>

                  <div className="border-t border-slate-700" />

                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      setShowLogoutModal(true);
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      px-5
                      py-4
                      text-red-400
                      transition
                      hover:bg-red-500/10
                    "
                  >

                    <LogOut size={19} />

                    Logout

                  </button>

                </div>

              )}

            </div>

          </div>

        </div>
              {/* ===================================== */}
      {/* Logout Confirmation Modal */}
      {/* ===================================== */}

      {showLogoutModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">

              <LogOut
                size={36}
                className="text-red-400"
              />

            </div>

            <h2 className="text-center text-2xl font-bold text-white">

              Logout

            </h2>

            <p className="mt-3 text-center text-slate-400 leading-7">

              Are you sure you want to logout from the
              University ERP Admin Panel?

            </p>

            <div className="mt-8 flex gap-4">

              <button
                onClick={() =>
                  setShowLogoutModal(false)
                }
                className="
                  flex-1
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-800
                  py-3
                  font-medium
                  text-white
                  transition-all
                  duration-300
                  hover:bg-slate-700
                "
              >

                Cancel

              </button>

              <button
                onClick={handleLogout}
                className="
                  flex-1
                  rounded-xl
                  bg-gradient-to-r
                  from-red-500
                  to-red-600
                  py-3
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:shadow-lg
                  hover:shadow-red-500/30
                "
              >

                Logout

              </button>

            </div>

          </div>

        </div>
      )}

    </header>

    </>
  );
}