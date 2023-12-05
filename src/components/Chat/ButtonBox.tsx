import styled from "styled-components";

const ButtonBox = () => {

    return (
        <ButtonBoxWarrper>
            <Button>
                Video Call
            </Button>
            <Button>
                Disconnect
            </Button>
        </ButtonBoxWarrper>
    );
}

export default ButtonBox;

const ButtonBoxWarrper = styled.div`
    display : flex,
`;

const Button = styled.button`
    text-align : center,
`;
