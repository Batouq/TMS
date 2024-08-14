export interface User {
  _id?: string;
  name: string;
  positionName:
    | "FrontEnd Developer"
    | "BackEnd Developer"
    | "Project Lead"
    | "Full Stack Developer"
    | "Manager";
}

export interface Project {
  _id?: string;
  projectName: string;
  projectLead: User;
}
