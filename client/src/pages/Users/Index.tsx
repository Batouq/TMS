import { useContext, useEffect, useState } from "react";
import "./Index.css";
import toast from "react-hot-toast";
import request from "../../utils/request";
import { UserContext } from "../../utils/UserProvider.tsx";
import { User } from "../../types/types.ts";
import ActionButton from "../../components/ActionButton.tsx";
function Index() {
  const [allUsers, setAllUsers] = useState<User[]>();
  const { setUser } = useContext(UserContext);

  const getUsers = async () => {
    const { data } = await request.get("/users");
    setAllUsers(data.docs);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="userContainer">
      {allUsers?.map((emp) => (
        <div className="userInfo">
          <span>ID: {emp._id}</span>
          <span>User Name: {emp.name}</span>
          <span>Position: {emp.positionName}</span>
          <ActionButton
            title="Select"
            disabled={false}
            action={() => {
              setUser(emp);
              toast.success(`selected ${emp.name} successfully`);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default Index;
