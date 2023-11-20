import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const handleClickLogo = () => {
    navigate("/");
  };
  const handleClickMyPage = () => {
    navigate("/me");
  };
  const ref = useRef<HTMLInputElement>(null);

  const [searchType, setSearchType] = useState("학과");

  const handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value);
  };

  const handleSearch = () => {
    const keyword = ref.current?.value;
    if (keyword) {
      if (keyword.startsWith("#")) {
        // 해시태그 검색 로직
      } else {
        switch (searchType) {
          case "학과":
            // 학과 검색 로직
            break;
          case "사용자":
            // 사용자 검색 로직
            break;
          case "이력":
            // 이력 검색 로직
            break;
          default:
            break;
        }
      }
    }
  };
  return (
    <NavbarWrapper>
      <BoxWrapper>
        <LeftBox>
          <p onClick={() => handleClickLogo()}>KNUChat</p>
        </LeftBox>
        <SearchBox>
          <select style={{ flex: 1 }} onChange={handleChangeType}>
            <option value="학과">학과</option>
            <option value="사용자">사용자</option>
            <option value="이력">이력</option>
          </select>
          <input style={{ flex: 8 }} ref={ref} />
          <button style={{ flex: 1 }} onClick={handleSearch}>
            검색
          </button>
        </SearchBox>
        <RightBox>
          <button onClick={() => handleClickMyPage()}>mypage</button>
        </RightBox>
      </BoxWrapper>
    </NavbarWrapper>
  );
};

export default Navbar;

const NavbarWrapper = styled.div`
  width: 100%;
  height: 8vh;
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  justify-content: center;
`;

const BoxWrapper = styled.div`
  width: 75%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LeftBox = styled.div`
  flex-grow: 1;
`;
const SearchBox = styled.div`
  display: flex;
  flex-grow: 3;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const RightBox = styled.div`
  flex-grow: 1;
`;
