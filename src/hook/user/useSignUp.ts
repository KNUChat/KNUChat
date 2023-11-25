import { useMutation } from "@tanstack/react-query";
import userApi from "@api/user";

const useSignUp = () => {
  return useMutation({
    mutationFn: () => {
      return userApi.signUp();
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export default useSignUp;
