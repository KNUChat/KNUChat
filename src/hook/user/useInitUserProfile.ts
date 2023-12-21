import { useMutation } from "@tanstack/react-query";
import userApi from "@api/user";
import { UserDataProps } from "@api/user";

const useInitUserProfile = (userData: UserDataProps) => {
  return useMutation({
    mutationFn: () => {
      console.log("userData", userData);
      return userApi.initUserProfile(userData);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useInitUserProfile;
