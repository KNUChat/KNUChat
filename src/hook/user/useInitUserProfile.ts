import { useMutation } from "@tanstack/react-query";
import userApi from "@api/user";
import { UserDataProps } from "@api/user";

const useInitUserProfile = (userData: UserDataProps) => {
  return useMutation({
    mutationFn: () => {
      return userApi.initUserProfile(userData);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export default useInitUserProfile;
