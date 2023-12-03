import { useMutation } from "@tanstack/react-query";
import userApi from "@api/user";

const useDeleteUserProfile = (userId: number) => {
  return useMutation({
    mutationFn: () => {
      return userApi.deleteUserProfile(userId);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export default useDeleteUserProfile;
