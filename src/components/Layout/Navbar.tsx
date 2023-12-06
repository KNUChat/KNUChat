import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useModalStore from "@store/useModalStore";

const Navbar = () => {
  const navigate = useNavigate();
  const handleClickLogo = () => {
    navigate("/");
  };
  const handleClickMyPage = () => {
    navigate("/me");
  };
  const { setModalType, setShowModal } = useModalStore();

  const showExampleModal = () => {
    setModalType("example");
    setShowModal(true);
  };
  const ref = useRef<HTMLInputElement>(null);
  return (
    <NavbarWrapper>
      <BoxWrapper>
        <LeftBox>
          <p onClick={() => handleClickLogo()}>KNUChat</p>
        </LeftBox>
        <SearchBox>
          <input ref={ref} />
        </SearchBox>
        <RightBox>
          <button onClick={() => showExampleModal()}>modalTest</button>
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
  justify-content: center;
`;

const RightBox = styled.div`
  flex-grow: 1;
`;
