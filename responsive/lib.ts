// Importing the responsive configuration which contains device settings and default view
import config from "_/responsive.config";
// Importing UA parser library to detect device type from user agent string
import { UAParser } from "ua-parser-js";
// Importing cookie utilities to get and set cookies
import { getCookie, setCookie } from "cookies-next";

/**
 * Determines the device type from the user agent string
 * @param {string} userAgent - The user agent string from the browser
 * @returns {string} The matched device type from config or default view if no match found
 */
export const getDeviceTypeFromUserAgent = (userAgent: string) => {
    // Initialize UA parser with the user agent string
    const parser = new UAParser(userAgent);
    // Get device type from the parsed result (e.g., 'mobile', 'tablet', 'desktop')
    const deviceType = parser.getDevice().type;
    // Get all available device types from the config
    const availableDevices = Object.keys(config);

    // Find the first device in config that matches the detected device type
    const foundedAvailableDevice = availableDevices.find((device: string) => 
        device.toLowerCase().trim() === deviceType?.toLocaleLowerCase()?.trim()
    );
    
    // Return the matched device or fall back to default view from config
    return foundedAvailableDevice || config.defaultView;
};

/**
 * Stores the device type in a cookie for future reference
 * @param {string} deviceType - The device type to store in cookie
 */
export const setDeviceTypeCookie = (deviceType: string) => {
    // Set cookie using the key defined in config and the provided device type
    setCookie(config.responsiveCookieKey, deviceType);
};

/**
 * Retrieves the stored device type from cookie
 * @returns {string | undefined} The stored device type or undefined if not found
 */
export const getDeviceTypeCookie = () => {
    // Get cookie value using the key defined in config
    return getCookie(config.responsiveCookieKey);
};