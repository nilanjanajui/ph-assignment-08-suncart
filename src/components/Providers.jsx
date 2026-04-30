"use client";

import { RouterProvider } from "@heroui/react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
    return (
        <RouterProvider>
            <Toaster position="top-center" />
            {children}
        </RouterProvider>
    );
}