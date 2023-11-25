import { useMutation } from "@tanstack/react-query";
import userApi from "@api/user";

const useDeleteUserProfile = () => {
  return useMutation({
    mutationFn: () => {
      return userApi.deleteUserProfile();
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export default useDeleteUserProfile;
