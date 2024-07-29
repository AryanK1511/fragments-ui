import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button } from '@nextui-org/react';
import { useAtom } from 'jotai';
import { fragmentsAtom } from '@/store';
import { deleteUserFragment } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { ViewDropdown } from '../ViewDropdown/ViewDropdown';

// ===== FRAGMENT CARD COMPONENT =====
export const FragmentCard = ({ fragment, user }) => {
  const router = useRouter();

  // State to hold fragments
  const [fragments, setFragments] = useAtom(fragmentsAtom);

  // Handle delete fragment
  const handleDelete = async () => {
    try {
      const result = await deleteUserFragment(fragment.id, user);
      console.log(result);
      console.log(fragments);
      if (result.status === 'ok') {
        setFragments((prevFragments) => prevFragments.filter((f) => f.id !== fragment.id));
      }
    } catch (error) {
      console.log('Error');
      router.push('/');
    }
  };

  return (
    <Card className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold text-default-600">{fragment.type}</h4>
            <h5 className="text-small text-default-400">{fragment.id}</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
          <p className="font-semibold text-default-400 text-small">Owner ID</p>
          <p className="text-default-400 text-small">{fragment.ownerId}</p>
          <p className="font-semibold text-default-400 text-small">Size</p>
          <p className="text-default-400 text-small">{fragment.size} bytes</p>
          <p className="font-semibold text-default-400 text-small">Created</p>
          <p className="text-default-400 text-small">
            {new Date(fragment.created).toLocaleString()}
          </p>
          <p className="font-semibold text-default-400 text-small">Last Updated</p>
          <p className="text-default-400 text-small">
            {new Date(fragment.updated).toLocaleString()}
          </p>
        </div>
      </CardBody>
      <CardFooter className="gap-3">
        <ViewDropdown fragmentId={fragment.id} user={user} fragmentType={fragment.type} />
        <Button color="primary" variant="bordered">
          Update
        </Button>
        <Button color="danger" variant="bordered" onClick={handleDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
