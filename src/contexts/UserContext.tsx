import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
// interfaces
import { User } from "../types/entities/User";
//utils & icons
import { toast } from "react-toastify";
import EmailIcon from "@mui/icons-material/Email";
import { mainAxios } from "../utils/AxiosInstances";

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

  // // In the user context
  // useEffect(() => {
  //   const authToken = localStorage.getItem("authToken");
  //   const authExpirationString = localStorage.getItem("authTokenExpiration");

  //   if (authToken && authExpirationString) {
  //     const expirationTime = parseInt(authExpirationString);
  //     const now = Date.now();

  //     if (now >= expirationTime) {
  //       // Token has expired, clear user and auth data
  //       localStorage.removeItem("authToken");
  //       localStorage.removeItem("user");
  //     } else {
  //       // Token is still valid, refresh it if needed
  //       const timeUntilExpiration = expirationTime - now;

  //       // Refresh the token a few minutes before it expires
  //       if (timeUntilExpiration > 5 * 60 * 1000) {
  //         // Check if more than 5 minutes left before expiration
  //         const refreshTimeout = setTimeout(() => {
  //           mainAxios.get("User/refresh-token");
  //         }, timeUntilExpiration - 5 * 60 * 1000);

  //         return () => clearTimeout(refreshTimeout); // Clear timeout on unmount
  //       }
  //     }
  //   } else {
  //     // No auth data found, clear localStorage
  //     localStorage.removeItem("authToken");
  //     localStorage.removeItem("user");
  //   }
  // }, []);

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
