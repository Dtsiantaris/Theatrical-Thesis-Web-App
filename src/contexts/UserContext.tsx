import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  email: string;
}

interface UserContextData {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextData | undefined>(undefined);

export const UserContextProvider: React.FC<UserProviderProps> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );
  const userItem = localStorage.getItem("user");
  const [user, setUser] = useState<User | null>(
    userItem ? JSON.parse(userItem) : null
  );

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("authToken", "yourAuthTokenHere");
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    }
  }, [isLoggedIn, user]);

  const contextValue: UserContextData = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
