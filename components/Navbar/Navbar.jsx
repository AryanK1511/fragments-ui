import React from 'react';
import { Navbar, NavbarBrand, NavbarItem } from '@nextui-org/react';
import { CustomButton } from '../CustomButton/CustomButton';
import { signInWithRedirect, signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';

// ===== NAVBAR COMPONENT =====
export const Nav = () => {
  const router = useRouter();

  // Get the user details from our custom hook
  const { user } = useAuth();

  // Handles the user authentication flow
  const handleButtonClick = async (action) => {
    // Log the user in if the action is login
    if (action.toLowerCase() === 'login') {
      try {
        await signInWithRedirect();
      } catch (err) {
        router.push('/');
      }

      // Log the user out if the action is logout
    } else if (action.toLowerCase() === 'logout') {
      try {
        await signOut();
      } catch (err) {
        router.push('/');
      }
    }
  };

  return (
    <div>
      <Navbar maxWidth="full" className="px-10">
        <NavbarBrand>
          <p className="font-bold text-xl">Fragments UI</p>
        </NavbarBrand>
        <div className="flex items-center">
          <NavbarItem>
            {user ? (
              <CustomButton
                onClick={() => {
                  handleButtonClick('logout');
                }}
                text="Logout"
              />
            ) : (
              <CustomButton
                onClick={() => {
                  handleButtonClick('login');
                }}
                text="Login"
              />
            )}
          </NavbarItem>
        </div>
      </Navbar>
    </div>
  );
};
