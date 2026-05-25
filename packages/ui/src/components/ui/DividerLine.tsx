"use client";

import { DividerLineBody, DividerLineWrapper } from "../../styles";
import { CookieConsentColors } from "../../types";

export const DividerLine = ({
  length = "33%",
  weight = "1px",
  colors,
}: {
  length?: string;
  weight?: string;
  colors: CookieConsentColors;
}) => {
  return (
    <DividerLineWrapper>
      <DividerLineBody $length={length} $weight={weight} $colors={colors} />
    </DividerLineWrapper>
  );
};
