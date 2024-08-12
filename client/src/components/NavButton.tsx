import React from "react";
import "./NavButton.css";
import { useNavigate } from "react-router";

function NavButton({ title, path }: { title: string; path: string }) {
  const navigate = useNavigate();
  return (
    <button
      className="buttonAction"
      onClick={() => {
        navigate(path);
      }}
    >
      {title}
    </button>
  );
}

export default NavButton;
