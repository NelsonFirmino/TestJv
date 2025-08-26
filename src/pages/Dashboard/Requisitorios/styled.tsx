import styled from "styled-components";
import Select from "react-select";
import StateManagedSelect from "react-select/dist/declarations/src/stateManager";

export const Wrapper = styled.div`
  //padding: 2.4rem;
`;

export const ContainerHeader = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.jvrisAqua};
  align-items: center;
  padding: 1.8rem 1.8rem;
  //border-radius: 0.8rem;
`;
//  border: 4px solid ${({theme}) => theme.colors.jvrisAqua};
export const TitleHeader = styled.h1`
  font-size: 1.8rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.white};
`;

export const DatasWrapper = styled.div`
  display: flex;
  padding: 2rem 3rem;
  flex-wrap: wrap;
  gap: 1.4rem;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

export const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
  //align-items: center;
`;

const Label = styled.p`
  width: fit-content;
  padding: 0.4rem 0rem;
  border-radius: 0.4rem;
  font-size: 1.6rem;
  font-weight: 700;
`;

export const DataLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  align-items: center;
`;

export const DataLabel = styled(Label)<{ isError?: boolean }>`
  width: max-content;
  color: ${({ theme, isError }) =>
    isError ? theme.colors.softRed : theme.colors.gray};
  //background-color: ${({ theme }) => theme.colors.darkgrey_2};
`;

export const Data = styled.p`
  font-size: 1.6rem;
  //font-weight: 700;
  //margin-left: 0.8rem;
  color: ${({ theme }) => theme.colors.gray};
  width: max-content;
`;

export const Input = styled.input`
  background-color: #fff;
  height: 38px;
  width: 100%;
  font-size: 1.2rem;
  padding: 0px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2rem 3rem;
  gap: 1.4rem;
`;

export const Button = styled.button<{ isSave?: boolean }>`
  background-color: ${({ theme, isSave }) =>
    isSave ? theme.colors.jvrisAqua : theme.colors.darkgrey_2};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.6rem;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.4rem;
  border: none;
  cursor: pointer;
  transition: 0.1s ease;
  &:hover {
    background-color: ${({ theme, isSave }) =>
      isSave ? theme.colors.jvrisAquaDark : theme.colors.darkerGrey};
  }
`;

export const SelectData: StateManagedSelect = (props) => {
  return (
    <Select
      loadingMessage={(obj) => {
        obj.inputValue = "Carregando...";
        return obj.inputValue;
      }}
      styles={{
        control: (provided, state) => ({
          ...provided,
          backgroundColor: "#fff",
          height: "30px",
          //width: "max-content",
          //minWidth: "260px",

          fontSize: "3.2rem",
        }),
        option: (provided, state) => ({
          ...provided,
          fontSize: "1.2rem",
        }),
        menu: (provided, state) => ({
          ...provided,
          zIndex: 3,
        }),
        loadingMessage: (provided, state) => ({
          ...provided,
          fontSize: "1.2rem",
        }),
      }}
      {...props}
    />
  );
};

export const Text = styled.span`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.gray};
  font-weight: bold;
`;
