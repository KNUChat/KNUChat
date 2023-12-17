import MyPageBox from "@components/MyPage/MyPageBox";
import useModalStore from "@store/useModalStore";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserStore } from "@store/useUserStore";

const SideContent = () => {
  const { setModalType, setShowModal } = useModalStore();
  const { recordId, profileId } = useParams<{ recordId: string; profileId: string }>();
  const { pathname } = useLocation();
  const { userInfo } = useUserStore();
  const userId = userInfo.id;
  const userName = "test1";
  const showExampleModal = () => {
    setModalType("example");
    setShowModal(true);
  };
  const [selectedContent, setSelectedContent] = useState<React.ReactNode | null>(null);
  const ContentTable = {
    "/me": (
      <>
        <UserProfileLink to={`/profile/${userId}`}>
          <Circle>{userId}</Circle>
          <UserName>{userName}</UserName>
        </UserProfileLink>
        <Divider />
        <h2>Other Functions</h2>
        <LinkToOtherFunctionalities>개인정보 수정하기</LinkToOtherFunctionalities>
        <LinkToOtherFunctionalities>이력 추가하기</LinkToOtherFunctionalities>
        <LinkToOtherFunctionalities>채팅방 이동하기</LinkToOtherFunctionalities>
      </>
    ),
    "/profile": (
      <>
        <BlackButton onClick={() => showExampleModal()}>modalTest</BlackButton>
      </>
    ),
    "/record": (
      <>
        <BlackButton onClick={() => showExampleModal()}>modalTest</BlackButton>
      </>
    ),
    "/addRecord": (
      <>
        <BlackButton onClick={() => showExampleModal()}>modalTest</BlackButton>
      </>
    ),
    "/search": (
      <>
        <BlackButton onClick={() => showExampleModal()}>modalTest</BlackButton>
      </>
    ),
  };
  useEffect(() => {
    const renderSelectedContent = () => {
      if (pathname.startsWith("/record/edit/") && recordId) {
        setSelectedContent(
          <>
            <BlackButton onClick={() => showExampleModal()}>modalTest</BlackButton>
          </>
        );
      } else if (pathname.startsWith("/record/") && recordId) {
        setSelectedContent(
          <>
            <BlackButton onClick={() => showExampleModal()}>modalTest</BlackButton>
          </>
        );
      } else if (pathname.startsWith("/profile/") && profileId) {
        setSelectedContent(
          <>
            <BlackButton onClick={() => showExampleModal()}>modalTest</BlackButton>
          </>
        );
      } else {
        setSelectedContent(ContentTable[pathname]);
      }
    };

    renderSelectedContent();
  }, [pathname]);
  return (
    <SideContentWrapper>
      <MyPageBox>{selectedContent}</MyPageBox>
    </SideContentWrapper>
  );
};

export default SideContent;

const SideContentWrapper = styled.div`
  height: auto;
  width: 100%;
`;

const BlackButton = styled.button`
  flex: 8;
  width: 100%;
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

const UserProfileLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 16px 0;
`;

const LinkToOtherFunctionalities = styled.a`
  font-weight: bold;
  text-decoration: none;
  color: #333;
  display: block;
  margin-bottom: 8px;
  &:hover {
    text-decoration: underline;
  }
`;
