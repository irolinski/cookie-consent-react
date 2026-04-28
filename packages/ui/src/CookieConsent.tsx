"use client";

import React, { JSX, useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Color system
const COLORS = {
  primary: "#0070f3",
  primaryDark: "#005cc5",
  primaryLight: "#e6f7ff",
  textPrimary: "#333333",
  textSecondary: "#666666",
  textLight: "#999999",
  border: "#eaeaea",
  borderLight: "#f0f0f0",
  borderInput: "#d0d0d0",
  borderInputHover: "#b3b3b3",
  background: "#ffffff",
  backgroundOff: "#f9f9f9",
  backgroundHover: "#f5f5f5",
  backgroundDisabled: "#f0f0f0",
  overlay: "rgba(0, 0, 0, 0.5)",
  shadow: "rgba(0, 0, 0, 0.15)",
};

// Styled Components
const Overlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background-color: ${COLORS.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 12px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Modal = styled.div`
  background-color: ${COLORS.background};
  border-radius: 8px;
  box-shadow: 0 4px 20px ${COLORS.shadow};
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 16px;
  animation: ${slideUp} 0.3s ease-out;
`;

const ModalHeader = styled.div`
  margin-bottom: 12px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: ${COLORS.textPrimary};
    margin: 0 0 8px 0;
  }

  p {
    font-size: 13px;
    line-height: 1.4;
    color: ${COLORS.textSecondary};
    margin: 0;
  }
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

const Category = styled.div`
  border: 1px solid ${COLORS.border};
  border-radius: 6px;
  overflow: hidden;
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background-color: ${COLORS.backgroundOff};
`;

const CategoryInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CategoryName = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: ${COLORS.textPrimary};
  margin-left: 8px;
`;

const RequiredBadge = styled.span`
  display: inline-block;
  background-color: ${COLORS.primaryLight};
  color: ${COLORS.primary};
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 10px;
  margin-left: 8px;
`;

const PrivacyPolicy = styled.div`
  margin-bottom: 12px;
  font-size: 12px;
  color: ${COLORS.textSecondary};

  a {
    color: ${COLORS.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  animation: ${fadeIn} 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) 0.15s both;
`;

const buttonFadeIn = css`
  opacity: 0;
  animation: ${fadeIn} 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
`;

const AcceptButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${COLORS.primary};
  color: ${COLORS.background};
  border: 1px solid rgba(0, 0, 0, 0);
  ${buttonFadeIn}
  animation-delay: 0.15s;

  &:hover {
    background-color: ${COLORS.primaryDark};
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 112, 243, 0.2);
  }
`;

const DisableButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${COLORS.background};
  color: ${COLORS.textPrimary};
  border: 1px solid ${COLORS.borderInput};
  ${buttonFadeIn}
  animation-delay: 0.25s;

  &:hover {
    background-color: ${COLORS.backgroundHover};
    transform: translateY(-1px);
  }
`;

const SaveButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${COLORS.background};
  color: ${COLORS.primary};
  border: 1px solid ${COLORS.primary};
  ${buttonFadeIn}
  animation-delay: 0.35s;

  &:hover {
    background-color: ${COLORS.backgroundHover};
    transform: translateY(-1px);
  }
`;

// Checkbox styling
const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
`;

const Checkmark = styled.span<{ isService?: boolean }>`
  position: relative;
  height: ${(props) => (props.isService ? "14px" : "18px")};
  width: ${(props) => (props.isService ? "14px" : "18px")};
  background-color: ${COLORS.background};
  border: 2px solid ${COLORS.borderInput};
  border-radius: 4px;

  ${CheckboxContainer}:hover input ~ & {
    border-color: ${COLORS.borderInputHover};
  }

  ${CheckboxContainer} input:checked ~ & {
    background-color: ${COLORS.primary};
    border-color: ${COLORS.primary};
  }

  &:after {
    content: "";
    position: absolute;
    display: none;
  }

  ${CheckboxContainer} input:checked ~ &:after {
    display: block;
  }

  &:after {
    left: ${(props) => (props.isService ? "4px" : "5px")};
    top: ${(props) => (props.isService ? "1px" : "2px")};
    width: ${(props) => (props.isService ? "4px" : "5px")};
    height: ${(props) => (props.isService ? "7px" : "9px")};
    border: solid ${COLORS.background};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  ${CheckboxContainer} input:disabled ~ & {
    background-color: ${COLORS.backgroundDisabled};
    border-color: ${COLORS.borderInput};
    cursor: not-allowed;
  }

  ${CheckboxContainer} input:disabled ~ &:after {
    border-color: ${COLORS.textLight};
  }
`;

// Switch styling
const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 20px;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + & {
    background-color: #2196f3;
  }

  input:focus + & {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + &:before {
    transform: translateX(16px);
  }
`;

// Responsive styles
const ResponsiveActions = styled(Actions)`
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const ResponsiveAcceptButton = styled(AcceptButton)`
  @media (max-width: 640px) {
    width: 100%;
  }
`;

const ResponsiveDisableButton = styled(DisableButton)`
  @media (max-width: 640px) {
    width: 100%;
  }
`;

const ResponsiveSaveButton = styled(SaveButton)`
  @media (max-width: 640px) {
    width: 100%;
  }
`;

// Types from original
const DEFAULT_COOKIE_CONSENT_STORAGE_KEY = "cookie-consent";
const COOKIE_CATEGORIES = [
  "essential",
  "marketing",
  "analytics",
  "other",
] as const;

type CookieCategoryType = (typeof COOKIE_CATEGORIES)[number];

type CookieConsentObject = {
  category: CookieCategoryType;
};

type CookieTagObject = CookieConsentObject & { tag: JSX.Element };

type CookieSnippetObject = CookieConsentObject & {
  snippet: JSX.Element;
};

type CookieHandlerFunctionObject = CookieConsentObject & {
  function: () => void;
};

type CookieCategorySettings = {
  [K in CookieCategoryType]?: {
    required?: boolean;
    label?: string;
  };
};

type CookieConsentAvailableLanguage = string;

type CookieConsentTranslations = {
  title: string;
  description: string;
  essential: string;
  marketing: string;
  analytics: string;
  other: string;
  required: string;
  privacyPolicyInfo: string;
  privacyPolicy: string;
  saveSelection: string;
  disableAll: string;
  acceptAll: string;
};

const CookieConsentDefaultTranslations: Record<
  string,
  CookieConsentTranslations
> = {
  en: {
    title: "Cookie Preferences",
    description:
      "We use cookies to enhance your experience. Select which cookies you want to allow.",
    essential: "Essential",
    marketing: "Marketing",
    analytics: "Analytics",
    other: "Other",
    required: "Required",
    privacyPolicyInfo: "For more information, please read our",
    privacyPolicy: "Privacy Policy",
    saveSelection: "Save Selection",
    disableAll: "Disable All",
    acceptAll: "Accept All",
  },
};

type CookieConsentProps = {
  tags?: CookieTagObject[];
  snippets?: CookieSnippetObject[];
  handlerFunctions?: CookieHandlerFunctionObject[];
  language?: CookieConsentAvailableLanguage;
  customLocales?: CookieConsentTranslations;
  categorySettings?: CookieCategorySettings;
  categoriesList?: "hide" | "checkboxes" | "switches";
  onAcceptAll?: (defaultHandler: () => void) => void;
  onAcceptSelection?: (defaultHandler: () => void) => void;
  onDeclineAll?: (defaultHandler: () => void) => void;
  privacyPolicyUrl?: string;
  customStorageKey?: string;
  modalIsOpen?: boolean | undefined;
};

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
}: CookieConsentProps) => {
  let [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<
    CookieConsentObject["category"][]
  >([]);
  const [savedCookieSettings, setSavedCookieSettings] = useState<
    string[] | undefined
  >();

  if (modalIsOpen !== undefined) {
    // Note: This doesn't actually control isOpen properly in the original
    // Keeping original behavior
  }

  const storageKey = customStorageKey ?? DEFAULT_COOKIE_CONSENT_STORAGE_KEY;

  let locales = CookieConsentDefaultTranslations[language];
  if (customLocales) {
    locales = customLocales;
  }

  useEffect(() => {
    const cookieConsentStoredValue = localStorage.getItem(storageKey);
    const newCookieSettings = cookieConsentStoredValue
      ? cookieConsentStoredValue.split(",")
      : undefined;

    setSavedCookieSettings(newCookieSettings);
  }, [customStorageKey, storageKey]);

  const passedCategories = getPassedCategories([
    tags,
    snippets,
    handlerFunctions,
  ]);

  const requiredCategories = passedCategories.filter(
    (category) => categorySettings[category]?.required,
  );

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
    handleSaveSettings([...selectedCategories]);
  };

  const defaultDeclineAll = () => {
    handleSaveSettings([]);
  };

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

  const actualIsOpen = modalIsOpen !== undefined ? modalIsOpen : isOpen;

  return (
    <React.Fragment>
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
        <Overlay>
          <Modal>
            <ModalHeader>
              <h2>{locales.title}</h2>
              <p>{locales.description}</p>
            </ModalHeader>

            <CategoriesContainer>
              {passedCategories.map((category) => (
                <React.Fragment key={category}>
                  {categoriesList === "checkboxes" && (
                    <Category>
                      <CategoryHeader>
                        <CategoryInfo>
                          <CheckboxContainer>
                            <input
                              type="checkbox"
                              checked={
                                selectedCategories.includes(category) ||
                                (categorySettings[category] &&
                                  categorySettings[category]?.required)
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
                            <Checkmark />
                            <CategoryName>
                              {categorySettings[category] &&
                              categorySettings[category]?.label
                                ? categorySettings[category]?.label
                                : locales[
                                    category as keyof CookieConsentTranslations
                                  ]}
                            </CategoryName>
                            {categorySettings[category] &&
                              categorySettings[category]?.required && (
                                <RequiredBadge>
                                  {locales.required}
                                </RequiredBadge>
                              )}
                          </CheckboxContainer>
                        </CategoryInfo>
                      </CategoryHeader>
                    </Category>
                  )}
                  {categoriesList === "switches" && (
                    <Category>
                      <CategoryHeader>
                        <CategoryInfo>
                          <Switch>
                            <input
                              type="checkbox"
                              checked={
                                selectedCategories.includes(category) ||
                                (categorySettings[category] &&
                                  categorySettings[category]?.required)
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
                            <Slider />
                          </Switch>
                          <CategoryName>
                            {categorySettings[category] &&
                            categorySettings[category]?.label
                              ? categorySettings[category]?.label
                              : locales[
                                  category as keyof CookieConsentTranslations
                                ]}
                          </CategoryName>
                          {categorySettings[category] &&
                            categorySettings[category]?.required && (
                              <RequiredBadge>{locales.required}</RequiredBadge>
                            )}
                        </CategoryInfo>
                      </CategoryHeader>
                    </Category>
                  )}
                </React.Fragment>
              ))}
            </CategoriesContainer>

            {privacyPolicyUrl && (
              <PrivacyPolicy>
                <p>
                  {locales.privacyPolicyInfo}{" "}
                  <a href={privacyPolicyUrl}>{locales.privacyPolicy}</a>.
                </p>
              </PrivacyPolicy>
            )}

            <ResponsiveActions>
              {selectedCategories.length || requiredCategories.length ? (
                <ResponsiveSaveButton
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
    </React.Fragment>
  );
};
