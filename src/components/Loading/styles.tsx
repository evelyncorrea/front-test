import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

export const LoadingWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        animation: ${rotate} 1s linear infinite;
    }
`;

