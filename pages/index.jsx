import React from 'react';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { signInWithRedirect, signOut } from 'aws-amplify/auth';
import { useAuth } from '@/hooks';

// ===== HOME PAGE =====
export default function Home() {
  // Get user state from useAuth hook
  const { user } = useAuth();

  // Define whether login and logout buttons should be disabled
  const isUserLoggedIn = user !== null;
  const isUserLoggedOut = user === null;

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
          disabled={isUserLoggedOut}
        />
      </div>
      {isUserLoggedIn && <span>Welcome {user?.username}</span>}
    </div>
  );
}
