"use client";

import { CookieConsent } from "cookie-consent-react/CookieConsent";
import React, { useEffect, useState } from "react";
import { DEFAULT_COOKIE_CONSENT_STORAGE_KEY } from "../../../../packages/ui/src/constants";
import styles from "./CookieConsentProvider.module.css";

const storageKey = DEFAULT_COOKIE_CONSENT_STORAGE_KEY;

const exampleFunc = () => {
  console.log("this function should run everytime the page mounts");
};

export const CookieConsentProvider = () => {
  const [hasConsentValue, setHasConsentValue] = useState(false);
  useEffect(() => {
    const value = localStorage.getItem(storageKey);
    setHasConsentValue(!!value);
  }, []);

  const handleRemoveConsent = () => {
    localStorage.removeItem(storageKey);
    setHasConsentValue(false);
  };

  return (
    <div className={styles.cookieConsentProvider}>
      <CookieConsent
        mode="banner"
        modalIsOpen={!hasConsentValue}
        categoriesList="checkboxes"
        handlerFunctions={[
          { category: "essential", function: () => exampleFunc },
          { category: "analytics", function: () => exampleFunc },
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
