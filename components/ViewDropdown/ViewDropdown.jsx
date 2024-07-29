import React, { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { conversions } from '@/lib/mappings';
import { getUserFragment } from '@/lib/api';
import { FragmentModal } from '../FragmentModal/FragmentModal';

// ===== VIEW DROPDOWN COMPONENT =====
export const ViewDropdown = ({ fragmentId, fragmentType, user }) => {
  const [selectedOption, setSelectedOption] = useState(conversions[fragmentType]?.[0] || '');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [mimeType, setMimeType] = useState('');
  const options = conversions[fragmentType] || [];

  // Handle when the user clicks on a specific format to view the fragment
  const handleSelect = async (key) => {
    const selectedFormat = options[key];
    setSelectedOption(selectedFormat);
    try {
      const blob = await getUserFragment(fragmentId, user, selectedFormat);

      // Process the Blob content based on MIME type
      let content;
      if (selectedFormat.startsWith('text/') || selectedFormat.startsWith('application/')) {
        content = await blob.text(); // Convert Blob to text
      } else if (selectedFormat.startsWith('image/')) {
        content = URL.createObjectURL(blob); // Create a URL for the image
      }

      setMimeType(selectedFormat);
      setModalContent(content);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching fragment:', error);
    }
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button color="warning" variant="bordered">
            View
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Action event example" onAction={(key) => handleSelect(key)}>
          {options.map((option, index) => (
            <DropdownItem key={index}>{option}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <FragmentModal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        content={modalContent}
        mimeType={mimeType}
      />
    </>
  );
};
