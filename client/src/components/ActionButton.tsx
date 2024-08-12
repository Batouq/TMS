import React from "react";
import "./ActionButton.css";

const ActionButton = ({
  title,
  action,
  disabled,
}: {
  title: string;
  action: () => void;
  disabled: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      className="actionButton"
      style={
        disabled ? { backgroundColor: "gray" } : { backgroundColor: "#2f3645" }
      }
      onClick={() => {
        action();
      }}
    >
      {title}
    </button>
  );
};

export default ActionButton;
