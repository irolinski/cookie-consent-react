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
  const [hasConsent, setHasConsent] = useState(false);
  useEffect(() => {
    const value = localStorage.getItem(storageKey);
    setHasConsent(!!value);
  }, []);

  const handleRemoveConsent = () => {
    localStorage.removeItem(storageKey);
    setHasConsent(false);
  };

  return (
    <div className={styles.cookieConsentProvider}>
      <CookieConsent
        modalIsOpen={false}
        categoriesList="checkboxes"
        handlerFunctions={[
          { category: "essential", function: () => exampleFunc },
          { category: "analytics", function: () => exampleFunc },
        ]}
      />
      <div className={styles.buttonWrapper}>
        <button
          disabled={!hasConsent}
          className={styles.removeBtn}
          onClick={handleRemoveConsent}
        >
          Remove consent
        </button>
      </div>
    </div>
  );
};
