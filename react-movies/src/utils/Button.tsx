import React, { CSSProperties } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type: "button" | "submit";
  disabled: boolean;
  className: string;
  color?: string;
  style?: CSSProperties; // Add the style prop
}

export default function Button(props: ButtonProps) {
  const { color, style, ...otherProps } = props;

  const buttonStyle: CSSProperties = {
    ...style, // Preserve other style properties
    backgroundColor: color,
  };

  return (
    <button
      className={props.className}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      style={buttonStyle}
    >
      {props.children}
    </button>
  );
}

Button.defaultProps = {
  type: "button",
  disabled: false,
  className: "btn btn-primary",
  color: "green",
};
