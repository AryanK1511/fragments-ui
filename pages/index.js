import React, { useState, useEffect } from "react";
import { CustomButton } from "@/components/CustomButton/CustomButton";

// ===== HOME PAGE =====
export default function Home() {
  // Define state to check whether user is logged in or not
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  return (
    <div className="p-20">
      <h1 className="text-6xl font-semibold">Fragments UI</h1>
      <div className="space-x-4 my-12"> 
        <CustomButton text="Login" variant="solid" />
        <CustomButton text="Logout" variant="outline" />
      </div>
      {
        isLoggedIn ?
        <p>User is logged in.</p>
        :
        <p>User is logged out</p>
      }
    </div>
  );
}
