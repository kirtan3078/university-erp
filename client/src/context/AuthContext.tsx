import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface User {
  id: string;
  fullName: string;
  email: string;
  enrollmentNumber: string;

  // ✅ New Fields
  mobileNumber?: string;
  department?: string;
  course?: string;
  semester?: number;
  profileImage?: string;

  role: "student" | "faculty" | "admin";
  isActivated: boolean;
}

interface AuthContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  login: (nextUser: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "authUser";

const readStoredUser = (): User | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedUser = window.localStorage.getItem(STORAGE_KEY);

    return storedUser ? (JSON.parse(storedUser) as User) : null;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(() => readStoredUser());

  const login = (nextUser: User) => {
    setUser(nextUser);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(nextUser)
      );
    }
  };

  const logout = () => {
    setUser(null);

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem("authToken");
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      setUser,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
}