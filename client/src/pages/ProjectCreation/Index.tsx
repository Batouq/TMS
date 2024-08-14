import React, { useEffect, useState } from "react";
import "./Index.css";
import Select from "react-select";
import toast from "react-hot-toast";
import ActionButton from "../../components/ActionButton";
import request from "../../utils/request";
import NavButton from "../../components/NavButton";
import { User } from "../../types/types";

function Index() {
  const [loading, setLoading] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");
  const [projectLead, setProjectLead] = useState<string>("");

  const [leadList, setLeadList] = useState<User[]>();

  const getUsers = async () => {
    const { data } = await request.get("/users");
    const onlyLead = data.docs.filter(
      (emp: User) => emp.positionName === "Project Lead"
    );

    setLeadList(
      onlyLead.map((emp: { _id: string; name: string }) => {
        return { value: emp._id, label: emp.name };
      })
    );
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onSubmit = async () => {
    setLoading(true);

    if (projectName.length === 0 || projectLead.length === 0) {
      setLoading(false);
      return toast.error("fill the empty fields");
    }
    await request.post("/project", {
      projectName: projectName,
      projectLead: projectLead,
    });

    setProjectName("");
    setProjectLead("");
    setLoading(false);
    toast.success("project created successfully");
  };

  return (
    <div className="userCreationContainer">
      <NavButton title="Back" path="/" />
      <div className="userCreationBox">
        <div className="boxItem">
          <label htmlFor="projectName">Project Name:</label>
          <input
            type="text"
            name="projectName"
            id="projectName"
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
          />
        </div>
        <div className="boxItem">
          <label htmlFor="UserPosition">Project Lead:</label>
          <Select
            options={leadList}
            value={leadList?.filter((emp) => emp.value === projectLead)}
            onChange={(e) => {
              setProjectLead(e?.value || "");
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
