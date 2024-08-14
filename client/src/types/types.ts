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

export interface Task {
  _id?: string;
  projectIdRef: User;
  description: string;
  assignedDeveloper: User;
  dueDate: Date;
  startDate: Date;
  status: ["Not Assigned", "Not Started", "In Progress", "Completed"];
}

export interface Project {
  _id?: string;
  projectName: string;
  projectLead: User;
  tasks: Task[];
}
