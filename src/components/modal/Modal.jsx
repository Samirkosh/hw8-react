import React from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";

export const Modal = ({ onClose, children }) => {
  return createPortal(
    <StyledModalContainer onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>{children}</Content>
    </StyledModalContainer>,
    document.getElementById("modal")
  );
};

const StyledModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: #3131318b;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;

const Content = styled.div`
  padding: 30px;
  background: #dbf7db;
  color: green;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;

  button {
    width: 100px;
    height: 40px;
    background-color: #b0e6b0;
    border: 2px solid green;
    font-size: 20px;
    border-radius: 8px;
    color: green;
  }
`;
