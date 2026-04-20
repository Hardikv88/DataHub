import React from "react";
import { Typography } from "antd";
import { typography } from "../../theme/typography";

const { Text: AntText } = Typography;

type Variant = "body" | "subText" | "label" | "text" | "heading" | "button" | "hintText";

interface Props {
  children: React.ReactNode;
  variant?: Variant;
  style?: React.CSSProperties;
}

const Text: React.FC<Props> = ({
  children,
  variant = "text",
  style,
}) => {
  return (
    <AntText style={{ ...typography[variant], ...style }}>
      {children}
    </AntText>
  );
};

export default Text;