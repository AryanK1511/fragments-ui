import React from 'react';
import { Card, CardFooter, Image } from '@nextui-org/react';

// ===== ADD FRAGMENT CARD COMPONENT =====
export const AddFragmentCard = ({ onOpen }) => {
  return (
    <div onClick={onOpen}>
      <Card className="border-none">
        <div className="flex justify-center items-center h-full">
          <Image alt="Plus Sign" className="" height={200} src="/images/plus.png" width={200} />
        </div>
        <CardFooter className="flex justify-center">
          <p className="text-lg text-center text-black">Create a fragment</p>
        </CardFooter>
      </Card>
    </div>
  );
};
