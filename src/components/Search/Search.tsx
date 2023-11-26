import ContentBox from "@components/MyPage/ContentBox";
import styled from "styled-components";
import Divider from "@components/Common/Divder";

const Search = () => {
  return (
    <SearchWrapper>
      <p>"컴퓨터 학부" 검색 결과</p>
      <Divider />
      <ContentBox>
        <p>사용자</p>
        <p>컴퓨터학부|글로벌SW융합전공</p>
      </ContentBox>
    </SearchWrapper>
  );
};

export default Search;

const SearchWrapper = styled.div`
  width: calc(100% - 2rem);
  min-height: calc(100% - 1rem);
  padding: 0 1rem 1rem 1rem;
  margin-top: 0.5rem;
`;
