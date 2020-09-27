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
  const [ellipsis, setellipsis] = useState("");
  useEffect(() => {
    const ellipsisIncreaser = setInterval(() => {
      if (ellipsis.length > 3) {
        setellipsis("");
      } else {
        setellipsis(ellipsis + ".");
      }
    }, 200);
    function cleanup() {
      clearInterval(ellipsisIncreaser);
    }
    return cleanup;
  });

  return (
    <Container>
      <span>
        LOADING
        {ellipsis}
      </span>
    </Container>
  );
};
