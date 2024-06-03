'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/hooks';
import { Nav } from '@/components/Navbar/Navbar';
import { useAtom } from 'jotai';
import { userAtom } from '@/store';
import { BasicHomepage } from '@/components/BasicHomepage/BasicHomepage';
import '@/aws/config';
import { LoggedInHomepage } from '@/components/LoggedInHomepage/LoggedInHomepage';

// ===== HOME PAGE =====
export default function Home() {
  // Set state to see if the user is authenticated and store the user details in the state
  const [userDetails, setUserDetails] = useAtom(userAtom);

  // Get user state from useAuth hook
  const { user } = useAuth();

  // Set state according to user authentication status
  useEffect(() => {
    user &&
      setUserDetails({
        isLoggedIn: true,
        user: user,
      });
  }, [setUserDetails, user]);

  return (
    <div>
      <Nav />
      {userDetails.isLoggedIn ? <LoggedInHomepage /> : <BasicHomepage />}
    </div>
  );
}
