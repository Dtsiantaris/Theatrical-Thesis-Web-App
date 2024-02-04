import { useState } from "react";
import { mainAxios } from "../../utils/AxiosInstances";
//interfaces
import { User } from "../../types/entities/User";
//hooks
import { useUserContext } from "../../contexts/UserContext";

export const useUserQueries = () => {
  const [loading, setLoading] = useState(false);
  const { setUser, setIsLoggedIn } = useUserContext();

  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const res = await mainAxios.get("User/info");
      const user = res.data.data as User;
      setIsLoggedIn(true);
      setUser(user);
      console.log("user", user);
      return user;
    } catch (error) {
      console.log(error);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return { fetchUserInfo, loading };
};
