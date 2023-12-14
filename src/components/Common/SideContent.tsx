import MyPageBox from "@components/MyPage/MyPageBox";
import useModalStore from "@store/useModalStore";
import styled from "styled-components";

const SideContent = () => {
  const { setModalType, setShowModal } = useModalStore();
  const showExampleModal = () => {
    setModalType("example");
    setShowModal(true);
  };
  return (
    <SideContentWrapper>
      <MyPageBox>
        <p>SideContent</p>
        <button onClick={() => showExampleModal()}>modalTest</button>
      </MyPageBox>
    </SideContentWrapper>
  );
};

export default SideContent;

const SideContentWrapper = styled.div`
  height: auto;
  width: 100%;
`;
