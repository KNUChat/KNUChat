import { useQuery } from "@tanstack/react-query";
import recordApi, { RecordSearchProps } from "@api/record";

const useSearchRecord = (filterData: RecordSearchProps) => {
  const { data } = useQuery({
    queryKey: ["filterData", filterData],
    queryFn: ({ queryKey }) => recordApi.getRecord(queryKey),
  });
  return { data: data?.data ?? [] };
};

export default useSearchRecord;
