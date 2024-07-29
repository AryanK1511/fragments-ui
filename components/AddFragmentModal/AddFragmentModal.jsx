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

// ===== ADD FRAGMENT MODAL =====
export const AddFragmentModal = ({ user }) => {
  const [fragments, setFragments] = useAtom(fragmentsAtom);

  // State to handle the opening and closing of the modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // State to handle the user response
  const [file, setFile] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [error, setError] = useState('');

  // Handle file input change
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
    setError('');
  };

  // Remove the selected file
  const handleRemoveFile = () => {
    setFile(null);
  };

  // Submit the form to create new fragment for the user
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

    // Reset everything
    setFile(null);
    setError('');

    try {
      // Send the file uploaded, type and the user id token to the backend API
      const result = await createUserFragment(file, selectedType, user);
      setFragments([...fragments, result.fragment]);

      // Close the modal
      onClose();
    } catch (err) {
      setError(`An error occured while creating the fragment: ${err.message}`);
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
                <TypesList selectedType={selectedType} setSelectedType={setSelectedType} />
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Fragment Data</label>
                  {file ? (
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <Button color="danger" variant="flat" onPress={handleRemoveFile}>
                        Remove File
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v24a4 4 0 004 4h24a4 4 0 004-4V20l-8-8z"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M28 8v8h8M28 8l8 8"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="text-sm text-gray-600 flex justify-center align-center">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">Up to 5MB</p>
                      </div>
                    </div>
                  )}
                  {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                </div>
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
