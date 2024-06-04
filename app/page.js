'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks';
import { Nav } from '@/components/Navbar/Navbar';
import { useAtom } from 'jotai';
import { userAtom } from '@/store';
import { BasicHomepage } from '@/components/BasicHomepage/BasicHomepage';
import { LoggedInHomepage } from '@/components/LoggedInHomepage/LoggedInHomepage';
import { Spinner } from '@nextui-org/react';
import '@/aws/config';

// ===== HOME PAGE =====
export default function Home() {
  // Set state to see if the user is authenticated and store the user details in the state
  const [userDetails, setUserDetails] = useAtom(userAtom);
  const [loading, setLoading] = useState(true);

  // Get user state from useAuth hook
  const { user } = useAuth();

  // Set state according to user authentication status
  useEffect(() => {
    user &&
      setUserDetails({
        isLoggedIn: true,
        user: user,
      });

    setLoading(false);
  }, [setUserDetails, user]);

  return (
    <div>
      <Nav />
      {loading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner label="Loading..." size="lg" />
        </div>
      ) : userDetails.isLoggedIn ? (
        <LoggedInHomepage />
      ) : (
        <BasicHomepage />
      )}
    </div>
  );
}
