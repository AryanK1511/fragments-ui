import React from 'react';
import { Button } from '@radix-ui/themes';

// ===== CUSTOM BUTTON COMPONENT =====
export const CustomButton = ({ text, variant, onClick, disabled }) => {
  return (
    <Button variant={variant} size="3" onClick={onClick} disabled={disabled}>
      <span className="font-semibold">{text}</span>
    </Button>
  );
};
