import { useContext, useEffect, useState } from "react";
import { Project } from "../../types/types";
import { UserContext } from "../../utils/UserProvider";
import request from "../../utils/request";
import "./Index.css";
import NavButton from "../../components/NavButton";
import { useNavigate } from "react-router";

const Index = () => {
  const [projects, setProjects] = useState<Project[]>();
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const getProject = async () => {
    const { data } = await request.get("/projects", {
      params: {
        userId: user?._id,
        position: user?.positionName,
      },
    });
    setProjects(data.docs);
  };

  useEffect(() => {
    getProject();
  }, []);
  return (
    <div className="userContainer">
      <NavButton title="Create new Project" path="/projectCreation" />
      {projects?.map((project) => (
        <div
          className="userInfo"
          onClick={() => {
            navigate(`/${project._id}`);
          }}
        >
          <span>ID: {project._id}</span>
          <span>Project Name: {project.projectName}</span>
          <span>Project lead: {project.projectLead.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Index;
