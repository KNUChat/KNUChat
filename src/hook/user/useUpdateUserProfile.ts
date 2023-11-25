import { useMutation } from "@tanstack/react-query";
import userApi from "@api/user";

const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: () => {
      return userApi.updateUserProfile();
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export default useUpdateUserProfile;
