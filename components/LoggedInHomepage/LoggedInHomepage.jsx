import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '@/store';
import styles from './LoggedInHomepage.module.css';

// ===== LOGGED IN HOMEPAGE COMPONENT =====
export const LoggedInHomepage = () => {
  // Get the user details from the atom
  const [userDetails] = useAtom(userAtom);

  return (
    <div className={`flex flex-col  mt-20 p-20 ${styles.homepage}`}>
      <h1 className="text-6xl font-semibold">
        Hey, 👋 <span>{userDetails.user?.username}</span>
      </h1>
      <p className="mt-4 text-xl text-gray-700">
        Welcome to your dashboard. Here, you can see all of the fragments that were created under
        your ID.
      </p>
    </div>
  );
};
