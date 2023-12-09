//hooks
import { useState } from "react";
import { mainAxios } from "../../utils/AxiosInstances";
import { useUserContext } from "../../contexts/UserContext";
import { useUserQueries } from "../queries/useUserQueries";
import { AxiosResponse } from "axios";

export const useUserMutations = () => {
  const { setIsLoggedIn, user } = useUserContext();
  const { fetchUserInfo } = useUserQueries();
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
      console.log("Error toggling 2fa", error);
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
      console.log("Error updating social", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   *
   * @param email
   * @param password
   * @returns `-1` if failed due to 2faEnabled
   */
  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await mainAxios.post("User/login", {
        email,
        password,
      });
      //this will not reach if 2fa enabled
      setIsLoggedIn(true);
      await fetchUserInfo();
    } catch (error) {
      // Handle other errors
      if ((error as Error).message === "twoFactorEnabled") {
        console.log("Error in login:", error);
        return -1;
      }
    } finally {
      setLoading(false);
    }
  };

  const claimAccount = async (
    personId: number,
    identificationDocument: string
  ) => {
    setLoading(true);
    try {
      return (await mainAxios.post("AccountRequests/RequestAccount", {
        personId,
        identificationDocument,
      })) as AxiosResponse<{
        success: boolean;
        message: string;
        errorCode: string;
      }>;
    } catch (error) {
      console.log("Error in claiming account:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const uploadUserPhoto = async (
    photo: string,
    label: string,
    isProfile: boolean
  ) => {
    setLoading(true);
    try {
      return await mainAxios.post("User/UploadPhoto", {
        photo,
        label,
        isProfile,
      });
    } catch (error) {
      console.log("Error in uploading user photo:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteUserPhoto = async (imageId: number) => {
    setLoading(true);
    try {
      return await mainAxios.delete(`User/Remove/Image/${imageId}`);
    } catch (error) {
      console.log("Error in delete user photo:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    toggle2FA,
    updateSocial,
    loginUser,
    claimAccount,
    uploadUserPhoto,
    deleteUserPhoto,
    loading,
  };
};
