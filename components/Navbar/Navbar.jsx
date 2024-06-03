import React from 'react';
import { Navbar, NavbarBrand, NavbarItem } from '@nextui-org/react';
import { CustomButton } from '../CustomButton/CustomButton';
import { signInWithRedirect, signOut } from 'aws-amplify/auth';
import { useAtom } from 'jotai';
import { userAtom } from '@/store';

export const Nav = () => {
  const [userDetails] = useAtom(userAtom);

  const handleButtonClick = async (action) => {
    if (action.toLowerCase() === 'login') {
      await signInWithRedirect();
    } else if (action.toLowerCase() === 'logout') {
      await signOut();
    }
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Navbar style={{ width: '100%', maxWidth: '1200px' }}>
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
