import React from "react";
import { Button } from "@radix-ui/themes";

// ===== CUSTOM BUTTON COMPONENT =====
export const CustomButton = ({ text, variant }) => {
    return (
        <Button variant={variant} size="3">
            <span className="font-semibold">{ text }</span>
        </Button>
    );
}