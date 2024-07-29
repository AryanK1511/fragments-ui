import React from 'react';
import { useAtom } from 'jotai';
import { AddFragmentModal } from '../AddFragmentModal/AddFragmentModal';
import { FragmentsList } from '../FragmentsList/FragmentsList';
import styles from './LoggedInHomepage.module.css';
import { useAuth } from '@/hooks';

// ===== LOGGED IN HOMEPAGE COMPONENT =====
export const LoggedInHomepage = () => {
  const { user } = useAuth();

  return (
    <div className={`flex flex-col  mt-16 px-12 ${styles.homepage}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 col-span-3 md:col-span-2">
          <div>
            <h1 className="text-6xl font-semibold">
              Hey, 👋 <span className="text-cyan-700">{user?.username}</span>
            </h1>
            <p className="mt-8 text-xl text-gray-700">
              Welcome to your dashboard. Here, you can see all of the fragments that were created
              under your ID and also create new ones.
            </p>
          </div>
        </div>
        <div className="col-span-1 pb-20">
          <AddFragmentModal user={user} />
        </div>
      </div>
      <div>
        <FragmentsList user={user} />
      </div>
    </div>
  );
};
