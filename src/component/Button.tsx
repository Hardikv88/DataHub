import React from "react";
import { Button as AntButton } from "antd";
import type { ButtonProps as AntButtonProps } from "antd";
import { colors } from "../theme/colors";

interface CustomButtonProps extends AntButtonProps {
  bgColor?: string;
  textColor?: string;
  borderColor?: string;

  width?: string | number;
  height?: string | number;

  fontSize?: number;
  fontWeight?: number | string;

  borderRadius?: number;

  fullWidth?: boolean;
}

const Button: React.FC<CustomButtonProps> = ({
  bgColor = colors.primary,
  textColor = colors.white,
  borderColor,
  width,
  height,
  fontSize = 14,
  fontWeight = 700,
  borderRadius = 8,
  fullWidth = false,
  style,
  className,
  children,
  ...rest
}) => {
  const customStyle: React.CSSProperties = {
    backgroundColor: bgColor,
    color: textColor,
    borderColor: borderColor,

    width: fullWidth ? "100%" : width,
    height: height,

    fontSize,
    fontWeight,

    borderRadius,

    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",

    ...style,
  };

  return (
    <AntButton style={customStyle}>
      {children}
    </AntButton>
  );
};

export default Button;
