import { CaretUp } from "phosphor-react";
import styled from "styled-components";

type ThProps = {
  isSortable: boolean;
  isFirst: boolean;
  showShadow?: boolean;
  selectRows: boolean;
  breakTextOnFirstColumn?: boolean;
};

type ThContentProps = {
  switchContentToRight?: boolean;
};

type ArrowIconProps = {
  isSorted: boolean;
};

export const Th = styled.th<ThProps>`
  cursor: pointer;
  padding: 1.5rem 0.5rem 1rem 0.5rem;
  border-bottom: 2px solid rgb(31, 181, 173);
  transition: all 200ms;
  background-color: ${({ isSortable }) => (isSortable ? "#ddddddce" : "")};
  position: ${({ isFirst }) => (isFirst ? "inherit" : "inherit")};
  left: ${({ selectRows }) => (selectRows ? "30px" : "0px")};
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.white};

  & > * {
    color: ${({ isSortable }) => (isSortable ? "#1fb5ad" : "#28282e")};
  }

  &:hover {
    background-color: ${({ isSortable }) =>
      isSortable ? "#dddddd" : "#dddddd80"};
  }

  &:before {
    display: ${({ showShadow }) => (showShadow ? "block" : "none")};
    box-shadow: inset 10px 0 8px -8px #00000026;
    position: absolute;
    top: 0;
    right: 0;
    bottom: -1px;
    width: 30px;
    transform: translate(100%);
    transition: box-shadow 0.3s;
    content: "";
    pointer-events: none;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ColumnName = styled.span<ThContentProps>`
  font-size: 1.3rem;
  margin-left: ${({ switchContentToRight }) =>
    switchContentToRight ? "auto" : "0"};
`;

export const ArrowIcon = styled(CaretUp)<ArrowIconProps>`
  font-size: 1.5rem;
  margin-left: 0.6rem;

  transform: ${({ isSorted }) =>
    isSorted ? "rotate(180deg)" : "rotate(0deg)"};
`;
