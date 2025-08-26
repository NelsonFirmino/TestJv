import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { JvrisTableContext } from "./context/JvrisTableContext";
export const TableWrapper = styled.div<{
  maxHeigthToCollapse: string | number | undefined;
}>`
  overflow: auto;
  border: 1px solid ${(props) => props.theme.colors.lightGrey};
  max-height: ${(props) => props.maxHeigthToCollapse};
`;
export const TableWrapper2 = (props: any) => {
  const { setActualTableWidth } = useContext(JvrisTableContext);
  const ref = useRef<HTMLDivElement>(null);

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (ref.current) {
      setActualTableWidth(ref.current.offsetWidth);
    }
  }, [ref.current, windowSize]);
  return (
    <TableWrapper ref={ref} maxHeigthToCollapse={props.maxHeigthToCollapse}>
      {props.children}
    </TableWrapper>
  );
};
export const ForStickyContiner = styled.div<{
  minWidthToCollapse: string | number | undefined;
  childrenAmount?: number;
  width?: string | number;
}>`
  gap: 1.5vw;
  padding: 0.5rem 1rem;
  align-items: center;
  display: flex;
  //justify-content: ${(props) => props.childrenAmount && props.childrenAmount > 1 ? "space-between" : "flex-end"};
`;

export const CadastroAto = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 3px;

  color: white;
  font-size: 12px;
  text-align: center;
  user-select: none;
`;

export const Sigilo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 20px;
  border-radius: 3px;

  color: white;
  font-size: 12px;
  text-align: center;
  user-select: none;
`;

export const Grau = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 20px;
  border-radius: 3px;

  color: white;
  font-size: 12px;
  text-align: center;
  user-select: none;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 1.4rem;
  margin: 0.5rem;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const LoadingText = styled.p`
  color: ${(props) => props.theme.colors.jvrisAqua};
  font-size: 2.2rem;
  margin: 0.5rem;
  font-weight: bold;

  animation: blinker 1.5s infinite ease-in-out;

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;
