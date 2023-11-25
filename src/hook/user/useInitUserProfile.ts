import { useMutation } from "@tanstack/react-query";
import userApi from "@api/user";

const useInitUserProfile = () => {
  return useMutation({
    mutationFn: () => {
      return userApi.initUserProfile();
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export default useInitUserProfile;
