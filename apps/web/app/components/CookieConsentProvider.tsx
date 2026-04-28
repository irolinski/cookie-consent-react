"use client";

import { CookieConsent } from "@repo/ui/CookieConsent";

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
