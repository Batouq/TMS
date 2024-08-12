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
