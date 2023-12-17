import { useMutation } from "@tanstack/react-query";
import recordApi, { PatchRecordProps } from "@api/record";

const usePatchRecord = () => {
  return useMutation({
    mutationFn: ({ id, title, achievement, period, description, urls, hashtags }: PatchRecordProps) => {
      return recordApi.patchRecord({ id, title, achievement, period, description, urls, hashtags });
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default usePatchRecord;
