import React, { useState } from 'react';
import { AddFragmentCard } from '../AddFragmentCard/AddFragmentCard';
import { createUserFragment } from '@/lib';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { userAtom } from '@/store';
import { fragmentsAtom } from '@/store';

// ===== ADD FRAGMENT MODAL =====
export const AddFragmentModal = () => {
  // Init router
  const router = useRouter();

  // Shared states
  const [userDetails] = useAtom(userAtom);
  const [fragments, setFragments] = useAtom(fragmentsAtom);

  // State to handle the opening and closing of the modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // State to handle the user response
  const [data, setData] = useState('');

  // Submit the form to create new fragment for the user
  const handleFormSubmit = async () => {
    // Make an API call to the backend to store the fragment
    try {
      const result = await createUserFragment(userDetails.user, data, 'text/plain');
      setFragments([...fragments, result.fragment.id]);
      console.log(fragments);
    } catch (err) {
      router.push('/'); // Redirect the user to the homepage if an error occurs
    }
  };

  return (
    <>
      <AddFragmentCard onOpen={onOpen} />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create a Fragment</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Text Fragment"
                  placeholder="Enter text"
                  variant="bordered"
                  onChange={(e) => setData(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleFormSubmit} onPress={onClose}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
