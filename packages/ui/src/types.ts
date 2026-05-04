import { JSX } from "react";
import {
  CookieConsentAvailableLanguage,
  CookieConsentDefaultTranslations,
  CookieConsentTranslations,
} from "./locales";
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

export type CategoriesListType = "hide" | "checkboxes" | "switches";

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
  customLocales?: CookieConsentTranslations;
  categorySettings?: CookieCategorySettings;
  categoriesList?: CategoriesListType;
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
