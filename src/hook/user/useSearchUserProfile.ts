import { useQuery } from "@tanstack/react-query";
import userApi, { UserSearchProps } from "@api/user";

const useSearchUserProfile = (searchData: UserSearchProps) => {
  const { data } = useQuery({
    queryKey: ["searchData", searchData],
    queryFn: ({ queryKey }) => userApi.searchUserProfile(queryKey),
  });
  console.log(data?.data);
  return { data: data?.data ?? [] };
};

export default useSearchUserProfile;
