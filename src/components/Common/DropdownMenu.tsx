import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const DropdownMenu = ({ recordId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target) && buttonRef.current !== event.target) {
        setIsOpen(false);
        setIsRotated(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsRotated(!isRotated);
  };

  return (
    <DropdownWrapper>
      <DropdownButton onClick={handleToggle} isRotated={isRotated} ref={buttonRef}>
        ☰
      </DropdownButton>
      {isOpen && (
        <DropdownContent ref={dropdownRef}>
          <DropdownItem onClick={() => navigate(`/record/edit/${recordId}`)}>Edit</DropdownItem>
          <DropdownItem>Delete</DropdownItem>
        </DropdownContent>
      )}
    </DropdownWrapper>
  );
};

export default DropdownMenu;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.3s;
  transform: ${({ isRotated }) => (isRotated ? "rotate(90deg)" : "rotate(0deg)")};
`;

const DropdownContent = styled.div`
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;
