import React from "react";
import { Button as AntButton } from "antd";
import type { ButtonProps as AntButtonProps } from "antd";
import { Colors } from "../../theme/colors";

export interface ButtonProps extends AntButtonProps {
  bgColor?: string;
  textColor?: string;
  height?: number | string;
  width?: number | string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  bgColor,
  textColor,
  height = 44,
  width,
  fullWidth,
  style,
  type,
  ...props
}) => {
  return (
    <AntButton
      type={type}
      style={{
        backgroundColor:
          type === "link" ? "transparent" : bgColor || Colors.primary,
        color: type === "link" ? Colors.primary : textColor || Colors.white,
        height: type === "link" ? "auto" : height,
        width: fullWidth ? "100%" : width,
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        boxShadow: "none",
        ...style,
      }}
      {...props}
    />
  );
};

export default Button;
