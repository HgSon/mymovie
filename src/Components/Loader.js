import styled from "styled-components";
import React, { useState, useEffect } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  font-size: 24px;
  font-weight: 600;
  color: #d35400;
`;

export default () => {
  const [text, setText] = useState("LOADING");
  useEffect(() => {
    let time = 0;
    setInterval(() => {
      if (time >= 3) {
        setText("LOADING");
        time = 0;
      } else {
        setText((text) => text + ".");
        time++;
      }
    }, 200);
  }, []);

  return (
    <Container>
      <span>{text}</span>
    </Container>
  );
};
