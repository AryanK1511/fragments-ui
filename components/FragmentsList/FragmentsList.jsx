import React, { useEffect, useState } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { Accordion, AccordionItem } from '@nextui-org/react';
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

  // Handle the file download logic
  const handleDownload = () => {
    console.log('Downloading ....');
  };

  return (
    <div>
      {fragments.length === 0 ? (
        <Card className="my-5">
          <CardBody className="text-center">
            <p>There are no fragments here yet</p>
          </CardBody>
        </Card>
      ) : (
        <Accordion variant="bordered">
          {fragments.map((fragment) => (
            <AccordionItem
              key={fragment.id}
              aria-label={`Fragment: ${fragment.id}`}
              subtitle="Expand to see fragment metadata"
              title={`Fragment: ${fragment.id}`}
            >
              <div style={{ padding: '10px' }}>
                <table className="min-w-full bg-white">
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 font-bold">ID</td>
                      <td className="px-4 py-2">{fragment.id}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-bold">Owner ID</td>
                      <td className="px-4 py-2">{fragment.ownerId}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-bold">Type</td>
                      <td className="px-4 py-2">{fragment.type}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-bold">Size</td>
                      <td className="px-4 py-2">{fragment.size} bytes</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-bold">Created</td>
                      <td className="px-4 py-2">{new Date(fragment.created).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-bold">Updated</td>
                      <td className="px-4 py-2">{new Date(fragment.updated).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-bold">Available Download Formats</td>
                      <td className="px-4 py-2">
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                          onClick={() => handleDownload()}
                        >
                          Original
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};
