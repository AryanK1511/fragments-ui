'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks';
import { Nav } from '@/components/Navbar/Navbar';
import { BasicHomepage } from '@/components/BasicHomepage/BasicHomepage';
import { LoggedInHomepage } from '@/components/LoggedInHomepage/LoggedInHomepage';
import { Spinner } from '@nextui-org/react';
import '@/aws/config';

// ===== HOME PAGE =====
export default function Home() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // Set loading state according to user authentication status
  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);

  // Show loading spinner if authentication status is being determined
  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Spinner label="Loading..." size="lg" />
      </div>
    );
  }

  // Show different homepages based on user authentication status
  return (
    <div>
      <Nav />
      {user ? <LoggedInHomepage /> : <BasicHomepage />}
    </div>
  );
}
