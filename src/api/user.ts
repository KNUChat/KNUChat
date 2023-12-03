import clientApi from "./axios";
interface UserDto {
  id: number;
  name: string;
  email: string;
  gender: "MALE" | "FEMALE" | "OTHER"; // 수정 가능한 성별 옵션들
}

interface ProfileDto {
  stdNum: number;
  academicStatus: "ENROLLMENT" | "GRADUATION" | "SUSPENSION"; // 학적 상태 옵션들
  graduateDate?: string; // 선택적으로 nullable한 값
  admissionDate: string;
  introduction: string;
}

interface DepartmentDto {
  college: string;
  major: string;
  depCategory: "BASIC" | "MAJOR" | "MINOR"; // 학과 카테고리 옵션들
}

interface CertificationDto {
  name: string;
  achievement: string;
  obtainDate: string;
}

export interface UserDataProps {
  userDto: UserDto;
  profileDto: ProfileDto;
  departmentDtos: DepartmentDto[];
  certificationDtos: CertificationDto[];
  urlDtos: string[];
}

export interface UserSearchProps {
  page: number;
  major: string;
}
const userApi = {
  signIn: async () => {
    return await clientApi.user.get("users/signin");
  },
  signUp: async () => {
    return await clientApi.user.post("/users/signup");
  },
  initUserProfile: async (userData: UserDataProps) => {
    return await clientApi.user.post("/users/", { userData });
  },
  getUserProfile: async (queryKey: (string | number)[]) => {
    const userId = queryKey[1];
    return await clientApi.user.get(`/users/${userId}`);
  },
  updateUserProfile: async (userData: UserDataProps) => {
    return await clientApi.user.patch("/users/", { userData });
  },
  deleteUserProfile: async (userId: number) => {
    return await clientApi.user.delete(`/users?${userId}`);
  },
  searchUserProfile: async (queryKey: (string | UserSearchProps)[]) => {
    const searchData = queryKey[1];
    if (typeof searchData !== "string") {
      // searchData가 UserSearchProps 타입인 경우에만 page 속성에 접근
      return await clientApi.user.get(`/users?page=${searchData.page}&major=${searchData.major}`);
    }
  },
};

export default userApi;
