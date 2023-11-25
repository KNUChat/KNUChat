import { useQuery } from "@tanstack/react-query";
import userApi from "@api/user";

const useSearchUserProfile = () => {
  const queryKey = [];

  return useQuery(queryKey, () => userApi.getUserProfile({}), {});
};

export default useSearchUserProfile;
