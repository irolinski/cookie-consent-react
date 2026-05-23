import React, { Dispatch, SetStateAction } from "react";
import {
  CategoriesContainer,
  Category,
  CategoryHeader,
  CategoryInfo,
  CategoryName,
  CheckboxContainer,
  Checkmark,
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
} from "../styles";
import {
  CookieConsentCategoriesListStyleType,
  CookieConsentColors,
  CookieConsentCategorySettings,
  CookieConsentCategory,
  CookieConsentLocales,
  CookieConsentTranslationObject,
  CookieConsentCustomHandlerType,
  CookieConsentDefaultHandlers,
} from "../types";

type CookieConsentModalProps = {
  colors: CookieConsentColors;
  locales: CookieConsentLocales;
  passedCategories: CookieConsentCategory[];
  categoriesListStyle: CookieConsentCategoriesListStyleType;
  selectedCategories: CookieConsentCategory[];
  requiredCategories: CookieConsentCategory[];
  categorySettings: CookieConsentCategorySettings;
  setSelectedCategories: Dispatch<
    SetStateAction<("essential" | "marketing" | "analytics" | "other")[]>
  >;
  privacyPolicyUrl: string | undefined;
  onAcceptAll: CookieConsentCustomHandlerType | undefined;
  onAcceptSelection: CookieConsentCustomHandlerType | undefined;
  onDeclineAll: CookieConsentCustomHandlerType | undefined;
  defaultHandlers: CookieConsentDefaultHandlers;
};

export const CookieConsentModal = ({
  colors,
  locales,
  passedCategories,
  categoriesListStyle,
  selectedCategories,
  requiredCategories,
  categorySettings,
  setSelectedCategories,
  privacyPolicyUrl,
  onAcceptAll,
  onAcceptSelection,
  onDeclineAll,
  defaultHandlers,
}: CookieConsentModalProps) => {
  return (
    <Overlay $colors={colors}>
      <Modal $colors={colors}>
        <ModalHeader $colors={colors}>
          <h2>{locales.title}</h2>
          <p>{locales.description}</p>
        </ModalHeader>
        <CategoriesContainer>
          {passedCategories.map((category) => (
            <React.Fragment key={category}>
              {categoriesListStyle === "checkboxes" && (
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
                          $isRequired={requiredCategories.includes(category)}
                        >
                          <span>&#10003;</span>
                        </Checkmark>
                        <CategoryName $colors={colors}>
                          {categorySettings[category] &&
                          categorySettings[category]?.label
                            ? categorySettings[category]?.label
                            : locales[
                                category as keyof CookieConsentTranslationObject
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
              {categoriesListStyle === "switches" && (
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
                          $isRequired={requiredCategories.includes(category)}
                          $colors={colors}
                        />
                      </Switch>
                      <CategoryName $colors={colors}>
                        {categorySettings[category] &&
                        categorySettings[category]?.label
                          ? categorySettings[category]?.label
                          : locales[
                              category as keyof CookieConsentTranslationObject
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
                  ? onAcceptSelection(defaultHandlers.acceptSelection)
                  : defaultHandlers.acceptSelection()
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
                      ? onDeclineAll(defaultHandlers.declineAll)
                      : defaultHandlers.declineAll()
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
                ? onAcceptAll(defaultHandlers.acceptAll)
                : defaultHandlers.acceptAll()
            }
          >
            {locales.acceptAll}
          </ResponsiveAcceptButton>
        </ResponsiveActions>
      </Modal>
    </Overlay>
  );
};
