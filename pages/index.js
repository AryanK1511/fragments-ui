import React, { useState, useEffect } from "react";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import {
  signInWithRedirect
} from 'aws-amplify/auth';
import { signOut } from 'aws-amplify/auth';
import { useStyleRegistry } from "styled-jsx";

// ===== HOME PAGE =====
export default function Home() {
  // Define state to check whether user is logged in or not
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [testState, setTestState] = useState(null)

  useEffect(() => {
    console.log(testState);
  }, [testState]);

  // Handles user login and logout
  const handleButtonClick = async (action) => {
    if (action.toLowerCase() === "login") {
      let result = await signInWithRedirect();
      setTestState(result);
    } else if (action.toLowerCase() === "logout") {
      await signOut();
    }
  }

  return (
    <div className="p-20">
      <h1 className="text-6xl font-semibold">Fragments UI</h1>
      <div className="space-x-4 my-12"> 
        <CustomButton text="Login" variant="solid" onClick={() => handleButtonClick("Login")} />
        <CustomButton text="Logout" variant="outline" onClick={() => handleButtonClick("Logout")} />
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
