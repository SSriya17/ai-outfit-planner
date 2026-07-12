export type TemperatureUnit = "celsius" | "fahrenheit";
export interface Settings { readonly temperatureUnit: TemperatureUnit; readonly notificationsEnabled: boolean; readonly theme: "system"; }
