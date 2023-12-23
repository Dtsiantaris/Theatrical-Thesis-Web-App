import { useState } from "react";
import { mainAxios } from "../../utils/AxiosInstances";

export const useVenueMutations = () => {
  const [loading, setLoading] = useState(false);

  const updateVenue = async (id: number, title: string, address: string) => {
    setLoading(true);
    try {
      await mainAxios.put("Venues/update", {
        id,
        title,
        address,
      });
      return true;
    } catch (error) {
      console.log("Error in update venue", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateVenue };
};
