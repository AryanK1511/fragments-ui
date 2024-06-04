import { useEffect, useState } from 'react';
import { getUser } from '@/lib';

// ===== USE AUTH HOOK FOR FETCHING THE USER =====
export const useAuth = () => {
  // Set a state to keep a record of the user
  const [user, setUser] = useState(null);

  // Get the details of the authenticated user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // Return the user state
  return { user };
};
