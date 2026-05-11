"use client";

import React, { useEffect, useState } from "react";
import { CookieConsentDefaultTranslations } from "./locales";
import {
  CookieConsentProps,
  CookieConsentObject,
  CookieCategoryType,
  CookieTagObject,
  CookieSnippetObject,
  ColorsType,
  DefaultCookieConsentHandlersType,
  CookieConsentCustomTranslations,
} from "./types";
import { DEFAULT_COOKIE_CONSENT_STORAGE_KEY } from "./constants";
import { CookieConsentReactContainer, mergeColors } from "./styles";
import { CookieConsentModal } from "./components/CookieConsentModal";
import { CookieConsentBanner } from "./components/CookieConsentBanner";

const getPassedCategories = (
  allCookieObjects: (CookieConsentObject[] | undefined)[],
) => {
  const passedCategories: CookieCategoryType[] = [];

  const passedCookieObjects: CookieConsentObject[][] = [];
  allCookieObjects.forEach((cookieObject) => {
    if (Array.isArray(cookieObject) && cookieObject) {
      passedCookieObjects.push(cookieObject);
    }
  });

  passedCookieObjects.forEach((objType) => {
    objType?.forEach((cookieObject) => {
      if (!passedCategories.includes(cookieObject.category)) {
        passedCategories.push(cookieObject.category);
      }
    });
  });

  return passedCategories;
};

export const CookieConsent = ({
  mode,
  tags,
  snippets,
  handlerFunctions,
  language = "en",
  customLocales,
  categorySettings = { essential: { required: true } },
  categoriesListStyle = "checkboxes",
  onAcceptAll,
  onAcceptSelection,
  onDeclineAll,
  privacyPolicyUrl,
  customStorageKey,
  modalIsOpen = undefined,
  customColors,
  customFontFamily,
}: CookieConsentProps) => {
  // COMPONENT STATE
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<
    CookieConsentObject["category"][]
  >([]);
  const [savedCookieSettings, setSavedCookieSettings] = useState<
    string[] | undefined
  >();

  // CUSTOM/DEFAULT VARIABLES
  const storageKey = customStorageKey ?? DEFAULT_COOKIE_CONSENT_STORAGE_KEY;
  const colors: ColorsType = mergeColors(customColors);

  // PROP VALUE PROCESSING
  const passedCategories: CookieCategoryType[] = getPassedCategories([
    tags,
    snippets,
    handlerFunctions,
  ]);

  const requiredCategories = passedCategories.filter(
    (category) => categorySettings[category]?.required,
  );

  // HANDLER FUNCTIONS
  const handleSaveSettings = (
    categories: CookieConsentObject["category"][] | [],
  ) => {
    const newSavedSettings = categories.join(",");
    localStorage.setItem(storageKey, newSavedSettings);
    setSavedCookieSettings(categories);
  };

  const defaultHandlers: DefaultCookieConsentHandlersType = {
    acceptAll: () => {
      handleSaveSettings([...passedCategories]);
    },
    acceptSelection: () => {
      handleSaveSettings([...selectedCategories, ...requiredCategories]);
    },
    declineAll: () => {
      handleSaveSettings([]);
    },
  };

  // USE-EFFECTS

  //get saved settings
  useEffect(() => {
    const cookieConsentStoredValue = localStorage.getItem(storageKey);
    const newCookieSettings = cookieConsentStoredValue
      ? cookieConsentStoredValue.split(",")
      : undefined;

    setSavedCookieSettings(newCookieSettings);
  }, [customStorageKey, storageKey]);

  //run passed handler functions
  useEffect(() => {
    handlerFunctions?.forEach((handleFunctionObject) => {
      if (savedCookieSettings?.includes(handleFunctionObject.category))
        handleFunctionObject.function();
    });
  }, [handlerFunctions, savedCookieSettings]);

  //auto-open/close component based on saved data
  useEffect(() => {
    if (modalIsOpen !== undefined) {
      return;
    } else {
      if (Array.isArray(savedCookieSettings)) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    }
  }, [savedCookieSettings, modalIsOpen]);

  // handle locales
  let locales = CookieConsentDefaultTranslations[language];
  if (customLocales) {
    const newLocalesObj = { ...locales };
    (
      Object.keys(customLocales) as Array<keyof CookieConsentCustomTranslations>
    ).forEach((key) => {
      if (customLocales[key]) {
        newLocalesObj[key] = customLocales[key];
      }
    });
    locales = newLocalesObj;
  }

  // isOpen -- overwrite if prop exists
  const actualIsOpen = modalIsOpen !== undefined ? modalIsOpen : isOpen;

  return (
    <CookieConsentReactContainer
      $fontFamily={customFontFamily}
      className="cookie-consent-react"
    >
      {savedCookieSettings !== undefined && (
        <React.Fragment>
          {tags &&
            tags.map((tag: CookieTagObject, indexNum: number) => {
              if (savedCookieSettings.includes(tag.category))
                return (
                  <React.Fragment key={indexNum}>{tag.tag}</React.Fragment>
                );
              return null;
            })}
          {snippets &&
            snippets.map((snippet: CookieSnippetObject, indexNum: number) => {
              if (savedCookieSettings.includes(snippet.category))
                return (
                  <React.Fragment key={indexNum}>
                    {snippet.snippet}
                  </React.Fragment>
                );
              return null;
            })}
        </React.Fragment>
      )}
      {actualIsOpen ? (
        <React.Fragment>
          {mode === "modal" && (
            <CookieConsentModal
              colors={colors}
              locales={locales}
              passedCategories={passedCategories}
              categoriesListStyle={categoriesListStyle}
              selectedCategories={selectedCategories}
              requiredCategories={requiredCategories}
              categorySettings={categorySettings}
              setSelectedCategories={setSelectedCategories}
              privacyPolicyUrl={privacyPolicyUrl}
              onAcceptAll={onAcceptAll}
              onAcceptSelection={onAcceptSelection}
              onDeclineAll={onDeclineAll}
              defaultHandlers={defaultHandlers}
            />
          )}
          {mode === "banner" && (
            <CookieConsentBanner
              colors={colors}
              locales={locales}
              passedCategories={passedCategories}
              categoriesListStyle={categoriesListStyle}
              selectedCategories={selectedCategories}
              requiredCategories={requiredCategories}
              categorySettings={categorySettings}
              setSelectedCategories={setSelectedCategories}
              privacyPolicyUrl={privacyPolicyUrl}
              onAcceptAll={onAcceptAll}
              onAcceptSelection={onAcceptSelection}
              onDeclineAll={onDeclineAll}
              defaultHandlers={defaultHandlers}
            />
          )}
        </React.Fragment>
      ) : (
        <></>
      )}
    </CookieConsentReactContainer>
  );
};
