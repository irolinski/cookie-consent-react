import { JSX } from "react";
import { CookieConsentDefaultTranslations } from "./locales";
import { DEFAULT_COLORS, DEFAULT_COOKIE_CATEGORIES } from "./constants";

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
  lightPrimary: string;
  lightSecondary: string;
  textPrimary: string;
  textSecondary: string;
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

type CookieConsentBaseProps = {
  mode: CookieConsentMode;
  tags?: CookieTagObject[];
  snippets?: CookieSnippetObject[];
  handlerFunctions?: CookieHandlerFunctionObject[];
  categorySettings?: CookieCategorySettings;
  categoriesListStyle?: CategoriesListStyleType;
  onAcceptAll?: CustomCookieConsentHandlerType;
  onAcceptSelection?: CustomCookieConsentHandlerType;
  onDeclineAll?: CustomCookieConsentHandlerType;
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

//make this a type of an object that contains a set of undefined or CookieConsentAvailableLanguage keys and Partial<CookieConsentTranslations> values;
// export type CookieConsentCustomLocales =

export type CookieConsentCustomTranslations = Partial<
  Record<
    CookieConsentAvailableLanguage | string,
    Partial<CookieConsentTranslationObject>
  >
>;

export type CookieConsentAvailableLanguage =
  keyof typeof CookieConsentDefaultTranslations;
