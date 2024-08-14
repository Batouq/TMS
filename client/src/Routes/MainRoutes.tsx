import React, { ReactNode, useContext } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import Project from "../pages/Projects/Index";
import NotFound from "../pages/NotFound/Index";
import UserCreation from "../pages/UserCreation/Index";
import Users from "../pages/Users/Index";
import ProjectCreation from "../pages/ProjectCreation/Index";
import { UserContext } from "../utils/UserProvider";

const MainRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Project />
          </PrivateRoute>
        }
      />
      <Route
        path="/projectCreation"
        element={
          <PrivateRoute>
            <ProjectCreation />
          </PrivateRoute>
        }
      />
      <Route path="/userCreation" element={<UserCreation />} />
      <Route path="/users" element={<Users />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(UserContext);

  // If there's no user, redirect to a login page or another public route
  if (!user) {
    return <>Please choose account or create new </>;
  }

  // If user exists, render the children (protected route)
  return <>{children}</>;
};

export default MainRoutes;
