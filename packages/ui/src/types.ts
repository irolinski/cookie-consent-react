import { JSX } from "react";
import { CookieConsentDefaultTranslations } from "./locales";
import { DEFAULT_COOKIE_CATEGORIES } from "./constants";

export type CookieCategoryType = (typeof DEFAULT_COOKIE_CATEGORIES)[number];

export type CookieConsentObject = {
  category: CookieCategoryType;
};

export type CookieTagObject = CookieConsentObject & { tag: JSX.Element };

export type CookieSnippetObject = CookieConsentObject & {
  snippet: JSX.Element;
};

export type CookieHandlerFunctionObject = CookieConsentObject & {
  function: () => void;
};

export type CookieCategorySettings = {
  [K in CookieCategoryType]?: {
    required?: boolean;
    label?: string;
  };
};

export type CookieConsentMode = "modal" | "banner";

export type ColorsType = {
  primary: string;
  primaryLight: string;
  textPrimary: string;
  textSecondary: string;
  borderInput: string;
  background: string;
  backgroundOff: string;
  overlay: string;
  shadow: string;
};

export type CategoriesListStyleType = "hide" | "checkboxes" | "switches";

export type DefaultCookieConsentHandlersType = {
  acceptAll: () => void;
  acceptSelection: () => void;
  declineAll: () => void;
};

export type CustomCookieConsentHandlerType = (
  defaultHandler: () => void,
) => void;

export type CookieConsentLocales =
  (typeof CookieConsentDefaultTranslations)[keyof typeof CookieConsentDefaultTranslations];

export type CookieConsentProps = {
  mode: CookieConsentMode;
  tags?: CookieTagObject[];
  snippets?: CookieSnippetObject[];
  handlerFunctions?: CookieHandlerFunctionObject[];
  language?: CookieConsentAvailableLanguage;
  customLocales?: CookieConsentCustomTranslations;
  categorySettings?: CookieCategorySettings;
  categoriesListStyle?: CategoriesListStyleType;
  onAcceptAll?: CustomCookieConsentHandlerType;
  onAcceptSelection?: CustomCookieConsentHandlerType;
  onDeclineAll?: CustomCookieConsentHandlerType;
  privacyPolicyUrl?: string;
  customStorageKey?: string;
  modalIsOpen?: boolean | undefined;
  customColors?: {
    primary?: string;
    primaryLight?: string;
    textPrimary?: string;
    textSecondary?: string;
    borderInput?: string;
    borderInputHover?: string;
    background?: string;
    backgroundOff?: string;
    overlay?: string;
    shadow?: string;
  };
  customFontFamily?: string;
};

export type CookieConsentModalProps = Omit<CookieConsentProps, "mode">;

export type CookieConsentTranslations = {
  title: string;
  description: string;
  required: string;

  privacyPolicyInfo: string;
  privacyPolicy: string;

  acceptAll: string;
  saveSelection: string;
  disableAll: string;

  cookiePreferences_show: string;
  cookiePreferences_hide: string;

  categories: string;

  essential: string;
  marketing: string;
  analytics: string;
  other: string;
};

export type CookieConsentCustomTranslations =
  Partial<CookieConsentTranslations>;

export type CookieConsentAvailableLanguage =
  keyof typeof CookieConsentDefaultTranslations;
