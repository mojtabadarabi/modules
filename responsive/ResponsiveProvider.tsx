"use client"; // Marks this as a Client Component in Next.js

import config from "_/responsive.config";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getDeviceTypeCookie, setDeviceTypeCookie } from "./lib";
import { ResponsiveDeviceStateT } from "./type";
import { createBooleanObjectByDeviceType, sortBreakpointsBySize } from "./utils";

// Get breakpoint configurations from the responsive config
const breakpoints = config.breakpoints;

// Create context for responsive device state with default values
const ResponsiveContext = createContext<ResponsiveDeviceStateT>({
    deviceType: config.defaultView,
});

/**
 * Provider component that manages responsive state and handles device type detection
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped by the provider
 * @param {string} [props.initialDeviceType=config.defaultView] - Initial device type (falls back to default from config)
 * @returns {React.ReactNode} Provider-wrapped children with responsive context
 */
export function ResponsiveProvider({
    children,
    initialDeviceType = config.defaultView,
}: {
    children: React.ReactNode;
    initialDeviceType?: string;
}) {
    // Ref to track if component is mounted (to avoid unnecessary initial updates)
    const isMounted = useRef<boolean>(false);

    // State to store responsive device information
    const [responsiveDeviceState, setResponsiveDeviceState] =
        useState<ResponsiveDeviceStateT>({
            deviceType: initialDeviceType,
        });

    /**
     * Helper function to update responsive state
     * @param {string} key - State property to update
     * @param {any} value - New value for the property
     */
    const changeResponsiveDeviceState = (key: string, value: any) => {
        setResponsiveDeviceState((prev) => {
            return { ...prev, [key]: value };
        });
    };

    /**
     * Determines device type based on current viewport width
     * @param {number} width - Current viewport width in pixels
     * @returns {string} Detected device type (e.g., 'mobile', 'tablet', 'desktop')
     */
    const getDeviceTypeByWidth = (width: number) => {
        // Sort breakpoints from smallest to largest
        const sorted = sortBreakpointsBySize(breakpoints);

        // Default to largest breakpoint (typically desktop)
        let deviceType = sorted[sorted.length - 1]?.[0] || "desktop";

        // Find the first breakpoint that matches the current width
        for (const [device, breakpoint] of sorted) {
            if (width < breakpoint) {
                deviceType = device;
                break;
            }
        }

        return deviceType;
    };

    /**
     * Handles window resize events and updates device type state accordingly
     */
    const handleResize = () => {
        // Get previously stored device type from cookie
        const cookieDeviceType = getDeviceTypeCookie();
        const currentWidth = window.innerWidth;

        // Determine current device type based on width
        const currentDeviceType = getDeviceTypeByWidth(currentWidth);

        // Update state if device type has changed
        if (currentDeviceType !== responsiveDeviceState.deviceType) {
            changeResponsiveDeviceState("deviceType", currentDeviceType);
        }

        // Update cookie if device type has changed
        if (cookieDeviceType !== currentDeviceType) {
            setDeviceTypeCookie(currentDeviceType);
        }
    };

    // Initial setup effect (runs once on mount)
    useEffect(() => {
        if (!isMounted.current) {
            handleResize(); // Initialize with current device type
            isMounted.current = true; // Mark as mounted
        }
    }, []);

    // Effect to add/remove resize event listener
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [responsiveDeviceState.deviceType]); // Re-run when device type changes

    return (
        <ResponsiveContext.Provider value={responsiveDeviceState}>
            {children}
        </ResponsiveContext.Provider>
    );
}

/**
 * Custom hook to access responsive context and device type utilities
 * @returns {Object} Responsive context value with additional boolean device flags
 * @throws {Error} If used outside of ResponsiveProvider
 */
export const useResponsive = () => {
    const responsiveContextValue = useContext(ResponsiveContext);
    
    // Ensure hook is used within a provider
    if (!responsiveContextValue) {
        throw new Error("useResponsive must be used within a ResponsiveProvider");
    }
    
    // Return context value merged with boolean device flags (e.g., isMobile, isTablet)
    return {
        ...responsiveContextValue,
        ...createBooleanObjectByDeviceType(responsiveContextValue.deviceType),
    };
};