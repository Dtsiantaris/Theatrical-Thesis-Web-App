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
      return undefined;
    }
  };

  return { toggle2FA };
};
