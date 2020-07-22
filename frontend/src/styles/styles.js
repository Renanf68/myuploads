import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const BgImg = styled.img`
  display: none;
  position: absolute !important;
  width: auto;
  height: 70%;
  opacity: 0.06;
  animation: ${rotate} infinite 20s linear;
  z-index: 0;
  @media (min-width: 700px) {
    display: block;
  }
`;

export const Title = styled.h1`
  color: #fff;

  svg {
    font-size: 40px;
    margin-left: 2px;
    margin-bottom: -8px;
  }
`;

export const LimitInfo = styled.p`
  color: #fff;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 30px;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  z-index: 1;
`;
