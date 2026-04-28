import React, { type ReactNode } from "react";
import { Button as AntButton } from "antd";
import type { ButtonProps as AntButtonProps } from "antd";
import { Colors } from "../../theme/colors";

export interface ButtonProps extends AntButtonProps {
  bgColor?: string;
  textColor?: string;
  height?: number | string;
  width?: number | string;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
}

const Button: React.FC<ButtonProps> = ({
  bgColor,
  textColor,
  height = 44,
  width,
  fullWidth,
  style,
  type,
  icon,
  iconPosition = "start",
  children,
  ...props
}) => {
  return (
    <AntButton
      type={type}
      icon={iconPosition === "start" ? icon : undefined}
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
      >
      {iconPosition === "end" && icon}
      {children}
    </AntButton>
  );
};

export default Button;
