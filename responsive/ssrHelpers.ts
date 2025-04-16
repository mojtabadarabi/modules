import responsiveConfig from "_/responsive.config";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { getDeviceTypeFromUserAgent } from "./lib";

/**
 * Extracts and validates the user agent string from request headers
 * @returns {string} The user agent string
 * @throws {Error} If user agent header is not found
 */
export const getUserAgent = async() => {
    const userAgent = (await headers()).get('user-agent');

    if (!userAgent) throw new Error('user agent is not defined');
    return userAgent;
};

/**
 * Checks for existing device type cookie and sets it if not present
 * @param {Object} params - Function parameters
 * @param {NextResponse} params.response - The Next.js response object for cookie operations
 */
export const checkAndSetDeviceType = async({ response }: { response: NextResponse }) => {
    const cookieIsMobile = getDeviceTypeCookie();

    // Only set cookie if it doesn't already exist
    if (cookieIsMobile === undefined) {
        setDeviceTypeCookie(
            response, 
            getDeviceTypeFromUserAgent(await getUserAgent())
        );
    }
};

/**
 * Retrieves the device type from cookies
 * @returns {string|undefined} The stored device type or undefined if not found
 */
export const getDeviceTypeCookie = async() => {
    return (await cookies()).get(responsiveConfig.responsiveCookieKey)?.value;
};

/**
 * Sets the device type in a cookie
 * @param {NextResponse} response - Next.js response object
 * @param {string} deviceType - The device type to store
 * @returns {NextResponse} The modified response object with cookie set
 */
export const setDeviceTypeCookie = (response: NextResponse, deviceType: string) => {
    return response.cookies.set(
        responsiveConfig.responsiveCookieKey, 
        String(deviceType)
    );
};

/**
 * Determines the initial device type by checking cookie first, then falling back to user agent detection
 * @returns {string} The detected device type
 */
export const getInitialDeviceType = async() => {
    const userAgent = await getUserAgent()
    return await getDeviceTypeCookie() || getDeviceTypeFromUserAgent(userAgent) || responsiveConfig.defaultView;
};