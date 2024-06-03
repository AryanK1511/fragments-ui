import React from 'react';
import { Button } from '@nextui-org/react';

// ===== CUSTOM BUTTON COMPONENT =====
export const CustomButton = ({ text, onClick }) => {
  return (
    <Button size="lg" onClick={onClick} radius="sm" variant="ghost">
      <span className="font-semibold">{text}</span>
    </Button>
  );
};
