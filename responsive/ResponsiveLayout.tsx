"use client"; // Marks this as a Client Component in Next.js

// Import the custom hook to access responsive context
import { useResponsive } from "./ResponsiveProvider";

/**
 * A layout component that conditionally renders children based on the current device type
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render conditionally
 * @param {string} props.device - The target device type for which children should be rendered
 * @returns {React.ReactNode|null} The children if device matches, otherwise null
 */
export default function ResponsiveLayout({
    children,
    device,
}: {
    children: React.ReactNode;
    device: string;
}) {
    // Get the current device type from responsive context
    const { deviceType } = useResponsive();
    
    // Only render children if the current device matches the target device
    if (deviceType !== device) return null;
    
    // Return children if device matches
    return children;
}