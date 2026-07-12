export type TemperatureUnit = "celsius" | "fahrenheit";
export type ClimatePreference = "Cool" | "Temperate" | "Warm";
export interface Settings { readonly temperatureUnit: TemperatureUnit; readonly notificationsEnabled: boolean; readonly theme: "system"; readonly climate: ClimatePreference; }
