import styled from "styled-components";
import {
  AcceptButton,
  Actions,
  DisableButton,
  mergeColors,
  PrivacyPolicy,
  SaveButton,
  slideUp,
} from "../styles";

export const Banner = styled.div<{ $colors: ReturnType<typeof mergeColors> }>`
  background-color: ${(props) => props.$colors.background};
  box-shadow: 0 4px 20px ${(props) => props.$colors.shadow};
  width: 100vw;
  min-width: 100vw;
  max-height: 35vh;
  overflow-y: auto;
  padding: 16px;
  animation: ${slideUp} 0.3s ease-out;
  position: absolute;
  bottom: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 5vw;
  gap: 5vw;
  max-width: 1280px;

  @media (min-width: 640px) {
    flex-direction: row;
  }
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
