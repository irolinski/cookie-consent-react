# cookie-consent-react

Customizable cookie consent component for React.

Built for lightweight, flexible consent management in React applications.

Includes banner and modal modes. Supports consent categories, localization, custom theming, runtime handlers, and React/HTML-based third-party integrations.

Fully typed with TypeScript support.

Compatible with Next.js and other React frameworks.

## Update: May 24, 2026

Version: 1.2.1

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

---

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
| **mode** | `"modal"` \| `"banner"` | Determines component display mode. | — |
| **tags** | `CookieTagObject[]` | React components rendered after consent is granted for their category. | — |
| **snippets** | `CookieSnippetObject[]` | Raw JSX/HTML snippets rendered after consent is granted for their category. | — |
| **handlerFunctions** | `CookieHandlerFunctionObject[]` | Runtime callbacks executed when consent exists or changes. | — |
| **categorySettings** | `CookieCategorySettings` | Customize category labels and required categories. | — |
| **categoriesListStyle** | `"hide"` \| `"checkboxes"` \| `"switches"` | Determines how categories are displayed in the UI. | `"switches"` |
| **onAcceptAll** | `(defaultHandler: () => void) => void` | Callback executed when all categories are accepted. | — |
| **onAcceptSelection** | `(defaultHandler: () => void) => void` | Callback executed when selected categories are saved. | — |
| **onDeclineAll** | `(defaultHandler: () => void) => void` | Callback executed when optional categories are declined. | — |
| **privacyPolicyUrl** | `string` | URL to the application's privacy policy. | — |
| **customStorageKey** | `string` | Custom storage key used for persisted consent data. | Internal default key |
| **modalIsOpen** | `boolean` | Controls modal visibility. | Internal state |
| **customColors** | `Partial<typeof DEFAULT_COLORS>` | Override default component colors. | Default theme |
| **customFontFamily** | `string` | Custom font family used throughout the component. | System font |
| **language** | `CookieConsentAvailableLanguage \| string` | Active localization language. | `"en"` |
| **customLocales** | `CookieConsentCustomTranslations` | Custom translation overrides. | — |

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
