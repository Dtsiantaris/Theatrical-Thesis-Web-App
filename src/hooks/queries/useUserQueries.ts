import { useState } from "react";
import { mainAxios } from "../../utils/AxiosInstances";
//interfaces
import { User } from "../../types/User";
//hooks
import { useUserContext } from "../../contexts/UserContext";

export const useUserQueries = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserContext();

  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const res = await mainAxios.get("User/info");
      const user = res.data.data as User;
      setUser(user);
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
