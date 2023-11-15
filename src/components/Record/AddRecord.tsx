import styled from "styled-components";
import MyPageBox from "@components/MyPage/MyPageBox";
import ContentBox from "@components/MyPage/ContentBox";

const AddRecord = () => {
  return (
    <AddRecordWrapper>
      <MyPageBox>
        <p>이력 작성하기</p>
        <button>추가</button>
        <ContentBox />
      </MyPageBox>
    </AddRecordWrapper>
  );
};

export default AddRecord;

const AddRecordWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
