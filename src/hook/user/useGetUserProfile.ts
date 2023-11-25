import { useQuery } from "@tanstack/react-query";
import userApi from "@api/user";

const useGetUserProfile = () => {
  const { data } = useQuery({
    queryKey: [],
    queryFn: ({ queryKey }) => userApi.getUserProfile({ queryKey }),
  });
  console.log(data?.data);
  return { data: data?.data ?? [] };
};

export default useGetUserProfile;
