import React, { Dispatch, SetStateAction } from "react";
import {
  //   CategoriesContainer,
  //   Category,
  //   CategoryHeader,
  //   CategoryInfo,
  //   CategoryName,
  //   CheckboxContainer,
  //   Checkmark,
  PrivacyPolicy,
  //   RequiredBadge,
  ResponsiveAcceptButton,
  ResponsiveDisableButton,
  ResponsiveSaveButton,
  //   Slider,
  //   Switch,
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
  BannerContent,
  BannerHeader,
  BannerPrivacyPolicy,
  ResponsiveActions,
} from "./CookieConsentBanner.styles";

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
  //   passedCategories,
  //   categoriesList,
  selectedCategories,
  requiredCategories,
  //   categorySettings,
  //   setSelectedCategories,
  privacyPolicyUrl,
  onAcceptAll,
  onAcceptSelection,
  onDeclineAll,
  defaultHandlers,
}: CookieConsentBannerProps) => {
  return (
    <Banner $colors={colors}>
      <BannerContent>
        <BannerHeader $colors={colors}>
          <h2>{locales.title}</h2>
          <p>{locales.description}</p>
          {/* <CategoriesContainer>
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
                            $isRequired={requiredCategories.includes(category)}
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
                            $isRequired={requiredCategories.includes(category)}
                            $colors={colors}
                          />
                        </Switch>
                        <CategoryName $colors={colors}>
                          {categorySettings[category] &&
                          categorySettings[category]?.label
                            ? categorySettings[category]?.label
                            : locales[category as keyof CookieConsentTranslations]}
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
          </CategoriesContainer> */}
          {privacyPolicyUrl && (
            <BannerPrivacyPolicy $colors={colors}>
              <p>
                {locales.privacyPolicyInfo}{" "}
                <a href={privacyPolicyUrl}>{locales.privacyPolicy}</a>.
              </p>
            </BannerPrivacyPolicy>
          )}
        </BannerHeader>

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
      </BannerContent>
    </Banner>
  );
};
