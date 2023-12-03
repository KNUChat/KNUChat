import { useQuery } from "@tanstack/react-query";
import userApi from "@api/user";

const useGetUserProfile = (userId: number) => {
  const { data } = useQuery({
    queryKey: ["userId", userId],
    queryFn: ({ queryKey }) => userApi.getUserProfile(queryKey),
  });
  return { data: data?.data ?? [] };
};

export default useGetUserProfile;
