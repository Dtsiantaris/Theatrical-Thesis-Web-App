import { useState } from "react";
import { mainAxios } from "../../utils/AxiosInstances";
import { Role } from "../../types/entities/Role";

export const useRoleQueries = () => {
  const [loading, setLoading] = useState(false);

  const fetchAvailableRoles = async () => {
    setLoading(true);
    try {
      return (await mainAxios.get("Roles")).data.data.results as Role[];
    } catch (error) {
      console.log("Error in fetching available roles", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchAvailableRoles };
};
