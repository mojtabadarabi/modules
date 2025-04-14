export interface ResponsiveConfig {
    responsiveCookieKey: string
    breakpoints: Record<string, number>
    defaultView: string
}

export interface ResponsiveDeviceStateT{
    deviceType:string
}