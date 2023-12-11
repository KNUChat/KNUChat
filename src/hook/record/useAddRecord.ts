import { useMutation } from "@tanstack/react-query";
import recordApi, { NewRecordProps } from "@api/record";

const useAddRecord = () => {
  return useMutation({
    mutationFn: ({ userId, title, description, period, achievement, hashtag }: NewRecordProps) => {
      return recordApi.addRecord({
        userId,
        title,
        description,
        period,
        achievement,
        hashtag,
      });
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export default useAddRecord;
