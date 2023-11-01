//hooks
import { mainAxios } from "../../utils/AxiosInstances";

export const useUserMutations = () => {
  const toggle2FA = async (enable: boolean) => {
    try {
      let result = false;
      result = enable
        ? await mainAxios.post("User/enable2fa")
        : await mainAxios.post("User/disable2fa");
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const updateSocial = async (
    link: string,
    type: "facebook" | "instagram" | "youtube"
  ) => {
    try {
      let result = false;
      switch (type) {
        case "facebook":
          result = await mainAxios.put("User/@/facebook", link);
          break;
        case "instagram":
          result = await mainAxios.put("User/@/instagram", link);
          break;
        case "youtube":
          result = await mainAxios.put("User/@/youtube", link);
      }
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return { toggle2FA, updateSocial };
};
