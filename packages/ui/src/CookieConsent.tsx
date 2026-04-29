"use client";

import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
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
  primaryLight: "#eaeaea",
  textPrimary: "#333333",
  textSecondary: "#666666",
  borderInput: "#d0d0d0",
  borderInputHover: "#060303",
  background: "#ffffff",
  backgroundOff: "#f9f9f9",
  overlay: "rgba(0, 0, 0, 0.5)",
  shadow: "rgba(0, 0, 0, 0.15)",
};

// Helper function to merge custom colors with defaults
const mergeColors = (customColors?: CookieConsentProps["customColors"]) => ({
  primary: customColors?.primary ?? COLORS.primary,
  primaryLight: customColors?.primaryLight ?? COLORS.primaryLight,
  textPrimary: customColors?.textPrimary ?? COLORS.textPrimary,
  textSecondary: customColors?.textSecondary ?? COLORS.textSecondary,
  borderInput: customColors?.borderInput ?? COLORS.borderInput,
  borderInputHover: customColors?.borderInputHover ?? COLORS.borderInputHover,
  background: customColors?.background ?? COLORS.background,
  backgroundOff: customColors?.backgroundOff ?? COLORS.backgroundOff,
  overlay: customColors?.overlay ?? COLORS.overlay,
  shadow: customColors?.shadow ?? COLORS.shadow,
});

// Styled Components

const CookieConsentReactContainer = styled.div<{
  $colors?: ReturnType<typeof mergeColors>;
  $fontFamily?: string;
}>`
  font-family: ${(props) =>
    props.$fontFamily ||
    `'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif`};
`;

const Overlay = styled.div<{ $colors: ReturnType<typeof mergeColors> }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background-color: ${(props) => props.$colors.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 12px;
`;

const Modal = styled.div<{ $colors: ReturnType<typeof mergeColors> }>`
  background-color: ${(props) => props.$colors.background};
  border-radius: 8px;
  box-shadow: 0 4px 20px ${(props) => props.$colors.shadow};
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 16px;
  animation: ${slideUp} 0.3s ease-out;
`;

const ModalHeader = styled.div<{ $colors: ReturnType<typeof mergeColors> }>`
  margin-bottom: 12px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.$colors.textPrimary};
    margin: 0 0 8px 0;
  }

  p {
    font-size: 13px;
    line-height: 1.4;
    color: ${(props) => props.$colors.textSecondary};
    margin: 0;
  }
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

const Category = styled.div<{ $colors: ReturnType<typeof mergeColors> }>`
  border: 1px solid ${(props) => props.$colors.primaryLight};
  border-radius: 6px;
  overflow: hidden;
`;

const CategoryHeader = styled.div<{ $colors: ReturnType<typeof mergeColors> }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background-color: ${(props) => props.$colors.backgroundOff};
`;

const CategoryInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CategoryName = styled.span<{ $colors: ReturnType<typeof mergeColors> }>`
  font-weight: 600;
  font-size: 14px;
  color: ${(props) => props.$colors.textPrimary};
  margin-left: 8px;
`;

const RequiredBadge = styled.span<{ $colors: ReturnType<typeof mergeColors> }>`
  display: inline-block;
  background-color: ${(props) => props.$colors.primaryLight};
  color: ${(props) => props.$colors.primary};
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 10px;
  margin-left: 8px;
`;

const PrivacyPolicy = styled.div<{ $colors: ReturnType<typeof mergeColors> }>`
  margin-bottom: 12px;
  font-size: 12px;
  color: ${(props) => props.$colors.textSecondary};

  a {
    color: ${(props) => props.$colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      filter: brightness(0.9);
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

const AcceptButton = styled.button<{ $colors: ReturnType<typeof mergeColors> }>`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${(props) => props.$colors.primary};
  color: ${(props) => props.$colors.background};
  border: 1px solid transparent;
  ${buttonFadeIn}
  animation-delay: 0.15s;

  &:hover {
    filter: brightness(0.9);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px ${(props) => props.$colors.shadow};
  }
`;

const DisableButton = styled.button<{
  $colors: ReturnType<typeof mergeColors>;
}>`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${(props) => props.$colors.background};
  color: ${(props) => props.$colors.textPrimary};
  border: 1px solid ${(props) => props.$colors.borderInput};
  ${buttonFadeIn}
  animation-delay: 0.25s;

  &:hover {
    background-color: ${(props) => props.$colors.backgroundOff};
    transform: translateY(-1px);
    filter: brightness(0.98);
  }
`;

const SaveButton = styled.button<{ $colors: ReturnType<typeof mergeColors> }>`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${(props) => props.$colors.background};
  color: ${(props) => props.$colors.primary};
  border: 1px solid ${(props) => props.$colors.primary};
  ${buttonFadeIn}
  animation-delay: 0.35s;

  &:hover {
    background-color: ${(props) => props.$colors.backgroundOff};
    transform: translateY(-1px);
    filter: brightness(0.98);
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

const Checkmark = styled.span<{
  isService?: boolean;
  $colors: ReturnType<typeof mergeColors>;
}>`
  position: relative;
  height: ${(props) => (props.isService ? "14px" : "18px")};
  width: ${(props) => (props.isService ? "14px" : "18px")};
  background-color: ${(props) => props.$colors.background};
  border: 2px solid ${(props) => props.$colors.borderInput};
  border-radius: 4px;

  ${CheckboxContainer}:hover input ~ & {
    border-color: ${(props) => props.$colors.borderInputHover};
  }

  ${CheckboxContainer} input:checked ~ & {
    background-color: ${(props) => props.$colors.primary};
    border-color: ${(props) => props.$colors.primary};
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
    border: solid ${(props) => props.$colors.background};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  ${CheckboxContainer} input:disabled ~ & {
    background-color: ${(props) => props.$colors.backgroundOff};
    border-color: ${(props) => props.$colors.borderInput};
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${CheckboxContainer} input:disabled ~ &:after {
    border-color: ${(props) => props.$colors.borderInput};
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

const Slider = styled.span<{
  $isRequired?: boolean;
  $colors: ReturnType<typeof mergeColors>;
}>`
  position: absolute;
  cursor: ${(props) => (props.$isRequired ? "not-allowed" : "pointer")};
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
background-color: ${(props) =>
  props.$isRequired
    ? `color-mix(in srgb, ${props.$colors.primary}, transparent 40%)`
    : props.$colors.primary};  }

  input:checked + &::before {
    transform: translateX(16px);
  }
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
    handleSaveSettings([...selectedCategories]);
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
                            <Checkmark $colors={colors} />
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
