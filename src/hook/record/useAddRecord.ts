import { useMutation } from "@tanstack/react-query";
import recordApi from "@api/record";
import { NewRecordProps } from "@api/record";

const useAddRecord = (recordData: NewRecordProps) => {
  return useMutation({
    mutationFn: () => {
      return recordApi.addRecord(recordData);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export default useAddRecord;
