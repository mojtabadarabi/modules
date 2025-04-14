import config from "_/responsive.config";

/**
 * Creates a boolean object indicating whether the current device matches each breakpoint type
 * @param {string} deviceType - The current device type (e.g., 'mobile', 'tablet', 'desktop')
 * @returns {Record<string, boolean>} An object with boolean flags for each device type (e.g., { is_mobile: true, is_tablet: false })
 * 
 * @example
 * // Returns { is_mobile: true, is_tablet: false, is_desktop: false }
 * createBooleanObjectByDeviceType('mobile')
 */
export const createBooleanObjectByDeviceType = (deviceType: string) => {
    // Get all breakpoint keys from config (e.g., ['mobile', 'tablet', 'desktop'])
    const objectKeys = Object.keys(config.breakpoints);

    // Initialize empty object to store boolean flags
    let createdObject: Record<string, boolean> = {};

    // Create boolean properties for each device type
    objectKeys.forEach((key) => {
        createdObject[`is_${key}`] = deviceType === key;
    });

    return createdObject;
};

/**
 * Sorts breakpoints by their pixel values in ascending order
 * @param {Record<string, number>} bps - Breakpoints object { [deviceType]: pixelValue }
 * @returns {Array<[string, number]>} Sorted array of [deviceType, breakpoint] tuples
 * 
 * @example
 * // Returns [['mobile', 480], ['tablet', 768], ['desktop', 1024]]
 * sortBreakpointsBySize({ mobile: 480, desktop: 1024, tablet: 768 })
 */
export const sortBreakpointsBySize = (bps: Record<string, number>) =>
    Object.entries(bps).sort(([, a], [, b]) => a - b);