"use client";

import { DividerLineBody, DividerLineWrapper } from "../../styles";
import { ColorsType } from "../../types";

export const DividerLine = ({
  length = "33%",
  weight = "1px",
  colors,
}: {
  length?: string;
  weight?: string;
  colors: ColorsType;
}) => {
  return (
    <DividerLineWrapper>
      <DividerLineBody $length={length} $weight={weight} $colors={colors} />
    </DividerLineWrapper>
  );
};
