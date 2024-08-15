import { useEffect, useState } from "react";
import request from "../../utils/request";
import { Project, User } from "../../types/types";
import Select from "react-select";
import "./Index.css";
import toast from "react-hot-toast";
import NavButton from "../../components/NavButton";
import { FaTrash } from "react-icons/fa";

function Index() {
  const pathname = window.location.pathname;
  const [details, setDetails] = useState<Project>();
  const [edit, setEdit] = useState<boolean>(false);
  const [leadList, setLeadList] = useState<User[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const [projectLeadId, setProjectLeadId] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");

  const getProjectDetails = async () => {
    const { data } = await request.get("/project", {
      params: { _id: pathname.substring(1) },
    });
    setDetails(data.docs);
    setProjectName(data.docs.projectName);
    setProjectLeadId(data.docs.projectLead._id);
  };
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

  const onSubmit = async () => {
    setLoading(true);

    if (
      projectName.length === 0 ||
      projectLeadId.length === 0 ||
      details?._id.length === 0
    ) {
      setLoading(false);
      setProjectName(details.projectName);
      setProjectLeadId(details.projectLead._id);
      return toast.error("fill the empty fields");
    }
    await request.put("/project", {
      _id: details?._id,
      projectName: projectName,
      projectLead: projectLeadId,
    });

    setProjectName("");
    setProjectLeadId("");
    setLoading(false);
    toast.success("project created successfully");
  };

  useEffect(() => {
    getProjectDetails();
    getUsers();
  }, [loading]);

  //   ["Not Assigned", "Not Started", "In Progress", "Completed"];

  const statusOptions = [
    { label: "Not Assigned", value: "Not Assigned" },
    { label: "Not Started", value: "Not Started" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
  ];

  const statusChange = async (taskId: string, status: string) => {
    setLoading(true);
    await request.put("/task", { id: taskId, status: status });
    toast.success("task updated ");
    setLoading(false);
  };
  const deleteTask = async (taskId: string) => {
    setLoading(true);
    await request.delete("/task", { params: { id: taskId } });
    toast.success("task deleted ");
    setLoading(false);
  };

  return (
    <div style={{ height: "100%" }}>
      <NavButton title="Back" path="/" />
      <div className="detailsContainer">
        <span>
          project name:{" "}
          {edit ? (
            <input
              type="text"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
            />
          ) : (
            <>{details?.projectName}</>
          )}
        </span>

        <span>
          project lead name:{" "}
          {edit ? (
            <Select
              options={leadList}
              value={leadList?.filter((emp) => emp.value === projectLeadId)}
              onChange={(e) => {
                setProjectLeadId(e?.value || "");
              }}
            />
          ) : (
            <>{details?.projectLead.name}</>
          )}
        </span>
        {edit ? (
          <>
            <button
              className="editButton"
              onClick={() => {
                onSubmit();
              }}
            >
              submit
            </button>
            <button
              className="editButton"
              onClick={() => {
                setEdit(!edit);
              }}
            >
              exit
            </button>
          </>
        ) : (
          <button
            className="editButton"
            onClick={() => {
              setEdit(!edit);
            }}
          >
            Edit
          </button>
        )}
      </div>
      <NavButton title="Create Task" path="./taskCreate" />

      <div className="tasksListContainer">
        {details?.tasks.map((ts) => (
          <div className="taskInfo" key={ts._id}>
            <FaTrash
              onClick={() => {
                deleteTask(ts._id);
              }}
            />
            <span>Description: {ts.description}</span>
            <span>Assigned To: {ts.assignedDeveloper}</span>
            <span>start date: {ts.startDate.toString()}</span>
            <span>due date: {ts.dueDate.toString()}</span>
            <span>
              status:{" "}
              <Select
                options={statusOptions}
                value={statusOptions.filter((opt) => opt.value === ts.status)}
                onChange={(e) => {
                  statusChange(ts._id, e?.value);
                }}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Index;
