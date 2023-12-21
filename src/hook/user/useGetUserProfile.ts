import { useQuery } from "@tanstack/react-query";
import userApi from "@api/user";
import { response } from "express";
import { useNavigate } from "react-router-dom";

const useGetUserProfile = (userId: number) => {
  const navigate = useNavigate();
  const { data, error } = useQuery({
    queryKey: ["userId", userId],
    queryFn: ({ queryKey }) => userApi.getUserProfile(queryKey),
  });

  if (error) {
    if (error?.response?.data?.message == "존재하지 않는 Profile입니다." || error?.response?.data?.status == 404) {
      navigate("/profile");
    }
  }

  return { data: data?.data ?? [] };
};

export default useGetUserProfile;
