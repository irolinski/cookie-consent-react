import { JSX } from "react";
import {
  CookieConsentAvailableLanguage,
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

export type CookieConsentProps = {
  tags?: CookieTagObject[];
  snippets?: CookieSnippetObject[];
  handlerFunctions?: CookieHandlerFunctionObject[];
  language?: CookieConsentAvailableLanguage;
  customLocales?: CookieConsentTranslations;
  categorySettings?: CookieCategorySettings;
  categoriesList?: "hide" | "checkboxes" | "switches";
  onAcceptAll?: (defaultHandler: () => void) => void;
  onAcceptSelection?: (defaultHandler: () => void) => void;
  onDeclineAll?: (defaultHandler: () => void) => void;
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
