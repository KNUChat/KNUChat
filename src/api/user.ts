import clientApi from "./axios";
interface UserDto {
  id: number;
  name: string;
  email: string;
  gender: "MALE" | "FEMALE" | "OTHER"; // 수정 가능한 성별 옵션들
}

interface ProfileDto {
  stdNum: number;
  academicStatus: "ATTENDING" | "ENROLLMENT" | "GRADUATION" | "SUSPENSION"; // 학적 상태 옵션들
  graduateDate?: string; // 선택적으로 nullable한 값
  admissionDate: string;
  introduction: string;
  grade: number;
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
  expireDate?: string;
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
    return await clientApi.user.get("/oauth2");
  },
  signUp: async () => {
    return await clientApi.user.post("/users/signup");
  },
  initUserProfile: async (userData: UserDataProps) => {
    console.log(userData.departmentDtos);
    console.log(userData.certificationDtos);
    console.log(userData.urlDtos);
    const initData = JSON.stringify({
      userDto: { id: userData.userDto.id, name: userData.userDto.name, email: userData.userDto.email, gender: userData.userDto.gender },
      profileDto: {
        stdNum: userData.profileDto.stdNum,
        academicStatus: userData.profileDto.academicStatus,
        graduateDate: userData.profileDto.graduateDate,
        admissionDate: userData.profileDto.admissionDate,
        introduction: userData.profileDto.introduction,
        grade: 0,
      },
      departmentDtos: userData.departmentDtos,
      certificationDtos: userData.certificationDtos,
      urlDtos: userData.urlDtos,
    });
    console.log(initData);
    return await clientApi.user.post("/users", {
      userDto: { id: userData.userDto.id, name: userData.userDto.name, email: userData.userDto.email, gender: userData.userDto.gender },
      profileDto: {
        stdNum: userData.profileDto.stdNum,
        academicStatus: userData.profileDto.academicStatus,
        graduateDate: userData.profileDto.graduateDate,
        admissionDate: userData.profileDto.admissionDate,
        introduction: userData.profileDto.introduction,
        grade: 1,
      },
      departmentDtos: userData.departmentDtos,
      certificationDtos: userData.certificationDtos,
      urlDtos: userData.urlDtos,
    });
  },
  getUserProfile: async (queryKey: (string | number)[]) => {
    const userId = queryKey[1];
    return await clientApi.user.get(`/users/${userId}`);
  },
  updateUserProfile: async (userData: UserDataProps) => {
    console.log(userData.departmentDtos);
    return await clientApi.user.patch("/users", {
      userDto: { id: userData.userDto.id, name: userData.userDto.name, email: userData.userDto.email, gender: userData.userDto.gender },
      profileDto: {
        stdNum: userData.profileDto.stdNum,
        academicStatus: userData.profileDto.academicStatus,
        graduateDate: userData.profileDto.graduateDate,
        admissionDate: userData.profileDto.admissionDate,
        introduction: userData.profileDto.introduction,
        grade: 1,
      },
      departmentDtos: userData.departmentDtos,
      certificationDtos: userData.certificationDtos,
      urlDtos: userData.urlDtos,
    });
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
