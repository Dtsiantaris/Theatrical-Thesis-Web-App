//hooks
import { useState } from "react";
import { mainAxios } from "../../utils/AxiosInstances";

export const useUserMutations = () => {
  const [loading, setLoading] = useState(false);

  const toggle2FA = async (enable: boolean) => {
    setLoading(true);
    try {
      let result = false;
      result = enable
        ? await mainAxios.post("User/enable2fa")
        : await mainAxios.post("User/disable2fa");
      return result;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateSocial = async (
    link: string,
    type: "facebook" | "instagram" | "youtube"
  ) => {
    setLoading(true);
    try {
      let result = false;
      result = await mainAxios.put(
        `User/@/${type}?link=${encodeURIComponent(link)}`
      );

      return result;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { toggle2FA, updateSocial, loading };
};
