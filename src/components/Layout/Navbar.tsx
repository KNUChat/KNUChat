import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import useModalStore from "../../store/useModalStore";
import { useSearchStore } from "@store/useSearchStore";
import { useAuthStore } from "@store/useAuthStore";
import axios, { AxiosError } from "axios";
import ContentBox from "@components/MyPage/ContentBox";

const Navbar = () => {
  const navigate = useNavigate();
  const handleClickLogo = () => {
    navigate("/");
  };
  const handleClickMyPage = () => {
    navigate("/me");
  };
  const { setModalType, setShowModal } = useModalStore();
  const { setAuthToken } = useAuthStore();

  const { setPage, setSearchWord, setType } = useSearchStore();
  const showExampleModal = () => {
    setModalType("example");
    setShowModal(true);
  };
  const ref = useRef<HTMLInputElement>(null);

  const [searchType, setSearchType] = useState("");
  const { authToken } = useAuthStore();

  const handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value);
  };
  // record?page=0&searchWord=1&type=user
  const handleSearch = () => {
    const keyword = ref.current?.value;
    console.log("keyword", keyword);
    if (keyword) {
      if (keyword.startsWith("#")) {
        // 해시태그 검색 로직
      } else {
        console.log("searchType", searchType);
        switch (searchType) {
          case "선택":
            alert("조건을 선택하셔야 됩니다.");
            break;
          case "사용자":
            setType("user");
            setPage(0);
            setSearchWord(keyword);
            navigate("/search");
            break;
          case "해시태그":
            setType("hashtag");
            setPage(0);
            setSearchWord(keyword);
            navigate("/search");
            break;
          case "소속":
            setType("keyword");
            setPage(0);
            setSearchWord(keyword);
            navigate("/search");
            break;
          default:
            break;
        }
      }
    }
  };

  const handleDeleteToken = () => {
    // const getRefresh = async () => {
    //   try {
    //     const response = await axios.get(`http://52.79.37.100:32100/refresh`, {
    //       withCredentials: true,
    //       headers: {
    //         Authorization: authToken,
    //         RefreshToken:
    //           "eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE3MDI5NzUwNDN9.ky5dqiWjCmEFXHYPgJEkOW37LyLZe5gPukDjvGVkCpkZM8LZd4ZdY1-VOPfliGp2YDldqLPYdwEeeMu3AsUh1Q",
    //       },
    //     });
    //     console.log(response);
    //   } catch (error) {
    //     const err = error as AxiosError;
    //     if (err.response) {
    //       console.log({ status: err.response.status, message: err.response.data.message });
    //     }
    //   }
    // };
    // getRefresh();
    navigate("/login");
  };
  return (
    <NavbarWrapper>
      <BoxWrapper>
        <LeftBox>
          <LogoText onClick={() => handleClickLogo()}>KNUChat</LogoText>
        </LeftBox>
        <SearchBox>
          <select style={{ flex: 1 }} onChange={handleChangeType}>
            <option value="선택">선택</option>
            <option value="사용자">사용자</option>
            <option value="해시태그">해시태그</option>
            <option value="소속">소속</option>
          </select>
          <input style={{ flex: 8 }} ref={ref} />
          <button style={{ flex: 1 }} onClick={handleSearch}>
            검색
          </button>
        </SearchBox>
        <RightBox>
          {/* <button onClick={() => showExampleModal()}>modalTest</button> */}

          <RightButton onClick={() => handleClickMyPage()}>mypage</RightButton>
          <RightButton onClick={() => handleDeleteToken()}>logout</RightButton>
          {/* <button onClick={() => handleDeleteToken()}>test</button> */}
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
  gap: 14rem;
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
  gap: 0.5rem;

  select {
    flex: 1;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #333; /* Change border color to a darker shade */
    font-size: 16px;
    outline: none;
  }

  input {
    flex: 8;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #333; /* Change border color to a darker shade */
    font-size: 16px;
    outline: none;
  }

  button {
    flex: 1;
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    background-color: #333; /* Change button background color */
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    outline: none;
    &:hover {
      background-color: #222; /* Change button hover background color */
    }
  }
`;

const RightBox = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const LogoText = styled.p`
  color: #d20f17;
  font-weight: bold;
  font-size: 2rem;
`;

const RightButton = styled.button`
  flex: 8;
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
