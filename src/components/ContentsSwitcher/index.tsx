import * as S from "./styled";
import { tableContentsSwitcherInterface } from "./interfaces/tableContentsSwitcher.interface";

const ContentSwitcher = (props: tableContentsSwitcherInterface) => {
  const { currentSelected, setCurrentSelected } = props;

  return (
    <S.ContentSwitcherContainer style={props.containerStyle}>
      {props.switchers.map((item, index) => {
        return (
          <S.ContentSwitcherButtonContainer
            key={item.name + index}
            onClick={() => {
              if (props.clickReset && currentSelected == index) {
                setCurrentSelected(-1);
              } else setCurrentSelected(index);

              item.onClick && item.onClick();
              props.resetSelected && props.resetSelected();

            }}
            current={currentSelected}
            index={index}
          >
            <S.ContentSwitcherText current={currentSelected} index={index}>
              {item.name}
            </S.ContentSwitcherText>
            <S.ContentSwitcherPendenciesContainer>
              <S.ContentSwitcherPendenciesText
                current={currentSelected}
                index={index}
              >
                {item.amount ? item.amount : 0}
              </S.ContentSwitcherPendenciesText>
            </S.ContentSwitcherPendenciesContainer>
          </S.ContentSwitcherButtonContainer>
        );
      })}
    </S.ContentSwitcherContainer>
  );
};

export default ContentSwitcher;
