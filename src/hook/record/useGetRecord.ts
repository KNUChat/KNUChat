import { useQuery } from "@tanstack/react-query";
import recordApi from "@api/record";

const useGetRecord = (recordId: number) => {
  const { data } = useQuery({
    queryKey: ["recordId", recordId],
    queryFn: ({ queryKey }) => recordApi.getRecord(queryKey),
  });
  return { data: data?.data ?? [] };
};

export default useGetRecord;
