import React, { Dispatch, SetStateAction, useState } from "react";
import {
  CategoriesContainer,
  Category,
  CategoryHeader,
  CategoryInfo,
  CategoryName,
  Checkmark,
  PrivacyPolicy,
  ResponsiveAcceptButton,
  ResponsiveDisableButton,
  ResponsiveSaveButton,
  Slider,
  Switch,
} from "../styles";
import {
  CategoriesListType,
  ColorsType,
  CookieCategorySettings,
  CookieCategoryType,
  CookieConsentLocales,
  CustomCookieConsentHandlerType,
  DefaultCookieConsentHandlersType,
} from "../types";
import {
  Banner,
  BannerCategoriesContainer,
  BannerCategoriesRowCol,
  BannerCategoriesSectionHeader,
  BannerCategory,
  BannerCategoryHeader,
  BannerCheckboxContainer,
  BannerContent,
  BannerHeader,
  BannerPrivacyPolicy,
  ResponsiveActions,
} from "./CookieConsentBanner.styles";
import { CookieConsentTranslations } from "../locales";
import { DividerLine } from "./ui/DividerLine";

type CookieConsentBannerProps = {
  colors: ColorsType;
  locales: CookieConsentLocales;
  passedCategories: CookieCategoryType[];
  categoriesList: CategoriesListType;
  selectedCategories: CookieCategoryType[];
  requiredCategories: CookieCategoryType[];
  categorySettings: CookieCategorySettings;
  setSelectedCategories: Dispatch<
    SetStateAction<("essential" | "marketing" | "analytics" | "other")[]>
  >;
  privacyPolicyUrl: string | undefined;
  onAcceptAll: CustomCookieConsentHandlerType | undefined;
  onAcceptSelection: CustomCookieConsentHandlerType | undefined;
  onDeclineAll: CustomCookieConsentHandlerType | undefined;
  defaultHandlers: DefaultCookieConsentHandlersType;
};

export const CookieConsentBanner = ({
  colors,
  locales,
  passedCategories,
  categoriesList,
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
            <BannerCategoriesContainer $isOpen={cookiePreferencesIsOpen}>
              <DividerLine length={"33%"} weight={"1px"} colors={colors} />
              <BannerCategoriesSectionHeader
                $colors={colors}
                onClick={() => setCookiePreferencesIsOpen((prev) => !prev)}
              >
                {locales.categories}
              </BannerCategoriesSectionHeader>
              <BannerCategoriesRowCol>
                {passedCategories.map((category) => (
                  <React.Fragment key={category}>
                    {categoriesList === "checkboxes" && (
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
                                  : locales[
                                      category as keyof CookieConsentTranslations
                                    ]}
                                {categorySettings[category] &&
                                  categorySettings[category]?.required &&
                                  "*"}
                              </CategoryName>
                            </BannerCheckboxContainer>
                          </CategoryInfo>
                        </BannerCategoryHeader>
                      </BannerCategory>
                    )}
                    {categoriesList === "switches" && (
                      <BannerCategory $colors={colors}>
                        <BannerCategoryHeader $colors={colors}>
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
                              {categorySettings[category] &&
                                categorySettings[category]?.required &&
                                "*"}
                            </CategoryName>
                          </CategoryInfo>
                        </BannerCategoryHeader>
                      </BannerCategory>
                    )}
                  </React.Fragment>
                ))}
              </BannerCategoriesRowCol>
            </BannerCategoriesContainer>
          </React.Fragment>
        </BannerHeader>

        <ResponsiveActions>
          {selectedCategories.length || requiredCategories.length ? (
            <ResponsiveSaveButton
              $colors={colors}
              onClick={() =>
                cookiePreferencesIsOpen
                  ? onAcceptSelection
                    ? onAcceptSelection(defaultHandlers.acceptSelection)
                    : defaultHandlers.acceptSelection()
                  : setCookiePreferencesIsOpen(true)
              }
            >
              {cookiePreferencesIsOpen
                ? locales.saveSelection
                : locales.cookiePreferences}
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
      </BannerContent>
    </Banner>
  );
};
