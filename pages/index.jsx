import React, { useState, useEffect } from 'react';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { signInWithRedirect, signOut } from 'aws-amplify/auth';
import { useAuth } from '@/hooks';
import { getUserFragments } from '@/lib/api';

// ===== HOME PAGE =====
export default function Home() {
  // Set state to see if the user is authenticated
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  // Get user state from useAuth hook
  const { user } = useAuth();

  // Set authentication state according to user authentication status
  useEffect(() => {
    user ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false);
  }, [user]);

  // Do an authenticated request to the fragments API server
  useEffect(() => {
    if (user) {
      console.log(user);
      const getFragments = async () => {
        try {
          const userFragments = await getUserFragments(user);
          console.log(userFragments);
        } catch (err) {
          console.error('Unable to call fragments API', { err });
        }
      };

      getFragments();
    }
  }, [user]);

  // Handles user login and logout
  const handleButtonClick = async (action) => {
    if (action.toLowerCase() === 'login') {
      await signInWithRedirect();
    } else if (action.toLowerCase() === 'logout') {
      await signOut();
    }
  };

  return (
    <div className="p-20">
      <h1 className="text-6xl font-semibold">Fragments UI</h1>
      <div className="space-x-4 my-12 flex">
        <CustomButton
          text="Login"
          variant="solid"
          onClick={() => handleButtonClick('Login')}
          disabled={isUserLoggedIn}
        />
        <CustomButton
          text="Logout"
          variant="outline"
          onClick={() => handleButtonClick('Logout')}
          disabled={!isUserLoggedIn}
        />
      </div>
      {isUserLoggedIn && <span>Welcome {user?.username}</span>}
    </div>
  );
}
