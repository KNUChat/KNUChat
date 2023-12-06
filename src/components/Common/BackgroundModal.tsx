import useModalStore from "@store/useModalStore";
import { flexCenter } from "@style/flexCenter";
import { ReactNode } from "react";
import styled from "styled-components";
import ModalContainer from "./ModalContainer";

interface BackgroundModalProps {
  children: ReactNode;
  width: number;
  p: number;
  onClick?: () => void;
}

const BackgroundModal = ({ children, width, p, onClick }: BackgroundModalProps) => {
  const { setShowModal } = useModalStore();

  const closeModal = () => {
    if (onClick) {
      onClick();
    } else {
      setShowModal(false);
    }
  };

  return (
    <BackgroundWrapper onClick={closeModal}>
      <ModalContainer width={width} p={p} onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContainer>
    </BackgroundWrapper>
  );
};

const BackgroundWrapper = styled.div`
  ${flexCenter}
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
`;

export default BackgroundModal;
