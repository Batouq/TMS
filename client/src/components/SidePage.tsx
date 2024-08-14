import React, { useContext } from "react";
import "./SidePage.css";
import { MdAccountCircle } from "react-icons/md";
import NavButton from "./NavButton";
import { UserContext } from "../utils/UserProvider";
const SidePage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="sideBarContainer">
      <MdAccountCircle size={200} color="#2F3645" />
      {user && (
        <div>
          <span>current user:{user?.name}</span>
          <span>current user:{user?.positionName}</span>
        </div>
      )}
      <NavButton title="Project" path="/" />
      <NavButton title="Choose user" path="/users" />
      <NavButton title="Create User" path="/userCreation" />
    </div>
  );
};

export default SidePage;
