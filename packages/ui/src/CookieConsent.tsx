"use client";

import React, { useEffect, useState } from "react";
import {
  CookieConsentDefaultTranslations,
  CookieConsentTranslations,
} from "./locales";
import {
  CookieConsentProps,
  CookieConsentObject,
  CookieCategoryType,
  CookieTagObject,
  CookieSnippetObject,
} from "./types";
import { DEFAULT_COOKIE_CONSENT_STORAGE_KEY } from "./constants";
import {
  CategoriesContainer,
  Category,
  CategoryHeader,
  CategoryInfo,
  CategoryName,
  CheckboxContainer,
  Checkmark,
  CookieConsentReactContainer,
  mergeColors,
  Modal,
  ModalHeader,
  Overlay,
  PrivacyPolicy,
  RequiredBadge,
  ResponsiveAcceptButton,
  ResponsiveActions,
  ResponsiveDisableButton,
  ResponsiveSaveButton,
  Slider,
  Switch,
} from "./styles";

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
  tags,
  snippets,
  handlerFunctions,
  language = "en",
  customLocales,
  categorySettings = { essential: { required: true } },
  categoriesList = "checkboxes",
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
  const colors = mergeColors(customColors);

  let locales = CookieConsentDefaultTranslations[language];
  if (customLocales) {
    locales = customLocales;
  }

  // PROP VALUE PROCESSING
  const passedCategories = getPassedCategories([
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

  const defaultAcceptAll = () => {
    handleSaveSettings([...passedCategories]);
  };

  const defaultAcceptSelection = () => {
    handleSaveSettings([...selectedCategories, ...requiredCategories]);
  };

  const defaultDeclineAll = () => {
    handleSaveSettings([]);
  };

  // useEffects
  useEffect(() => {
    const cookieConsentStoredValue = localStorage.getItem(storageKey);
    const newCookieSettings = cookieConsentStoredValue
      ? cookieConsentStoredValue.split(",")
      : undefined;

    setSavedCookieSettings(newCookieSettings);
  }, [customStorageKey, storageKey]);

  useEffect(() => {
    handlerFunctions?.forEach((handleFunctionObject) => {
      if (savedCookieSettings?.includes(handleFunctionObject.category))
        handleFunctionObject.function();
    });
  }, [handlerFunctions, savedCookieSettings]);

  useEffect(() => {
    if (modalIsOpen !== undefined) {
      if (!savedCookieSettings) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    } else {
      if (!savedCookieSettings) {
        setIsOpen(true);
      }
    }
  }, [savedCookieSettings, modalIsOpen]);

  // isOpen -- overwrite if prop exists
  const actualIsOpen = modalIsOpen !== undefined ? modalIsOpen : isOpen;

  return (
    <CookieConsentReactContainer $fontFamily={customFontFamily}>
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
        <Overlay $colors={colors}>
          <Modal $colors={colors}>
            <ModalHeader $colors={colors}>
              <h2>{locales.title}</h2>
              <p>{locales.description}</p>
            </ModalHeader>

            <CategoriesContainer>
              {passedCategories.map((category) => (
                <React.Fragment key={category}>
                  {categoriesList === "checkboxes" && (
                    <Category $colors={colors}>
                      <CategoryHeader $colors={colors}>
                        <CategoryInfo>
                          <CheckboxContainer>
                            <input
                              type="checkbox"
                              checked={
                                selectedCategories.includes(category) ||
                                requiredCategories.includes(category)
                              }
                              onChange={() =>
                                setSelectedCategories((prev) =>
                                  selectedCategories.includes(category)
                                    ? prev.filter((e) => e !== category)
                                    : [...prev, category],
                                )
                              }
                              disabled={
                                categorySettings[category] &&
                                categorySettings[category]?.required
                              }
                            />
                            <Checkmark
                              $colors={colors}
                              $isRequired={requiredCategories.includes(
                                category,
                              )}
                            >
                              <span>&#10003;</span>
                            </Checkmark>
                            <CategoryName $colors={colors}>
                              {categorySettings[category] &&
                              categorySettings[category]?.label
                                ? categorySettings[category]?.label
                                : locales[
                                    category as keyof CookieConsentTranslations
                                  ]}
                            </CategoryName>
                            {categorySettings[category] &&
                              categorySettings[category]?.required && (
                                <RequiredBadge $colors={colors}>
                                  {locales.required}
                                </RequiredBadge>
                              )}
                          </CheckboxContainer>
                        </CategoryInfo>
                      </CategoryHeader>
                    </Category>
                  )}
                  {categoriesList === "switches" && (
                    <Category $colors={colors}>
                      <CategoryHeader $colors={colors}>
                        <CategoryInfo>
                          <Switch>
                            <input
                              type="checkbox"
                              checked={
                                selectedCategories.includes(category) ||
                                requiredCategories.includes(category)
                              }
                              onChange={() =>
                                setSelectedCategories((prev) =>
                                  selectedCategories.includes(category)
                                    ? prev.filter((e) => e !== category)
                                    : [...prev, category],
                                )
                              }
                              disabled={
                                categorySettings[category] &&
                                categorySettings[category]?.required
                              }
                            />
                            <Slider
                              $isRequired={requiredCategories.includes(
                                category,
                              )}
                              $colors={colors}
                            />
                          </Switch>
                          <CategoryName $colors={colors}>
                            {categorySettings[category] &&
                            categorySettings[category]?.label
                              ? categorySettings[category]?.label
                              : locales[
                                  category as keyof CookieConsentTranslations
                                ]}
                          </CategoryName>
                          {categorySettings[category] &&
                            categorySettings[category]?.required && (
                              <RequiredBadge $colors={colors}>
                                {locales.required}
                              </RequiredBadge>
                            )}
                        </CategoryInfo>
                      </CategoryHeader>
                    </Category>
                  )}
                </React.Fragment>
              ))}
            </CategoriesContainer>

            {privacyPolicyUrl && (
              <PrivacyPolicy $colors={colors}>
                <p>
                  {locales.privacyPolicyInfo}{" "}
                  <a href={privacyPolicyUrl}>{locales.privacyPolicy}</a>.
                </p>
              </PrivacyPolicy>
            )}

            <ResponsiveActions>
              {selectedCategories.length || requiredCategories.length ? (
                <ResponsiveSaveButton
                  $colors={colors}
                  onClick={() =>
                    onAcceptSelection
                      ? onAcceptSelection(defaultAcceptSelection)
                      : defaultAcceptSelection()
                  }
                >
                  {locales.saveSelection}
                </ResponsiveSaveButton>
              ) : (
                <React.Fragment>
                  {requiredCategories.length === 0 && (
                    <ResponsiveDisableButton
                      $colors={colors}
                      onClick={() =>
                        onDeclineAll
                          ? onDeclineAll(defaultDeclineAll)
                          : defaultDeclineAll()
                      }
                    >
                      {locales.disableAll}
                    </ResponsiveDisableButton>
                  )}
                </React.Fragment>
              )}
              <ResponsiveAcceptButton
                $colors={colors}
                onClick={() =>
                  onAcceptAll
                    ? onAcceptAll(defaultAcceptAll)
                    : defaultAcceptAll()
                }
              >
                {locales.acceptAll}
              </ResponsiveAcceptButton>
            </ResponsiveActions>
          </Modal>
        </Overlay>
      ) : (
        <></>
      )}
    </CookieConsentReactContainer>
  );
};
