import { JvrisGenericButtonI } from "./GenericButton.interface";
import * as S from "./styled";
import { useState } from "react";

export const GenericButton = (props: JvrisGenericButtonI) => {
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);

  return (
    <S.ButtonWrapper
      style={{
        position: isOptionsModalOpen ? 'relative' : 'unset'
      }}
      title={props.alt}>
      <S.ButtonContainer backColor={props.backColor}
      >
        {
          props.onClick &&
          <S.ButtonMainText
            subOptions={props.subOptions}
            hoverColor={props.hoverColor}
            text={props.text}
            icon={props.icon}
            onClick={(index) => {
              if (props.onClick) props.onClick();
              setIsOptionsModalOpen(false);
            }}
          >
            {" "}
            {props.text} {props.icon}
            { }
          </S.ButtonMainText>
        }


        <S.ShowOptionsButtonContainer
          onClick={() => setIsOptionsModalOpen(!isOptionsModalOpen)}
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
      </S.ButtonContainer>

      {isOptionsModalOpen && (
        <S.ButtonOptionsModalContainer>
          {props.subOptions &&
            props.subOptions.map((option, index) => (
              <S.OptionsGroup>
                {option.map((subOption, index) => (
                  <S.OptionItem
                    onClick={() => {
                      subOption.onClick();
                      setIsOptionsModalOpen(false);
                    }}
                  >
                    {" "}
                    {subOption.text}{" "}
                  </S.OptionItem>
                ))}
              </S.OptionsGroup>
            ))}
        </S.ButtonOptionsModalContainer>
      )}
    </S.ButtonWrapper>
  );
};
