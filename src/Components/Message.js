import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
const Span = styled.span`
  font-size: 24px;
  color: ${(props) => props.color};
`;

const Message = ({ text, color }) => (
  <Container>
    <Span color={color}>{text}</Span>
  </Container>
);

Message.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Message;
