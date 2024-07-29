import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { possibleTypes, conversions, typeKeys } from '@/lib/mappings';

// ===== TYPES LIST COMPONENT =====
export const TypesList = ({ selectedType, setSelectedType }) => {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        label="Select a file type"
        value={selectedType}
        onChange={(e) => setSelectedType(typeKeys[e.target.value])}
        className="max-w"
      >
        {typeKeys.map((type, index) => (
          <SelectItem key={index} value={type}>
            {type}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
