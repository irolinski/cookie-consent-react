import styled from "styled-components";
import { Actions, buttonFadeIn, mergeColors, slideUp } from "../styles";

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
`;

export const BannerContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const BannerHeader = styled.div<{
  $colors: ReturnType<typeof mergeColors>;
}>`
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

export const AcceptButton = styled.button<{
  $colors: ReturnType<typeof mergeColors>;
}>`
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

export const DisableButton = styled.button<{
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

export const SaveButton = styled.button<{
  $colors: ReturnType<typeof mergeColors>;
}>`
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

export const ResponsiveAcceptButton = styled(AcceptButton)`
  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const ResponsiveDisableButton = styled(DisableButton)`
  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const ResponsiveSaveButton = styled(SaveButton)`
  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const ResponsiveActions = styled(Actions)`
  flex-direction: column;
`;
