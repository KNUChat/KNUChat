import { useQuery } from "@tanstack/react-query";
import recordApi from "@api/record";

const useSearchRecord = () => {
  const queryKey = [];

  return useQuery(queryKey, () => recordApi.getRecord({}), {});
};

export default useSearchRecord;
