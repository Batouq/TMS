import Select from "react-select";
import React, { useEffect, useState } from "react";
import "./Index.css";
import NavButton from "../../components/NavButton";
import { User } from "../../types/types";
import request from "../../utils/request";
import ActionButton from "../../components/ActionButton";
import toast from "react-hot-toast";
// import ActionButton from "../../components/ActionButton";

const Index = () => {
  const [description, setDescription] = useState<string>();
  const [startDate, setStartDate] = useState<string>();
  const [dueDate, setDueDate] = useState<string>();
  const [assignedDeveloper, setAssignDeveloper] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>();
  const projectIdRef = window.location.pathname.split("/")[1];

  const [developerOptions, setDeveloperOptions] = useState<User[]>();

  const getUsers = async () => {
    const { data } = await request.get("/users");
    const onlyDevelopers = data.docs.filter(
      (emp: User) =>
        emp.positionName !== "Project Lead" && emp.positionName !== "Manager"
    );

    setDeveloperOptions(
      onlyDevelopers.map(
        (emp: { positionName: string; _id: string; name: string }) => {
          return { value: emp._id, label: `${emp.name} - ${emp.positionName}` };
        }
      )
    );
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onSubmit = async () => {
    setLoading(true);
    if (!description || !startDate || !dueDate || !assignedDeveloper) {
      setLoading(false);
      return toast.error("fill empty fields");
    }

    await request.post("/task", {
      projectIdRef: projectIdRef,
      assignedDeveloper: assignedDeveloper,
      description: description,
      dueDate: dueDate,
      startDate: startDate,
    });

    toast.success("new task created successfully");
  };

  return (
    <div className="userCreationContainer">
      <NavButton title="Back" path={`/${projectIdRef}`} />
      <div className="userCreationBox">
        <div className="boxItem">
          <label htmlFor="description">Task description </label>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="boxItem">
          <label htmlFor="startDate">Start Date </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
          <label htmlFor="dueDate">End Date </label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value);
            }}
          />
        </div>
        <div className="boxItem">
          <label htmlFor="UserPosition">Assign to developer:</label>
          <Select
            options={developerOptions}
            value={developerOptions?.filter(
              (emp) => emp?.value === assignedDeveloper
            )}
            onChange={(e) => {
              setAssignDeveloper(e?.value || "");
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
};

export default Index;
