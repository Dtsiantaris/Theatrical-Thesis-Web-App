// In your useRoleQueries hook
import { useCallback, useState } from "react";
import { mainAxios } from "../../utils/AxiosInstances";
import { Role } from "../../types/entities/Role";

export const useRoleQueries = () => {
  const [loading, setLoading] = useState(false);

  // Memoize fetchAvailableRoles to return the same function instance unless dependencies change
  const fetchAvailableRoles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await mainAxios.get("Roles");
      return response.data.data.results as Role[];
    } catch (error) {
      console.log("Error in fetching available roles", error);
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies, this function instance doesn't change across re-renders

  return { loading, fetchAvailableRoles };
};
