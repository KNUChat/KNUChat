import styled from "styled-components";
import MyPageBox from "./MyPageBox";
import ContentBox from "./ContentBox";
import { useNavigate } from "react-router-dom";
import useSearchRecord from "@hook/record/useSearchRecord";
import { RecordSearchProps } from "@api/record";

export interface RecordProps {
  description: string;
  hashtags: string[];
  period: string;
  recordId: number;
  title: string;
  userId: number;
}

const Content = () => {
  const navigate = useNavigate();
  const temp: RecordSearchProps = {
    searchWord: "1",
    type: "user",
    page: 0,
  };
  const { data: recordData } = useSearchRecord(temp);
  console.log(recordData);
  const handleClickMore = () => {
    navigate("/record");
  };
  return (
    <ContentWrapper>
      <Header>
        <p>이력</p>
      </Header>
      {recordData.recordResponses &&
        recordData?.recordResponses.map((record: RecordProps) => {
          return (
            <ContentBox key={record.recordId}>
              <p>{record.description}</p>
            </ContentBox>
          );
        })}
      <DefaultButton onClick={() => handleClickMore()}>더보기</DefaultButton>
    </ContentWrapper>
  );
};

const RecordTab = () => {
  return (
    <RecordTabWrapper>
      <MyPageBox children={<Content />} />
    </RecordTabWrapper>
  );
};

export default RecordTab;

const RecordTabWrapper = styled.div`
  height: auto;
`;

const DefaultButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  transform: translateY(-50%);
  font-size: 12px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
