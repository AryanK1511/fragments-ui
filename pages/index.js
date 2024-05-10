import React from "react";
import { CustomButton } from "@/components/CustomButton/CustomButton";

export default function Home() {
  return (
    <div className="p-20">
      <h1 className="text-6xl font-semibold">Fragments UI</h1>
      <div className="space-x-4 mt-12"> 
        <CustomButton text="Login" variant="solid" />
        <CustomButton text="Logout" variant="outline" />
      </div>
    </div>
  );
}
