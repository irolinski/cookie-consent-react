import { JSX } from "react";
import { CookieConsentDefaultTranslations } from "./locales";
import { DEFAULT_COLORS, DEFAULT_COOKIE_CATEGORIES } from "./constants";

export type CookieConsentCategory = (typeof DEFAULT_COOKIE_CATEGORIES)[number];

export type CookieConsentObject = {
  category: CookieConsentCategory;
};

export type CookieConsentTagObject = CookieConsentObject & { tag: JSX.Element };

export type CookieConsentSnippetObject = CookieConsentObject & {
  snippet: JSX.Element;
};

export type CookieConsentHandlerFunctionObject = CookieConsentObject & {
  function: () => void;
};

export type CookieConsentCategorySettings = {
  [K in CookieConsentCategory]?: {
    required?: boolean;
    label?: string;
  };
};

export type CookieConsentMode = "modal" | "banner";

export type CookieConsentColors = {
  primary: string;
  lightPrimary: string;
  lightSecondary: string;
  textPrimary: string;
  textSecondary: string;
  background: string;
  backgroundOff: string;
  overlay: string;
  shadow: string;
};

export type CookieConsentCategoriesListStyleType =
  | "hide"
  | "checkboxes"
  | "switches";

export type CookieConsentDefaultHandlers = {
  acceptAll: () => void;
  acceptSelection: () => void;
  declineAll: () => void;
};

export type CookieConsentCustomHandlerType = (
  defaultHandler: () => void,
) => void;

export type CookieConsentLocales =
  (typeof CookieConsentDefaultTranslations)[keyof typeof CookieConsentDefaultTranslations];

type CookieConsentBaseProps = {
  mode: CookieConsentMode;
  tags?: CookieConsentTagObject[];
  snippets?: CookieConsentSnippetObject[];
  handlerFunctions?: CookieConsentHandlerFunctionObject[];
  categorySettings?: CookieConsentCategorySettings;
  categoriesListStyle?: CookieConsentCategoriesListStyleType;
  onAcceptAll?: CookieConsentCustomHandlerType;
  onAcceptSelection?: CookieConsentCustomHandlerType;
  onDeclineAll?: CookieConsentCustomHandlerType;
  privacyPolicyUrl?: string;
  customStorageKey?: string;
  modalIsOpen?: boolean | undefined;
  customColors?: Partial<typeof DEFAULT_COLORS>;
  customFontFamily?: string;
};

type CookieConsentDefaultLocalesProps = CookieConsentBaseProps & {
  language?: CookieConsentAvailableLanguage;
  customLocales?: never;
};

type CookieConsentCustomLocalesProps = CookieConsentBaseProps & {
  language?: string;
  customLocales: CookieConsentCustomTranslations;
};

// made this a union type to handle passing a
// non-forseen language string after passing custom locales
export type CookieConsentProps =
  | CookieConsentDefaultLocalesProps
  | CookieConsentCustomLocalesProps;

export type CookieConsentModalProps = Omit<CookieConsentProps, "mode">;

export type CookieConsentTranslationObject = {
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

export type CookieConsentCustomTranslations = Partial<
  Record<
    CookieConsentAvailableLanguage | string,
    Partial<CookieConsentTranslationObject>
  >
>;

export type CookieConsentAvailableLanguage =
  keyof typeof CookieConsentDefaultTranslations;
