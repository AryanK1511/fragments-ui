import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { useAtom } from 'jotai';
import { fragmentsAtom } from '@/store';
import { updateUserFragment } from '@/lib/api';
import { FragmentFileUpload } from '../FragmentFileUpload/FragmentFileUpload';

// ===== UPDATE FRAGMENT MODAL COMPONENT =====
export const UpdateFragmentModal = ({ isOpen, onClose, fragment, user }) => {
  const [fragments, setFragments] = useAtom(fragmentsAtom);

  // State to handle the file upload and type
  const [file, setFile] = useState(null);
  const [selectedType, setSelectedType] = useState(fragment.type);
  const [error, setError] = useState('');

  // Submit the form to update the fragment
  const handleFormSubmit = async () => {
    // Check if a file is uploaded
    if (!file) {
      setError('A file upload is required.');
      return;
    }

    // Reset everything
    setFile(null);
    setError('');

    try {
      const result = await updateUserFragment(file, selectedType, user, fragment.id);

      // Update the fragment in the state
      setFragments((prevFragments) =>
        prevFragments.map((f) => (f.id === fragment.id ? result.fragment : f))
      );

      onClose();
    } catch (error) {
      console.error(`An error occurred: ${error}`);
      setError(`An error occurred while updating the fragment: ${err.message}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Update a Fragment</ModalHeader>
        <ModalBody>
          <FragmentFileUpload file={file} setFile={setFile} error={error} setError={setError} />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onClick={onClose}>
            Close
          </Button>
          <Button color="primary" onClick={handleFormSubmit}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
