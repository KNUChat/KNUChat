import { useMutation } from "@tanstack/react-query";
import recordApi from "@api/record";

const useDeleteRecord = () => {
  return useMutation({
    mutationFn: () => {
      return recordApi.deleteRecord();
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export default useDeleteRecord;
