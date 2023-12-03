import { useMutation } from "@tanstack/react-query";
import recordApi, { NewRecordProps } from "@api/record";

const usePatchRecord = (recordPatchData: NewRecordProps) => {
  return useMutation({
    mutationFn: () => {
      return recordApi.patchRecord(recordPatchData);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export default usePatchRecord;
