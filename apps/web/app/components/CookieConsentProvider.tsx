"use client";

import { CookieConsent } from "cookie-consent-react/CookieConsent";
import React, { useEffect, useState } from "react";
import { DEFAULT_COOKIE_CONSENT_STORAGE_KEY } from "../../../../packages/ui/src/constants";
import styles from "./CookieConsentProvider.module.css";

const storageKey = DEFAULT_COOKIE_CONSENT_STORAGE_KEY;

const exampleFunc_1 = () => {
  console.log(
    "This function should run everytime the page mounts if essential cookies are permitted.",
  );
};

const exampleFunc_2 = () => {
  console.log(
    "This function should run everytime the page mounts if analytic cookies are permitted.",
  );
};

const exampleFunc_3 = () => {
  console.log(
    "This function should run everytime the page mounts if marketing cookies are permitted.",
  );
};

export const CookieConsentProvider = () => {
  const [hasConsentValue, setHasConsentValue] = useState(false);

  const handleRemoveConsent = () => {
    localStorage.removeItem(storageKey);
    setHasConsentValue(false);
  };

  useEffect(() => {
    const value = localStorage.getItem(storageKey);
    setHasConsentValue(!!value);
  }, []);

  return (
    <div className={styles.cookieConsentProvider}>
      <CookieConsent
        mode="banner"
        modalIsOpen={!hasConsentValue}
        categoriesListStyle="checkboxes"
        handlerFunctions={[
          { category: "essential", function: exampleFunc_1 },
          { category: "analytics", function: exampleFunc_2 },
          { category: "marketing", function: exampleFunc_3 },
        ]}
        onAcceptAll={(accept) => {
          accept();
          setHasConsentValue(true);
        }}
        onAcceptSelection={(accept) => {
          accept();
          setHasConsentValue(true);
        }}
        onDeclineAll={(accept) => {
          accept();
          setHasConsentValue(true);
        }}
        privacyPolicyUrl="localhost:8000"
      />
      <div className={styles.buttonWrapper}>
        {hasConsentValue && (
          <button
            disabled={!hasConsentValue}
            className={styles.removeBtn}
            onClick={() => handleRemoveConsent()}
          >
            Remove consent
          </button>
        )}
      </div>
    </div>
  );
};
