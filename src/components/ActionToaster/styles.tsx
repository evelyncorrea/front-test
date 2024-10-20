import styled from "styled-components";

export const ToasterWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    background-color: whitesmoke;
    padding: 30px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: flex;
    align-items: center;
    z-index: 100;
`;

export const CloseButton = styled.button`
    border: 1px solid black;
    border-radius: 25px;
    background: none;
    font-size: 20px;
    margin-right: 20px;
    height: fit-content;
`;

export const ToasterContent = styled.p`
    font-size: 15px;
`;