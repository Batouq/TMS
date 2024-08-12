import React, { useContext, useEffect, useState } from "react";
import "./Index.css";
import toast from "react-hot-toast";
import request from "../../utils/request";
import { UserContext } from "../../utils/UserProvider.tsx";
import { User } from "../../types/User.ts";

function Index() {
  const [loading, setLoading] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<User[]>();
  const { setUser } = useContext(UserContext);

  const getUsers = async () => {
    setLoading(true);
    const { data } = await request.get("users");
    setAllUsers(data.docs);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="userContainer">
      <div className="userBox">
        {allUsers?.map((emp) => (
          <div onClick={() => setUser(emp)}>
            {emp._id}
            {emp.name}
            {emp.positionName}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Index;
