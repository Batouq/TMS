import React, { useState } from "react";
import "./Index.css";
import Select from "react-select";
import toast from "react-hot-toast";
import ActionButton from "../../components/ActionButton";
import request from "../../utils/request";

function Index() {
  const positionOptions = [
    { value: "Manager", label: "Manager" },
    { value: "Project Lead", label: "Project Lead" },
    { value: "Full Stack Developer", label: "Full Stack Developer" },
    { value: "FrontEnd Developer", label: "FrontEnd Developer" },
    { value: "BackEnd Developer", label: "BackEnd Developer" },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [position, setPosition] = useState<string>("");

  const onSubmit = async () => {
    setLoading(true);

    if (userName.length === 0 || position.length === 0) {
      setLoading(false);
      return toast.error("fill the empty fields");
    }
    await request.post("/user", { name: userName, positionName: position });

    setUserName("");
    setPosition("");
    setLoading(false);
    toast.success("user created successfully");
  };

  return (
    <div className="userCreationContainer">
      <div className="userCreationBox">
        <div className="boxItem">
          <label htmlFor="UserName">User Name:</label>
          <input
            type="text"
            name="UserName"
            id="UserName"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="boxItem">
          <label htmlFor="UserPosition">Position:</label>
          <Select
            options={positionOptions}
            value={positionOptions.filter((pos) => pos.value === position)}
            onChange={(e) => {
              setPosition(e?.value || "");
            }}
          />
        </div>
        <ActionButton
          title="Submit"
          action={() => onSubmit()}
          disabled={loading}
        />
      </div>
    </div>
  );
}

export default Index;
