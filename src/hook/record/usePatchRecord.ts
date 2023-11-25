import { useMutation } from "@tanstack/react-query";
import recordApi from "@api/record";

const usePatchRecord = () => {
  return useMutation({
    mutationFn: () => {
      return recordApi.patchRecord();
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export default usePatchRecord;
