import styled from "styled-components";
import { useCallback } from "react";
import BackgroundModal from "./BackgroundModal";
import useModalStore from "@store/useModalStore";

const ExampleModal = () => {
  const { setShowModal } = useModalStore();

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <BackgroundModal width={440} p={0}>
      <>
        <CreateCommunityHeader></CreateCommunityHeader>
        <CreateCommunityBody>
          <p>모달 예시</p>
        </CreateCommunityBody>
        <CreateCommunityFooter>
          <button onClick={closeModal}>취소</button>
        </CreateCommunityFooter>
      </>
    </BackgroundModal>
  );
};

const CreateCommunityHeader = styled.div`
  padding: 1.5rem 1.5rem 0;
`;

const CreateCommunityBody = styled.div`
  margin: 1rem 0;
  padding: 0 0.5rem 0 1rem;
`;

const CreateCommunityFooter = styled.div`
  padding: 16px;

  display: flex;
  justify-content: space-between;
`;

export default ExampleModal;
