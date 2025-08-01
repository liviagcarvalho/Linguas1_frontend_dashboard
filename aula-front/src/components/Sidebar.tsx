import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-250px")};
  width: 250px;
  height: 100%;
  background: #1e1e2f;
  color: white;
  padding: 2rem 1.5rem;
  transition: left 0.3s ease;
  z-index: 1001;
`;

const Overlay = styled.div.attrs<{ isOpen: boolean }>((props) => ({
  style: {
    display: props.isOpen ? "block" : "none",
  },
}))<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

const MenuItem = styled(Link)`
  display: block;
  font-weight: bold;
  color: #a5b4fc;
  margin-bottom: 1.5rem;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: Props) => {
  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <SidebarContainer isOpen={isOpen}>
        <h2 style={{ color: "#fff", marginBottom: "2rem" }}>Páginas</h2>
        <MenuItem to="/" onClick={onClose}>Home Page</MenuItem>
        <MenuItem to="/clientes" onClick={onClose}>Clientes</MenuItem>
        <MenuItem to="/expansao" onClick={onClose}>Oportunidade de Expansão</MenuItem> {/* ✅ novo botão */}
      </SidebarContainer>
    </>
  );
};

export default Sidebar;

