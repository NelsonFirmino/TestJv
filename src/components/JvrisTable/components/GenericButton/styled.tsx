import { CaretDown } from "@phosphor-icons/react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { JvrisGenericButtonI } from "./GenericButton.interface";
import theme from "../../../../globalStyle/theme";

export const ShowOptionsButtonContainer = styled.div`
  height: 100%;
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

export const ButtonContainer = styled.div<{
  backColor?: string;
}>`
  height: 30px;
  margin: 10px 0px;
  border-radius: 4px;
  align-items: center;
  display: flex;
  justify-content: center;
  overflow: hidden;
  //cursor: pointer;
  background-color: ${(props) => props.backColor ? props.backColor : props.theme.colors.grey};
`;

export const ButtonMainText = (props: JvrisGenericButtonI) => {
  return (
    <motion.div
      whileHover={{
        backgroundColor: props.subOptions ? "none" : props.hoverColor,
      }}
      onClick={() => props.onClick()}
      style={{
        backgroundColor: props.subOptions ? "none" : theme.colors.grey,
        cursor: props.subOptions ? "default" : "pointer",
        paddingRight: "10px",
        paddingLeft: "10px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        border: "1px solid rgba(0, 0, 0, 0)",
        fontSize: "1.4rem",
        color: "white",
        userSelect: "none",
      }}
    >
      {props.children}
    </motion.div>
  );
};

export const ArrowDownIcon = styled(CaretDown)`
  padding-left: 8px;
  padding-right: 8px;
  font-size: 3rem;
  color: white;
  transition: 0.2s;
`;
export const ButtonWrapper = styled.div`
  display: inline-block;
`;
export const ButtonOptionsModalContainer = styled.ul`
  display: block;
  position: absolute;
  right: 0px;
  top: calc(100% + 4px);
  left: auto;
  min-width: 160px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  list-style: none;
  background-color: ${(props) => props.theme.colors.white};
  overflow: hidden;
  z-index: 1;
`;
