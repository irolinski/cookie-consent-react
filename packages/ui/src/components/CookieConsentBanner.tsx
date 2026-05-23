import React, { Dispatch, SetStateAction, useState } from "react";
import {
  CategoryInfo,
  CategoryName,
  Checkmark,
  ResponsiveAcceptButton,
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
  CookieConsentCustomHandlerType,
  CookieConsentDefaultHandlers,
} from "../types";
import {
  Banner,
  BannerCategoriesContainer,
  BannerCategoriesContainerContent,
  BannerCategoriesRowCol,
  BannerCategoriesSectionHeader,
  BannerCategory,
  BannerCategoryHeader,
  BannerCategorySwitch,
  BannerCheckboxContainer,
  BannerContent,
  BannerHeader,
  BannerHeaderTop,
  BannerPrivacyPolicy,
  BannerSwitchCategoryInfo,
  BannerSwitchContainer,
  ResponsiveActions,
  SaveButtonAccordionWrapper,
} from "./CookieConsentBanner.styles";
import { DividerLine } from "./ui/DividerLine";

type CookieConsentBannerProps = {
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

export const CookieConsentBanner = ({
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
}: CookieConsentBannerProps) => {
  const [cookiePreferencesIsOpen, setCookiePreferencesIsOpen] = useState(false);
  return (
    <Banner $colors={colors}>
      <BannerContent>
        <BannerHeader $colors={colors}>
          <BannerHeaderTop $colors={colors}>
            <h2>{locales.title}</h2>
            <p>{locales.description}</p>
            <React.Fragment>
              {privacyPolicyUrl && (
                <BannerPrivacyPolicy $colors={colors}>
                  <p>
                    {locales.privacyPolicyInfo}{" "}
                    <a href={privacyPolicyUrl}>{locales.privacyPolicy}</a>.
                  </p>
                </BannerPrivacyPolicy>
              )}
            </React.Fragment>
          </BannerHeaderTop>
          <BannerCategoriesContainer $isOpen={cookiePreferencesIsOpen}>
            <BannerCategoriesContainerContent>
              {categoriesListStyle === "checkboxes" && (
                <DividerLine length={"33%"} weight={"1px"} colors={colors} />
              )}
              <BannerCategoriesSectionHeader
                $colors={colors}
                onClick={() => setCookiePreferencesIsOpen((prev) => !prev)}
              >
                {locales.categories}
              </BannerCategoriesSectionHeader>
              <BannerCategoriesRowCol>
                {passedCategories.map((category) => (
                  <React.Fragment key={category}>
                    {categoriesListStyle === "checkboxes" && (
                      <BannerCategory $colors={colors}>
                        <BannerCategoryHeader $colors={colors}>
                          <CategoryInfo>
                            <BannerCheckboxContainer>
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
                                  : locales[category]}
                                {categorySettings[category] &&
                                  categorySettings[category]?.required &&
                                  "*"}
                              </CategoryName>
                            </BannerCheckboxContainer>
                          </CategoryInfo>
                        </BannerCategoryHeader>
                      </BannerCategory>
                    )}
                    {categoriesListStyle === "switches" && (
                      <BannerCategorySwitch $colors={colors}>
                        <BannerCategoryHeader $colors={colors}>
                          <BannerSwitchCategoryInfo>
                            <BannerSwitchContainer>
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
                            </BannerSwitchContainer>
                            <CategoryName $colors={colors}>
                              {categorySettings[category] &&
                              categorySettings[category]?.label
                                ? categorySettings[category]?.label
                                : locales[category]}
                              {categorySettings[category] &&
                                categorySettings[category]?.required &&
                                "*"}
                            </CategoryName>
                          </BannerSwitchCategoryInfo>
                        </BannerCategoryHeader>
                      </BannerCategorySwitch>
                    )}
                  </React.Fragment>
                ))}
              </BannerCategoriesRowCol>
            </BannerCategoriesContainerContent>
          </BannerCategoriesContainer>
        </BannerHeader>

        <ResponsiveActions>
          {selectedCategories.length || requiredCategories.length ? (
            <React.Fragment>
              <ResponsiveSaveButton
                $colors={colors}
                onClick={() => setCookiePreferencesIsOpen((prev) => !prev)}
              >
                {!cookiePreferencesIsOpen === true
                  ? locales.cookiePreferences_show
                  : locales.cookiePreferences_hide}
              </ResponsiveSaveButton>
              <SaveButtonAccordionWrapper $isOpen={cookiePreferencesIsOpen}>
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
              </SaveButtonAccordionWrapper>
            </React.Fragment>
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
      </BannerContent>
    </Banner>
  );
};
