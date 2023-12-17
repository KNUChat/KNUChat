import ContentBox from "@components/MyPage/ContentBox";
import MyPageBox from "@components/MyPage/MyPageBox";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import useGetUserProfile from "@hook/user/useGetUserProfile";
import { UserDataProps } from "@api/user";
import { useUserStore } from "@store/useUserStore";
import DateRangePicker from "@components/Record/DateRangePicker";
import DefaultInput from "@components/Common/DefaultInput";
import useInitUserProfile from "@hook/user/useInitUserProfile";
import useUpdateUserProfile from "@hook/user/useUpdateUserProfile";

const ProfileContent = () => {
  const { userInfo } = useUserStore();
  const userId = parseInt(userInfo.id);
  const { data } = useGetUserProfile(userId);
  const userData: UserDataProps = data;
  const [selectedStatus, setSelectedStatus] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const statuses = ["재학", "휴학", "제적", "졸업"];
  useEffect(() => {
    if (userData?.profileDto?.academicStatus) {
      const statusMap = {
        ATTENDING: "재학",
        ENROLLMENT: "휴학",
        SUSPENSION: "제적",
        GRADUATION: "졸업",
      };

      const status = statusMap[userData.profileDto.academicStatus];
      if (status) {
        setSelectedStatus(status);
      }
    }
  }, [userData]);
  useEffect(() => {
    if (userData?.departmentDtos) {
      const departmentInputs = userData.departmentDtos.map(
        (department) => department.college + " " + department.depCategory + " " + department.major
      );
      setTextInputs((prevInputs) => {
        return [
          departmentInputs,
          prevInputs[1], // Maintain the other input states
          prevInputs[2], // Maintain the other input states
        ];
      });
    }
    if (userData?.certificationDtos) {
      const certificationInputs = userData.certificationDtos.map(
        (certification) => certification.achievement + " " + certification.name + " " + certification.obtainDate
      );
      setTextInputs((prevInputs) => {
        return [
          prevInputs[0], // Maintain the other input states
          certificationInputs,
          prevInputs[2], // Maintain the other input states
        ];
      });
    }
    if (userData?.urlDtos) {
      const linkInputs = userData.urlDtos.map((url) => url);
      setTextInputs((prevInputs) => {
        return [
          prevInputs[0], // Maintain the other input states
          prevInputs[1], // Maintain the other input states
          linkInputs,
        ];
      });
    }
  }, [userData]);

  const handleClick = (status: string) => {
    setSelectedStatus(status);
  };

  const [textInputs, setTextInputs] = useState([
    [""], // for 학과(전공)
    [""], // for 자격증/어학성적
    [""], // for 링크
  ]);

  const handleChange = (categoryIndex: number, inputIndex: number, event) => {
    const newInputs = [...textInputs];
    newInputs[categoryIndex][inputIndex] = event.target.value;
    setTextInputs(newInputs);
    // Set edited inputs for later saving
    const newEditedInputs = [...editedInputs];
    newEditedInputs[categoryIndex][inputIndex] = event.target.value;
    setEditedInputs(newEditedInputs);
  };
  const defaultInputRef = useRef(null);

  // Function to retrieve content from DefaultInput using the ref
  const getContentFromDefaultInput = () => {
    if (defaultInputRef.current) {
      const inputContent = defaultInputRef.current.value;
      console.log("Content from DefaultInput:", inputContent);
      // You can now use inputContent as needed
      return inputContent;
    }
  };
  const [newUserData, setNewUserData] = useState<UserDataProps>();
  const { mutate: initProfile } = useInitUserProfile(newUserData);
  const handleSaveAll = () => {
    console.log(textInputs);
    console.log(StartDate, EndDate);
    setNewUserData({
      userDto: {
        id: userId,
        name: "김현우",
        email: "krokerdile@knu.ac.kr",
        gender: "MALE",
      },
      profileDto: {
        stdNum: 18,
        academicStatus: "ATTENDING",
        graduateDate: "202408",
        admissionDate: "201803",
        introduction: getContentFromDefaultInput(),
        grade: 1,
      },
      departmentDtos: [
        {
          college: "컴퓨터학부",
          major: "글로벌SW융합전공",
          depCategory: "BASIC",
        },
      ],
      certificationDtos: [
        {
          name: "OPIC",
          achievement: "IM2",
          obtainDate: "20230505",
        },
      ],
      urlDtos: textInputs[2],
    });
    console.log(JSON.stringify(newUserData));
    console.log("newUserData", newUserData);
    initProfile();
  };

  const handleAdd = (categoryIndex: number) => {
    setTextInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[categoryIndex].push("");
      return newInputs;
    });
    // Add a blank entry in the edited inputs for consistency
    setEditedInputs((prevEditedInputs) => {
      const newEditedInputs = [...prevEditedInputs];
      newEditedInputs[categoryIndex].push("");
      return newEditedInputs;
    });
  };

  const [editedInputs, setEditedInputs] = useState(Array.from(Array(3), () => []));

  return (
    <ProfileContentWrapper>
      <MyPageBox>
        <Header>
          <p>간단소개글</p>
          <Button onClick={() => handleSaveAll()}>전체 저장</Button>
        </Header>
        <ContentBox>
          <DefaultInput ref={defaultInputRef} maxLength={200} defaultValue={userData && userData?.profileDto?.introduction} />
        </ContentBox>
        <p>학력</p>
        <ContentBox>
          <DateRangePicker
            setDefaultEndDate={setEndDate}
            setDefaultStartDate={setStartDate}
            DefaultStartDate={userData?.profileDto?.admissionDate}
            DefaultEndDate={userData?.profileDto?.graduateDate}
          />
        </ContentBox>
        <ButtonGroup>
          {statuses.map((status) => (
            <StatusButton key={status} selected={status === selectedStatus} onClick={() => handleClick(status)}>
              {status}
            </StatusButton>
          ))}
        </ButtonGroup>
        <ContentBox
          children={
            <>
              <p>학부(학과)/전공</p>
              {textInputs[0].map((textInput, index) => (
                <div key={index}>
                  <Input type="text" value={textInput} onChange={(event) => handleChange(0, index, event)} />
                </div>
              ))}
              <Button onClick={() => handleAdd(0)}>추가</Button>
            </>
          }
        />

        <ContentBox
          children={
            <>
              <p>자격증/어학성적</p>
              {textInputs[1].map((textInput, index) => (
                <div key={index}>
                  <Input type="text" value={textInput} onChange={(event) => handleChange(1, index, event)} />
                </div>
              ))}
              <Button onClick={() => handleAdd(1)}>추가</Button>
            </>
          }
        />

        <ContentBox
          children={
            <>
              <p>링크</p>
              {textInputs[2].map((textInput, index) => (
                <div key={index}>
                  {/* <Input type="text" value={textInput} onChange={(event) => handleChange(index, event)} /> */}
                  <Input type="text" value={textInput} onChange={(event) => handleChange(2, index, event)} />
                </div>
              ))}
              <Button onClick={() => handleAdd(2)}>추가</Button>
            </>
          }
        />
      </MyPageBox>
    </ProfileContentWrapper>
  );
};

const ProfileContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const StatusButton = styled.button<{ selected: boolean }>`
  background: ${(props) => (props.selected ? "#007BFF" : "#6C757D")};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  width: 70%;
  border: 1px solid #ced4da;
`;

export default ProfileContent;
