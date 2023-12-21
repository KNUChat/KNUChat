import ContentBox from "@components/MyPage/ContentBox";
import MyPageBox from "@components/MyPage/MyPageBox";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { RecordSearchProps } from "@api/record";
import useSearchRecord from "@hook/record/useSearchRecord";
import { RecordProps } from "@components/MyPage/RecordTab";
import { useUserStore } from "@store/useUserStore";
import DropdownMenu from "@components/Common/DropdownMenu";

const RecordContent = () => {
  const [detailedViews, setDetailedViews] = useState<boolean[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { userInfo } = useUserStore();
  const userId = userInfo.id;
  const temp: RecordSearchProps = {
    searchWord: userId,
    type: "user",
    page: currentPage,
  };
  const { data: recordData, refetch } = useSearchRecord(temp);

  const navigate = useNavigate();

  const handleClickAddRecord = () => {
    navigate("/addRecord");
  };

  const handleClickPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    refetch({ page: currentPage });
  }, [currentPage, refetch]);

  const toggleDetailedView = (index: number) => {
    setDetailedViews((prev) => {
      const updatedViews = [...prev];
      updatedViews[index] = !updatedViews[index];
      return updatedViews;
    });
  };

  return (
    <RecordContentWrapper>
      <MyPageBox>
        <Header>
          <SubText>이력</SubText>
          <BlackButton onClick={() => handleClickAddRecord()}>추가</BlackButton>
        </Header>
        {recordData?.recordResponses &&
          recordData?.recordResponses.map((record: RecordProps, index: number) => {
            return (
              <ContentBox key={index}>
                <ContentHeader>
                  <UniversityText onClick={() => navigate(`/record/${record.recordId}`)}>{record.title}</UniversityText>
                  <DropdownMenu recordId={record.recordId} />
                </ContentHeader>
                <PeriodText>{record.period}</PeriodText>
                <Hashtags>
                  {record.hashtags &&
                    record.hashtags.map((tag, idx) => {
                      return <Hashtag key={idx}>{tag}</Hashtag>;
                    })}
                </Hashtags>
                <ContentMain isDetailedView={detailedViews[index] || false}>
                  <DescriptionText>{record.description}</DescriptionText>
                </ContentMain>
                <DetailButton onClick={() => toggleDetailedView(index)}>{detailedViews[index] ? "간략히 보기" : "자세히 보기"}</DetailButton>
              </ContentBox>
            );
          })}
        <PaginationWrapper>
          {recordData?.recordResponses &&
            Array.from(Array(recordData?.recordResponses.totalPages).keys()).map((pageNumber) => (
              <PageNumber key={pageNumber} onClick={() => handleClickPage(pageNumber)}>
                {pageNumber + 1}
              </PageNumber>
            ))}
        </PaginationWrapper>
      </MyPageBox>
    </RecordContentWrapper>
  );
};

export default RecordContent;

const RecordContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const DetailButton = styled.button`
  position: absolute;
  bottom: 2px;
  right: 10px;
  transform: translateY(-40%);
  font-size: 12px;
  color: #888888;
  border: 0px;
  background-color: #fafafa;
`;

const ContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
`;

const ContentMain = styled.div<{ isDetailedView: boolean }>`
  display: ${({ isDetailedView }) => (isDetailedView ? "flex" : "none")};
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  height: 2rem;
`;

const PageNumber = styled.button`
  margin: 0 0.5rem;
  padding: 0.5rem;
  border: 1px solid #333;
  color: #333;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 0.5rem;
  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

const BlackButton = styled.button`
  flex: 8;
  max-width: 3.5rem;
  max-height: 2rem;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #333;
  font-size: 16px;
  background-color: #fff;
  outline: none;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #222;
    color: #fff;
  }
`;

const SubText = styled.p`
  color: #222;
  font-weight: bold;
  font-size: 2rem;
  padding: 0;
  margin: 0;
`;

const UniversityText = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 4px;
  margin-bottom: 8px;
`;

const PeriodText = styled.p`
  color: #666;
  margin-bottom: 6px;
`;

const Hashtags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 6px;
`;

const Hashtag = styled.p`
  margin-right: 8px;
  margin-bottom: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  background-color: #f0f0f0;
  color: #333;
  font-size: 0.9rem;
`;

const DescriptionText = styled.p`
  font-weight: bold;
  margin-top: 12px;
`;
