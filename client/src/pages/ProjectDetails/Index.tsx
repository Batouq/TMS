import { useEffect, useState } from "react";
import request from "../../utils/request";
import { Project, User } from "../../types/types";
import Select from "react-select";
import "./Index.css";
import toast from "react-hot-toast";
import NavButton from "../../components/NavButton";

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
      _id: details._id,
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
          <div className="taskInfo">{ts._id}</div>
        ))}
      </div>
    </div>
  );
}

export default Index;
