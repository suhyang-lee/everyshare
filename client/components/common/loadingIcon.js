import React from "react";
import styled from "styled-components";

const LoadingIcon = ({ height }) => {
  return (
    <Wrapper height={height}>
      <Loader />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${(props) => props.height};
  margin-bottom: 2rem;
`;

const Loader = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #ffc800;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingIcon;
