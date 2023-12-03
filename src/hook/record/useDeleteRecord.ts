import { useMutation } from "@tanstack/react-query";
import recordApi from "@api/record";

const useDeleteRecord = (recordId: number) => {
  return useMutation({
    mutationFn: () => {
      return recordApi.deleteRecord(recordId);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export default useDeleteRecord;
