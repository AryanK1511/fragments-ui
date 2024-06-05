import React, { useEffect, useState } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { getUserFragments } from '@/lib';
import { useAtom } from 'jotai';
import { fragmentsAtom, userAtom } from '@/store';
import { useRouter } from 'next/navigation';

// ===== FRAGMENTS LIST COMPONENT =====
export const FragmentsList = () => {
  const router = useRouter();
  // User state
  const [userDetails, setUserDetails] = useAtom(userAtom);
  // State to hold fragments
  const [fragments, setFragments] = useAtom(fragmentsAtom);

  // Call the API to get all the fragments for a user
  useEffect(() => {
    const getFragments = async () => {
      try {
        const result = await getUserFragments(userDetails.user);
        setFragments(result.fragments);
      } catch (error) {
        router.push('/');
      }
    };

    // Call the function to fetch fragments
    getFragments();
  }, [router, setFragments, setUserDetails, userDetails]);

  return (
    <div>
      {fragments.length === 0 && (
        <Card className="my-5">
          <CardBody className="text-center">
            <p>There are no fragments here yet</p>
          </CardBody>
        </Card>
      )}
      {fragments?.map((fragment, index) => (
        <Card className="my-5" key={index}>
          <CardBody>
            <p>{fragment}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
