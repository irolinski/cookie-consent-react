import { CookieConsentAvailableLanguage } from "./types";

export const DEFAULT_COOKIE_CONSENT_STORAGE_KEY = "cookie-consent";

export const DEFAULT_LANGUAGE: CookieConsentAvailableLanguage = "en";

export const DEFAULT_COOKIE_CATEGORIES = [
  "essential",
  "marketing",
  "analytics",
  "other",
] as const;

export const DEFAULT_COLORS = {
  primary: "#0070f3",
  lightPrimary: "#eaeaea",
  lightSecondary: "#d0d0d0",
  textPrimary: "#333333",
  textSecondary: "#666666",
  background: "#ffffff",
  backgroundOff: "#f9f9f9",
  overlay: "rgba(0, 0, 0, 0.5)",
  shadow: "rgba(0, 0, 0, 0.15)",
};
