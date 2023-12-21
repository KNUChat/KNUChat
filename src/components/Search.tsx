import ContentBox from "@components/MyPage/ContentBox";
import MyPageBox from "@components/MyPage/MyPageBox";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { RecordSearchProps } from "@api/record";
import useSearchRecord from "@hook/record/useSearchRecord";
import { RecordProps } from "@components/MyPage/RecordTab";
import { useSearchStore } from "@store/useSearchStore";

const Search = () => {
  const [detailedViews, setDetailedViews] = useState<boolean[]>([]); // 각 레코드의 상세 보기 상태를 관리하는 배열
  const { type, page, searchWord } = useSearchStore();
  const [currentPage, setCurrentPage] = useState(page);

  console.log("type", type, "page", page, "searchWord", searchWord);
  const temp: RecordSearchProps = {
    page: page,
    searchWord: searchWord,
    type: type,
  };
  const { data: recordData, refetch } = useSearchRecord(temp);
  console.log("recordData", recordData);

  const navigate = useNavigate();

  const handleClickAddRecord = () => {
    navigate("/addRecord");
  };

  const handleClickPage = (pageNumber: number) => {
    setCurrentPage(pageNumber); // Update current page on click
  };

  useEffect(() => {
    // When currentPage changes, refetch data based on the updated page number
    refetch({ page: currentPage });
  }, [currentPage, refetch]);

  const toggleDetailedView = (index: number) => {
    setDetailedViews((prev) => {
      const updatedViews = [...prev];
      updatedViews[index] = !updatedViews[index]; // 레코드의 상세 보기 상태를 토글
      return updatedViews;
    });
  };

  return (
    <RecordContentWrapper>
      <MyPageBox>
        <Header>
          <SubText>이력 검색결과</SubText>
          <BlackButton onClick={() => handleClickAddRecord()}>추가</BlackButton>
        </Header>
        {recordData?.recordResponses &&
          recordData?.recordResponses.map((record: RecordProps, index: number) => {
            return (
              <ContentBox key={index}>
                <ContentHeader>
                  <UniversityText
                    onClick={() => {
                      navigate(`/record/${record.recordId}`);
                    }}
                  >
                    {record.title}
                  </UniversityText>
                  <Hashtags>{record.hashtags}</Hashtags>
                  <PeriodText>{record.period}</PeriodText>
                </ContentHeader>
                <ContentMain isDetailedView={detailedViews[index] || false}>
                  <p>{record.description}</p>
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

export default Search;

const RecordContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const PeriodText = styled.p`
  color: #666;
  margin-bottom: 6px;
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
  flex-direction: column;
`;

const ContentMain = styled.div<{ isDetailedView: boolean }>`
  display: ${({ isDetailedView }) => (isDetailedView ? "flex" : "none")};
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  cursor: pointer;

  &:hover {
    background-color: #e8e8e8;
  }
`;

const BlackButton = styled.button`
  flex: 8;
  max-width: 3.5rem;
  max-height: 2rem;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #333; /* Change border color to a darker shade */
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

const Hashtags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 6px;
`;
