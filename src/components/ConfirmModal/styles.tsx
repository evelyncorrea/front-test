import styled from "styled-components";

const buttonTypes: { [key: string]: string } = {
    exit: 'rgb(255, 145, 154)',
    confirm: 'rgb(155, 229, 155)'
}

export const ModalContainer = styled.div`
    position: absolute;
    background-color: rgba(0,0,0,0.2);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

export const Modal = styled.div`
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 15% 25%;
    background-color: whitesmoke;
    border-radius: 15px;
`;

export const ModalTitle = styled.h2`
    padding: 0;
`;

export const ModalActions = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const ModalButton = styled.button<{ type: string }>`
    background-color: ${({ type }) => buttonTypes[type]};
    border: none;
    border-radius: 5px;
    padding: 5px 15px;
`