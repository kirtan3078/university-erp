import { useState, useEffect } from 'react';

type User = { id: string } | null;

export default function useAuth(): { user: User } {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    // Placeholder for auth initialization (e.g., check token)
  }, []);

  return { user };
}
