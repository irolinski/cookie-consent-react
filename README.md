# cookie-consent-react

Customizable, localized cookie consent component for React.

Built for lightweight, flexible cookie consent management in React applications.

Fully typed with TypeScript support.

Compatible with Next.js and other React frameworks.

## Update: May 27, 2026

Version: 1.2.3

Changes:
- numerous visual bugs were resolved
- the prop 'modalIsOpen' has been renamed to 'componentIsOpen'
- the README has been updated; example gifs have been added
  

## Examples

<p align="center"> <img src="https://github.com/irolinski/cookie-consent-react/blob/v1.2.3/docs/assets/example_2.gif?raw=true" height="450">  <img src="https://github.com/irolinski/cookie-consent-react/blob/v1.2.3/docs/assets/example_1.gif?raw=true" height="450">  </p>


## Installation

```bash
npm install --save cookie-consent-react
```

or

```bash
yarn add cookie-consent-react
```

or

```bash
pnpm add cookie-consent-react
```

## Usage

Pass selected configuration and consent handlers into the component to configure cookie consent behavior.

```tsx
"use client";

import { CookieConsent } from "cookie-consent-react";

const analyticsHandler = () => {
  console.log("Analytics enabled");
};

const handleAcceptAll = () => {
  console.log("All cookies accepted");
};

const handleAcceptSelection = () => {
  console.log("Selected cookies accepted");
};

export default function CookieConsentProvider() {
  return (
    <CookieConsent
      mode="banner"
      categoriesListStyle="checkboxes"
      handlerFunctions={[
        {
          category: "analytics",
          function: analyticsHandler,
        },
      ]}
      onAcceptAll={(accept) => {
        handleAcceptAll();
        accept();
      }}
      onAcceptSelection={(accept) => {
        handleAcceptSelection();
        accept();
      }}
      privacyPolicyUrl="/privacy-policy"
    />
  );
}
```

## tags, snippets & handlerFunctions

The component includes four default cookie categories:

| Category | Description |
|---|---|
| **essential** | Required cookies necessary for application functionality. |
| **marketing** | Advertising, remarketing, and marketing-related cookies. |
| **analytics** | Analytics and performance tracking cookies. |
| **other** | Additional uncategorized cookies. |

All `tags`, `snippets`, and `handlerFunctions` must be assigned to one of these categories.

  ### tags
  
  Use `tags` for rendering React components after consent is granted for their assigned category.
  
  Example:
  
  ```tsx
  <CookieConsent
    mode="banner"
    tags={[
      {
        category: "marketing",
        tag: <GoogleTagManager gtmId="GTM-XXXXXXX" />,
      },
    ]}
  />
  ```

---

  ### snippets
  
  Use `snippets` for rendering raw JSX/HTML snippets after consent is granted for their assigned category.
  
  Example:
  
  ```tsx
  <CookieConsent
    mode="banner"
    snippets={[
      {
        category: "marketing",
        snippet: (
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{
              visibility: "hidden",
              display: "none",
            }}
          />
        ),
      },
    ]}
  />
  ```

---

  ### handlerFunctions
  
  Use `handlerFunctions` for runtime side effects and initialization logic after consent is granted for their assigned category.
  
  Handler functions execute:
  
  - whenever the component mounts and consent already exists
  - whenever consent preferences are updated and saved
  
  Example:
  
  ```tsx
  const analyticsHandler = () => {
    console.log("Analytics initialized");
  };
  
  <CookieConsent
    mode="banner"
    handlerFunctions={[
      {
        category: "analytics",
        function: analyticsHandler,
      },
    ]}
  />
  ```

## Documentation

| Prop | Type | Description | Default |
|---|---|---|---|
| **mode*** | `"modal"` \| `"banner"` | Determines component display mode. *Required. | — |
| **tags** | `{category: "essential" \| "marketing" \| "analytics" \| "other"; tag: JSX.Element }[]` | React components rendered after consent is granted for their category. | — |
| **snippets** | `{category: "essential" \| "marketing" \| "analytics" \| "other"; snippet: JSX.Element }[]` | Raw JSX/HTML snippets rendered after consent is granted for their category. | — |
| **handlerFunctions** | `{category: "essential" \| "marketing" \| "analytics" \| "other"; function: () => void }[]` | Runtime callbacks executed when consent exists or changes. | — |
| **categorySettings** | `{ [K in CookieConsentCategory]?: { required?: boolean; label?: string; } }` | Customize category labels and required categories. |`{ essential: { required: true } }`|
| **categoriesListStyle** | `"hide"` \| `"checkboxes"` \| `"switches"` | Determines how categories are displayed in the UI. | `"checkboxes"` |
| **onAcceptAll** | `(defaultHandler: () => void) => void` | Callback executed when all categories are accepted. | — |
| **onAcceptSelection** | `(defaultHandler: () => void) => void` | Callback executed when selected categories are saved. | — |
| **onDeclineAll** | `(defaultHandler: () => void) => void` | Callback executed when optional categories are declined. | — |
| **privacyPolicyUrl** | `string` | URL to the application's privacy policy. | — |
| **customStorageKey** | `string` | Custom storage key used for persisted consent data. | By default this value is empty; however a default key "cookie-consent" is used instead if this isn't defined. |
| **componentIsOpen** | `boolean` | Controls modal visibility. | Handled by boolean type internal state which is set to true on render if there aren't any saved settings in localStorage for current storageKey |
| **customColors** | `Partial<typeof { primary: "#0070f3", lightPrimary: "#eaeaea", lightSecondary: "#d0d0d0", textPrimary: "#333333", textSecondary: "#666666", background: "#ffffff", backgroundOff: "#f9f9f9", overlay: "rgba(0, 0, 0, 0.5)", shadow: "rgba(0, 0, 0, 0.15)" }>` | Override default component colors. | - |
| **customFontFamily** | `string` | Custom font family used throughout the component. | System font |
| **language** | ` "en" \| "de" \| "es" \| "fr" \| "it" \| "nl" \| "pt" \| "ja" \| "zh" \| "ar" \| "ru" \| "ko" \| "pl"\| string ` | Active localization language. | `"en"` |
| **customLocales** | `{  "en" \| "de" \| "es" \| "fr" \| "it" \| "nl" \| "pt" \| "ja" \| "zh" \| "ar" \| "ru" \| "ko" \| "pl"\| string : Partial<{ title: string; description: string; required: string; privacyPolicyInfo: string; privacyPolicy: string; acceptAll: string; SaveSelection: string; disableAll: string; cookiePreferences_show: string; cookiePreferences_hide: string; categories: string; essential: string; marketing: string; analytics: string; other: string; }> \| undefined; }` | Custom translation overrides. | — |

## Built-in Languages

Built-in translations are available for:

- English (`en`)
- German (`de`)
- Spanish (`es`)
- French (`fr`)
- Italian (`it`)
- Dutch (`nl`)
- Portuguese (`pt`)
- Japanese (`ja`)
- Chinese (`zh`)
- Arabic (`ar`)
- Russian (`ru`)
- Korean (`ko`)
- Polish (`pl`)

## Custom Localization

```tsx
<CookieConsent
  mode="banner"
  language="en"
  customLocales={{
    en: {
      title: "Custom Cookie Settings",
      acceptAll: "Allow Everything",
    },
  }}
/>
```

## Custom Category Settings

```tsx
<CookieConsent
  mode="banner"
  categorySettings={{
    essential: {
      required: true,
      label: "Required Cookies",
    },
    analytics: {
      label: "Analytics & Performance",
    },
  }}
/>
```

## Custom Styling

### Custom Colors

```tsx
<CookieConsent
  mode="banner"
  customColors={{
    primary: "#000000",
    background: "#ffffff",
  }}
/>
```

### Custom Font

```tsx
<CookieConsent
  mode="banner"
  customFontFamily="'Inter', sans-serif"
/>
```

## License

MIT
