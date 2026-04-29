"use client";

import { CookieConsent } from "cookie-consent-react";

const exampleFunc = () => {
  console.log("this function should run everytime");
};

export const CookieConsentProvider = () => {
  return (
    <CookieConsent
      modalIsOpen={true}
      handlerFunctions={[
        { category: "essential", function: exampleFunc },
        { category: "analytics", function: exampleFunc },
      ]}
      categoriesList="switches"
    />
  );
};
