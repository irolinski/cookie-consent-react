import styled from "styled-components";
import {
  AcceptButton,
  Actions,
  CategoriesContainer,
  CheckboxContainer,
  DisableButton,
  mergeColors,
  PrivacyPolicy,
  RequiredBadge,
  SaveButton,
  slideUp,
} from "../styles";

export const Banner = styled.div<{ $colors: ReturnType<typeof mergeColors> }>`
  background-color: ${(props) => props.$colors.background};
  box-shadow: 0 4px 20px ${(props) => props.$colors.shadow};
  width: 100vw;
  max-height: 45vh;
  min-width: 100vw;
  overflow-y: auto;
  padding: 16px;
  animation: ${slideUp} 0.3s ease-out;
  position: absolute;
  bottom: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 640px) {
    max-height: 35vh;
  }
`;

export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 5vw;
  gap: 2.5vw;
  max-width: 1280px;

  @media (min-width: 640px) {
    flex-direction: row;
    gap: 5vw;
  }
`;

export const BannerCategoriesSectionHeader = styled.h4<{
  $colors: ReturnType<typeof mergeColors>;
}>`
  color: ${(props) => props.$colors.textPrimary};
  font-size: 14px;
  font-weight: 500;
`;

export const BannerHeader = styled.div<{
  $colors: ReturnType<typeof mergeColors>;
}>`
  display: flex;
  flex-direction: column;

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

export const BannerHeaderTop = styled.div<{
  $colors: ReturnType<typeof mergeColors>;
}>`
  padding-bottom: 20px;
`;

export const BannerCategoriesContainer = styled(CategoriesContainer)<{
  $isOpen: boolean;
}>`
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-height: ${(props) => (props.$isOpen ? "200px" : "0px")};
  transition: max-height 1s ease-in;
`;

export const BannerCategoriesHeader = styled.h6<{
  $colors: ReturnType<typeof mergeColors>;
}>`
  color: ${(props) => props.$colors.textSecondary};
`;

export const BannerCategoriesRowCol = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 8px;
`;

export const BannerCategory = styled.div<{
  $colors: ReturnType<typeof mergeColors>;
}>`
  border-radius: 6px;
  overflow: hidden;
`;

export const BannerCategoryHeader = styled.div<{
  $colors: ReturnType<typeof mergeColors>;
}>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
`;

export const BannerCheckboxContainer = styled(CheckboxContainer)`
  background-color: transparent;
  border: none;
`;

export const BannerRequiredBadge = styled(RequiredBadge)`
  margin: 0;
`;

export const ResponsiveActions = styled(Actions)`
  flex-direction: column;
  width: 100%;
  @media (min-width: 640px) {
    width: auto;
    min-width: 180px;
  }
`;

export const BannerAcceptButton = styled(AcceptButton)`
  width: 100%;
`;

export const BannerDisableButton = styled(DisableButton)`
  width: 100%;
`;

export const BannerSaveButton = styled(SaveButton)`
  width: 100%;
`;

export const BannerPrivacyPolicy = styled(PrivacyPolicy)`
  margin-top: 8px;
  margin-bottom: 2px;
`;
