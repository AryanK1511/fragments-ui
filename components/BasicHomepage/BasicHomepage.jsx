import React from 'react';
import { CustomButton } from '../CustomButton/CustomButton';
import styles from './BasicHomepage.module.css';
import { signInWithRedirect } from 'aws-amplify/auth';

// ===== BASIC HOMEPAGE COMPONENT =====
export const BasicHomepage = () => {
  return (
    <div className={`flex flex-col items-center mt-20 min-h-screen p-20 ${styles.homepage}`}>
      <h1 className="text-6xl font-semibold">
        <span className="text-cyan-700">Fragments</span> UI
      </h1>
      <p className="mt-4 text-xl text-gray-700 text-center">
        This is a Next.js frontend created to test the Fragments microservice.
      </p>
      <div className="mt-10">
        <CustomButton text="Get started" onClick={() => signInWithRedirect()} />
      </div>
    </div>
  );
};
