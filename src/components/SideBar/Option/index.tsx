import { useEffect, useState } from "react";
import Icon from "../Icon";
import { OptionProps } from "./option.interface";
import * as S from "./styled";

export const Option = ({
  data,
  handleSelectedOption,
  selectedOption,
  isSideBarOpen,
  setSideBarOpen,
}: OptionProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 450);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 450);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <S.SubBarOptionsContainer>
      <S.OptionSideBarSubBar
        isSideBarOpen={isSideBarOpen}
        open={Boolean(
          data.listMenuFilhos.find(
            (m) => m.id === +selectedOption || data.id === selectedOption
          )
        )}
        onClick={() => {
          handleSelectedOption(data.id);
          setSideBarOpen(true);
        }}
      >
        <Icon menuId={data.id} />
        <S.TextMenu isSideBarOpen={isSideBarOpen}>{data.txMenu}</S.TextMenu>
        <S.ArrowRightIcon
          isSideBarOpen={isSideBarOpen}
          open={Boolean(
            data.listMenuFilhos.find((m) => m.id === +selectedOption) ||
              data.id === selectedOption
          )}
        />
      </S.OptionSideBarSubBar>
      <S.SubOptionsContainer
        className="SubOptionsContainer"
        id="SubOptionsContainer"
        open={
          isSideBarOpen &&
          Boolean(
            data.listMenuFilhos.find((m) => m.id === +selectedOption) ||
              data.id === selectedOption
          )
        }
      >
        {data.listMenuFilhos?.map((sl) => (
          <S.OptionSubBarDirectLink
            key={sl.id}
            to={sl.txPagina}
            onClick={() => {
              handleSelectedOption(sl.id);
              if (isMobile) setSideBarOpen(false);
            }}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {sl.txMenu}
          </S.OptionSubBarDirectLink>
        ))}
      </S.SubOptionsContainer>
    </S.SubBarOptionsContainer>
  );
};
