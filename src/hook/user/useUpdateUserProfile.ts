import { useMutation } from "@tanstack/react-query";
import userApi, { UserDataProps } from "@api/user";

const useUpdateUserProfile = (userData: UserDataProps) => {
  return useMutation({
    mutationFn: () => {
      return userApi.updateUserProfile(userData);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useUpdateUserProfile;
