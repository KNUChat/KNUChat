import { useQuery } from "@tanstack/react-query";
import recordApi, { RecordSearchProps } from "@api/record";

const useSearchRecord = (filterData: RecordSearchProps) => {
  const { data, refetch } = useQuery({
    queryKey: ["filterData", filterData],
    queryFn: ({ queryKey }) => recordApi.searchRecord(queryKey),
  });

  const searchData = data?.data ?? [];

  return { data: searchData, refetch }; // Return data and refetch function
};

export default useSearchRecord;
