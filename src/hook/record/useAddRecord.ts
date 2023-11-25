import { useMutation } from "@tanstack/react-query";
import recordApi from "@api/record";

const useAddRecord = () => {
  return useMutation({
    mutationFn: () => {
      return recordApi.addRecord();
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export default useAddRecord;
