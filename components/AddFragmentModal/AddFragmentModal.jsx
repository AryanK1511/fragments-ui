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
} from '@nextui-org/react';
import { useAtom } from 'jotai';
import { fragmentsAtom } from '@/store';
import { TypesList } from '../TypesList/TypesList';
import { FragmentFileUpload } from '../FragmentFileUpload/FragmentFileUpload';

// ===== ADD FRAGMENT MODAL =====
export const AddFragmentModal = ({ user }) => {
  const [fragments, setFragments] = useAtom(fragmentsAtom);

  // State to handle the opening and closing of the modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // State to handle the user response
  const [file, setFile] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [error, setError] = useState('');

  // Handle modal open action to clear all fields
  const handleOpen = () => {
    setFile(null);
    setSelectedType(null);
    setError('');
    onOpen();
  };

  // Submit the form to create a new fragment for the user
  const handleFormSubmit = async () => {
    // Check if a file is uploaded
    if (!file) {
      setError('A file upload is required.');
      return;
    }

    // Check if a content type is selected
    if (!selectedType) {
      setError('A content type must be selected.');
      return;
    }

    try {
      // Send the file uploaded, type, and the user id token to the backend API
      const result = await createUserFragment(file, selectedType, user);
      setFragments([...fragments, result.fragment]);

      // Reset everything
      setFile(null);
      setError('');
      setSelectedType(null);

      // Close the modal
      onClose();
    } catch (error) {
      console.error(`An error occurred while creating the fragment: ${error.message}`);
      setError(`An error occurred while creating the fragment: ${error.message}`);
    }
  };

  return (
    <>
      <AddFragmentCard onOpen={handleOpen} />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create a Fragment</ModalHeader>
              <ModalBody>
                <TypesList selectedType={selectedType} setSelectedType={setSelectedType} />
                <FragmentFileUpload
                  file={file}
                  setFile={setFile}
                  error={error}
                  setError={setError}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleFormSubmit}>
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
