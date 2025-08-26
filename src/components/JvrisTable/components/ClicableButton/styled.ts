import { CaretDown } from "@phosphor-icons/react";
import styled from "styled-components";

export const ShowOptionsButtonContainer = styled.div<{ customWidth: string }>`
  height: 100%;
  width: ${(props) => props.customWidth};
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.jvrisAqua};

  &:hover {
    background-color: ${(props) => props.theme.colors.jvrisAquaDark};
    transition: 0.2s;
  }
`;
export const OptionItem = styled.li`
  list-style-type: none;
  font-size: 1.4rem;
  padding: 5px 10px;
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.darkGrey};
    color: ${(props) => props.theme.colors.white};
    transition: 0.2s;
  }
`;
export const OptionsGroup = styled.div`
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
`;

export const ClicableButtonContainer = styled.div`
  height: 40px;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.jvrisAqua};
  border-radius: 5px;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
export const ClicableButtonMainText = styled.div`
  padding-right: 10px;
  padding-left: 14px;
  height: 100%;
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0);
  font-size: 1.4rem;
  color: white;
  user-select: none;
  width: max-content;
  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: ${(props) => props.theme.colors.jvrisAquaDark};
    transition: 0.2s;
  }
`;

export const ArrowDownIcon = styled(CaretDown)`
  padding-left: 8px;
  padding-right: 8px;
  font-size: 3rem;
  color: white;
  transition: 0.2s;
`;
export const ClicableButtonWrapper = styled.div`
 
  display: inline-block;
  margin-right: 1rem;
`;
export const ClicableButtonOptionsModalContainer = styled.ul`
  display: block;
  position: absolute;
  right: 0px;
  top: calc(100% + 4px);
  left: auto;
  width: max-content;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  list-style: none;
  background-color: ${(props) => props.theme.colors.white};
  overflow: hidden;
  z-index: 2;
`;
