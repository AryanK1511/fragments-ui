import React, { useEffect, useState } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { getUserFragments } from '@/lib';
import { useAtom } from 'jotai';
import { fragmentsAtom } from '@/store';
import { FragmentCard } from '../FragmentCard/FragmentCard';
import { useRouter } from 'next/navigation';

// ===== FRAGMENTS LIST COMPONENT =====
export const FragmentsList = ({ user }) => {
  const router = useRouter();
  const [fragments, setFragments] = useAtom(fragmentsAtom);

  // Call the API to get all the fragments for a user
  useEffect(() => {
    const getFragments = async () => {
      try {
        const result = await getUserFragments(user);
        setFragments(result.fragments);
      } catch (error) {
        router.push('/');
      }
    };

    getFragments();
  }, [router, setFragments, user]);

  return (
    <div className="container mx-auto px-4">
      {fragments.length === 0 ? (
        <Card className="my-5 shadow-lg">
          <CardBody className="text-center">
            <p>There are no fragments here yet</p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fragments.map((fragment) => (
            <FragmentCard key={fragment.id} fragment={fragment} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};
