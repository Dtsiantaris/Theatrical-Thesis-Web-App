import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import EmailIcon from "@material-ui/icons/Email";
import { User } from "../types/User";

interface UserContextData {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  handleLogout: () => void;
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
    // If user is not verified and we haven't shown the toast in this session
    if (
      user &&
      !user.emailVerified &&
      !sessionStorage.getItem("emailVerificationToastShown")
    ) {
      toast(
        <div style={{ color: "black" }}>
          <div
            style={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            <EmailIcon style={{ marginRight: "10px" }} />
            <div>Please verify your email!</div>
          </div>
          <div style={{ fontStyle: "italic" }}>
            We have send you a link in your email address.
          </div>
        </div>
      );
      // Mark toast as shown for this session
      sessionStorage.setItem("emailVerificationToastShown", "true");
    }
  }, [user]);

  const handleLogout = () => {
    // Clear the authToken and reset the user state
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("emailVerificationToastShown");
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    if (isLoggedIn) {
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
    handleLogout,
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
