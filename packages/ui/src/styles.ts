import styled, { css, keyframes } from "styled-components";
import { CookieConsentProps } from "./types";
import { DEFAULT_COLORS } from "./constants";

// Animations

export const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Helper function to merge custom colors with defaults

export const mergeColors = (
  customColors?: CookieConsentProps["customColors"],
) => ({
  primary: customColors?.primary ?? DEFAULT_COLORS.primary,
  lightPrimary: customColors?.lightPrimary ?? DEFAULT_COLORS.lightPrimary,
  lightSecondary: customColors?.lightSecondary ?? DEFAULT_COLORS.lightSecondary,
  textPrimary: customColors?.textPrimary ?? DEFAULT_COLORS.textPrimary,
  textSecondary: customColors?.textSecondary ?? DEFAULT_COLORS.textSecondary,
  background: customColors?.background ?? DEFAULT_COLORS.background,
  backgroundOff: customColors?.backgroundOff ?? DEFAULT_COLORS.backgroundOff,
  overlay: customColors?.overlay ?? DEFAULT_COLORS.overlay,
  shadow: customColors?.shadow ?? DEFAULT_COLORS.shadow,
});

// Styled Components

export const CookieConsentReactContainer = styled.div<{
  $colors?: ReturnType<typeof mergeColors>;
  $fontFamily?: string;
}>`
  font-family: ${(props) =>
    props.$fontFamily ||
    `'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif`};

  /* apply font-family to buttons too */
  button {
    font-family: ${(props) =>
      props.$fontFamily ||
      `'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif`};
  }
`;

export const Overlay = styled.div<{ $colors: ReturnType<typeof mergeColors> }>`
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

export const Modal = styled.div<{ $colors: ReturnType<typeof mergeColors> }>`
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

export const ModalHeader = styled.div<{
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

export const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

export const Category = styled.div<{ $colors: ReturnType<typeof mergeColors> }>`
  border: 1px solid ${(props) => props.$colors.lightPrimary};
  border-radius: 6px;
  overflow: hidden;
`;

export const CategoryHeader = styled.div<{
  $colors: ReturnType<typeof mergeColors>;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background-color: ${(props) => props.$colors.backgroundOff};
`;

export const CategoryInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const CategoryName = styled.span<{
  $colors: ReturnType<typeof mergeColors>;
}>`
  font-weight: 600;
  font-size: 14px;
  color: ${(props) => props.$colors.textPrimary};
  margin-left: 8px;
`;

export const RequiredBadge = styled.span<{
  $colors: ReturnType<typeof mergeColors>;
}>`
  display: inline-block;
  background-color: ${(props) => props.$colors.lightPrimary};
  color: ${(props) => props.$colors.primary};
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 10px;
  margin-left: 8px;
`;

export const PrivacyPolicy = styled.div<{
  $colors: ReturnType<typeof mergeColors>;
}>`
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

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  animation: ${fadeIn} 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) 0.15s both;
`;

export const buttonFadeIn = css`
  opacity: 0;
  animation: ${fadeIn} 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
`;

export const CookieConsentButton = styled.button<{
  $colors: ReturnType<typeof mergeColors>;
}>`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  animation-delay: 0.35s;
  &:hover {
    filter: brightness(0.95);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px ${(props) => props.$colors.shadow};
  }
`;

export const AcceptButton = styled(CookieConsentButton)<{
  $colors: ReturnType<typeof mergeColors>;
}>`
  background-color: ${(props) => props.$colors.primary};
  color: ${(props) => props.$colors.background};
  border: 1px solid transparent;
  ${buttonFadeIn}
  animation-delay: 0.15s;
`;

export const DisableButton = styled(CookieConsentButton)<{
  $colors: ReturnType<typeof mergeColors>;
}>`
  background-color: ${(props) => props.$colors.background};
  color: ${(props) => props.$colors.textPrimary};
  border: 1px solid ${(props) => props.$colors.lightSecondary};
  ${buttonFadeIn}
  animation-delay: 0.25s;
`;

export const SaveButton = styled(CookieConsentButton)<{
  $colors: ReturnType<typeof mergeColors>;
}>`
  background-color: ${(props) => props.$colors.background};
  color: ${(props) => props.$colors.primary};
  border: 1px solid ${(props) => props.$colors.primary};
  ${buttonFadeIn}
  animation-delay: 0.35s;
`;

// Checkbox styling
export const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  user-select: none;
  min-width: 150px;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
`;

export const Checkmark = styled.div<{
  $colors: ReturnType<typeof mergeColors>;
  $isRequired: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18px;
  width: 18px;
  background-color: ${(props) => props.$colors.background};
  border: ${(props) =>
    !props.$isRequired
      ? `2px solid
 ${props.$colors.lightSecondary}`
      : null};
  border-radius: 4px;
  transition: border-color 0.25s ease-in-out;

  ${CheckboxContainer}:hover input ~ & {
    border-color: ${(props) =>
      `color-mix(in srgb, ${props.$colors.lightSecondary}, transparent 40%)`};
  }

  ${CheckboxContainer} input:checked ~ & {
    background-color: ${(props) => props.$colors.primary};
    border-color: ${(props) =>
      props.$isRequired
        ? `color-mix(in srgb, ${props.$colors.primary}, transparent 40%)`
        : props.$colors.primary};
  }

  &:after {
    content: "";
    position: absolute;
    display: none;
  }

  ${CheckboxContainer} input:checked ~ &:after {
    display: block;
  }

  ${CheckboxContainer} input:disabled ~ & {
    background-color: ${(props) =>
      props.$isRequired
        ? `color-mix(in srgb, ${props.$colors.primary}, transparent 40%)`
        : props.$colors.primary};
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${CheckboxContainer} input:disabled ~ &:after {
    border-color: ${(props) =>
      props.$isRequired
        ? `color-mix(in srgb, ${props.$colors.primary}, transparent 40%)`
        : props.$colors.primary};
  }

  & > span {
    color: ${(props) => props.$colors.background};
  }
`;

export const Switch = styled.label`
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

export const Slider = styled.span<{
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

export const DividerLineWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const DividerLineBody = styled.div<{
  $colors: ReturnType<typeof mergeColors>;
  $length: string;
  $weight: string;
}>`
  border-top: 1px solid ${(props) => props.$colors.shadow};
  width: ${(props) => props.$length};
  height: ${(props) => props.$weight};
`;

export const ResponsiveActions = styled(Actions)`
  @media (max-width: 640px) {
    flex-direction: column;
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
