import React from 'react';
import { Navbar, NavbarBrand, NavbarItem } from '@nextui-org/react';
import { CustomButton } from '../CustomButton/CustomButton';
import { signInWithRedirect, signOut } from 'aws-amplify/auth';
import { useAtom } from 'jotai';
import { userAtom } from '@/store';
import { useRouter } from 'next/navigation';

// ===== NAVBAR COMPONENT =====
export const Nav = () => {
  // Init router
  const router = useRouter();

  // Global state to check whether the user is logged in and their details
  const [userDetails] = useAtom(userAtom);

  // Handles the user authentication flow
  const handleButtonClick = async (action) => {
    // Log the user in if the action is login
    if (action.toLowerCase() === 'login') {
      console.log('Logging the user in');

      try {
        await signInWithRedirect();
      } catch (err) {
        console.log('There was an error while logging the user in.');
        router.push('/'); // Redirect the user to the homepage in case of failure
      }

      // Log the user out if the action is logout
    } else if (action.toLowerCase() === 'logout') {
      console.log('Logging the user out');

      try {
        await signOut();
      } catch (err) {
        console.log('There was an error while logging the user out.');
        router.push('/'); // Redirect the user to the homepage in case of failure
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
            {userDetails.isLoggedIn ? (
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
