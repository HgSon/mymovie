import styled from "styled-components";
import React from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  font-size: 32px;
`;
export default () => (
  <Container>
    <span role="img" aria-label="loader">
      ⏲
    </span>
  </Container>
);
