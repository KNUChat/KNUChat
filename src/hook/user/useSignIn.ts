import { useQuery } from "@tanstack/react-query";
import userApi from "@api/user";

const useSignIn = () => {
  const queryKey = [];

  return useQuery(queryKey, () => userApi.signIn({}), {});
};

export default useSignIn;
