import { useContext, useEffect, useState } from "react";
import { JvrisTableContext } from "../../context/JvrisTableContext";
import { JvrisClicableButtonI } from "./ClicableButton.interface";
import * as S from "./styled";

export const ClicableButton = (props: JvrisClicableButtonI) => {
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const { setSubMenuOpen, subMenuOpen } = useContext(JvrisTableContext);

  useEffect(() => {
    if (subMenuOpen == props.index) setIsOptionsModalOpen(true);
    else setIsOptionsModalOpen(false);
  }, [subMenuOpen]);

  return (
    <S.ClicableButtonWrapper
      style={{
        position: isOptionsModalOpen ? "relative" : "unset",
      }}
    >
      <S.ClicableButtonContainer>
        {props.text && (
          <S.ClicableButtonMainText
            onClick={() => {
              if (props.onClick) props.onClick();
              setIsOptionsModalOpen(false);
              setSubMenuOpen(-1);
            }}
          >
            {props.text}
          </S.ClicableButtonMainText>
        )}

        <S.ShowOptionsButtonContainer
          customWidth={props.text ? "auto" : "4.6rem"}
          onClick={() => {
            if (subMenuOpen == props.index) setSubMenuOpen(-1);
            else props.index != undefined && setSubMenuOpen(props.index);
          }}
        >
          {props.subOptions && props.subOptions.length > 0 && (
            <S.ArrowDownIcon
              style={{
                transform: isOptionsModalOpen
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
              weight="fill"
              size={"32px"}
            />
          )}
        </S.ShowOptionsButtonContainer>
      </S.ClicableButtonContainer>

      {/* {isOptionsModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            zIndex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          onClick={() => {
            setIsOptionsModalOpen(false);
            setSubMenuOpen(-1);
          }}
        />
      )} */}

      {isOptionsModalOpen && (
        <S.ClicableButtonOptionsModalContainer>
          {props.subOptions &&
            props.subOptions.map((option, index) => (
              <S.OptionsGroup key={index}>
                {option.map((subOption, index) => (
                  <S.OptionItem
                    key={index}
                    onClick={() => {
                      subOption.onClick(props.index);
                      setIsOptionsModalOpen(false);
                      setSubMenuOpen(-1);
                    }}
                  >
                    {" "}
                    {subOption.text}{" "}
                  </S.OptionItem>
                ))}
              </S.OptionsGroup>
            ))}
        </S.ClicableButtonOptionsModalContainer>
      )}
    </S.ClicableButtonWrapper>
  );
};
