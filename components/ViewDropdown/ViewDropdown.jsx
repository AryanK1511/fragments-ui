import React, { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { conversions } from '@/lib/mappings';
import { getUserFragment } from '@/lib/api';

// ===== VIEW DROPDOWN COMPONENT =====
export const ViewDropdown = ({ fragmentId, fragmentType, user }) => {
  const [selectedOption, setSelectedOption] = useState(conversions[fragmentType]?.[0] || '');
  const options = conversions[fragmentType] || [];

  // Handle when the users clicks on a specific format to view the fragment
  const handleSelect = async (key) => {
    setSelectedOption(options[key]);
    const result = await getUserFragment(fragmentId, user, selectedOption);
    console.log(result);
  };

  return (
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
  );
};
