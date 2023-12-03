import styled from "styled-components";

interface ModalContainerProps {
  width: number;
  p?: number;
}

const ModalContainer = styled.div<ModalContainerProps>`
  background-color: ${({ theme }) => theme.backgroundColor.tab3};
  width: ${({ width }) => width}px;
  border-radius: 0.375rem;
  padding: ${({ p }) => p}px;
  display: flex;
  flex-direction: column;
`;

ModalContainer.defaultProps = {
  p: 32,
};

export default ModalContainer;
