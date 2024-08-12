import React, { createContext, ReactNode, useState } from "react";
import { User } from "../types/User";

const defaultUserContextValue = {
  user: undefined as User | undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser: (_user: User | undefined) => {},
};
export const UserContext = createContext(defaultUserContextValue);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
