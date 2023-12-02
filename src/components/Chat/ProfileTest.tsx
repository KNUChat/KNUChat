import React from "react";
import styled from "styled-components";

const ProfileTest: React.FC = () => {
  // 더미 데이터 예시
  const dummyUserProfile = {
    userDto: {
      name: "John Doe",
      email: "john.doe@example.com",
    },
    departmentDtos: {
      Collage: "Engineering",
      department: "Computer Science",
      major: "Software Engineering",
    },
  };

  return (
    <ProfileWrapper>
      <div>Name: {dummyUserProfile.userDto.name}</div>
      <div>Email: {dummyUserProfile.userDto.email}</div>
      <div>Collage: {dummyUserProfile.departmentDtos.Collage}</div>
      <div>Department: {dummyUserProfile.departmentDtos.department}</div>
      <div>Major: {dummyUserProfile.departmentDtos.major}</div>
    </ProfileWrapper>
  );
};

export default ProfileTest;

const ProfileWrapper = styled.div`
  text-align: center;
`;
