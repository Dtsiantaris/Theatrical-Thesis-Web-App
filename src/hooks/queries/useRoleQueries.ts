import { useState } from "react";
import { mainAxios } from "../../utils/AxiosInstances";
import { Role } from "../../types/Role";

export const useRoleQueries = () => {
  const [loading, setLoading] = useState(false);

  const fetchAvailableRoles = async () => {
    setLoading(true);
    try {
      return (await mainAxios.get("Roles")).data as Role[];
    } catch (error) {
      console.log("Error in fetching available roles", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchAvailableRoles };
};
