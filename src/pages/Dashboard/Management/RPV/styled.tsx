import styled from "styled-components";
import media from "styled-media-query";
import Select from "react-select";

type ErrorDate = {
  error: string | undefined;
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const CustomSelect = styled(Select)`
  width: 100%;
  * {
    font-size: 1.3rem;
  }
`;

export const FlagContainer = styled.div`
  display: flex;
`;

export const Flag = styled.div`
  padding: 1rem;
  padding-right: 2rem;
  clip-path: polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%);
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.jvrisAqua};
  text-align: center;
`;

export const PageWrapper = styled.div``;

export const NoContentToShow = styled.div`
  color: red;
  font-size: 1.2rem;
  margin: 3rem auto;
`;

export const SectionRight = styled.section`
  display: flex;
  width: 100%;
  justify-content: end;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

export const MenuWrapper = styled.div`
  display: flex;
  width: 100%;
  /* margin-top: 2rem; */
  margin-bottom: 2rem;
  flex-wrap: wrap;

  ${media.greaterThan("medium")`
  &:not(:last-child) {
      margin-top: 3rem;
    }
  `}
`;

export const MenuButton = styled.div<{ isActive: boolean }>`
  display: flex;
  height: 4rem;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.lighterGray : "white"};
  align-items: center;
  padding: 1rem;
  border: none;

  :hover {
    color: ${({ theme }) => theme.colors.jvrisAqua};
    background-color: ${({ theme }) => theme.colors.lighterGrey};
    cursor: pointer;
    user-select: none;
    transition: 300ms;
  }
`;

export const MenuLabel = styled.div`
  font-size: 0.85rem;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.gray};
`;

export const MenuLabelCount = styled.div`
  font-size: 1rem;
  font-weight: bold;
  background-color: black;
  color: white;
  border: none;
  border-radius: 12px;
  margin-left: 0.5rem;
  padding: 0.3rem 0.8rem;
`;

export const StatusWrapper = styled.div`
  display: flex;
  justify-content: end;
  padding-bottom: 1rem;
  padding-right: 1rem;
`;

export const StatusLabelTitle = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray};
`;

export const StatusSection = styled.div`
  display: flex;
  padding-left: 1.2rem;
  align-items: center;
`;

export const StatusIcon = styled.div``;

export const StatusLabel = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.grey};
  margin-left: 0.2rem;
`;

export const Button = styled.div`
  background-color: ${({ theme }) => theme.colors.jvrisAqua};
  font-size: 1.35rem;
  text-align: center;
  border-radius: 5px;
  color: white;
  padding: 5px 3.5rem;
  margin-top: 0.5rem;

  &:hover {
    cursor: pointer;
    background-color: #1ca59e;
  }
`;

export const Butt = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

export function buttHelper(
  text: string,
  onclick: () => void,
  Icon: React.ReactNode
) {
  return (
    <Butt
      style={{
        fontSize: "1.35rem",
      }}
      onClick={onclick}
    >
      {text}
      {Icon}
    </Butt>
  );
}

export const OptionsTableContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);
`;

export const OptionTable = styled.span`
  cursor: pointer;
  padding: 2rem 1rem;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.jvrisAqua};
`;

export const CountOptionTable = styled.span`
  padding: 0.75rem;
  margin-left: 0.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.darkerGrey};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.1rem;
  font-weight: bold;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.greaterThan("medium")`
    flex-direction: row;
  `}
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }

  &:nth-child(1) {
    margin-right: 2rem;
  }

  ${media.lessThan("medium")`
    margin-bottom:3rem;
  `}

  ${media.greaterThan("medium")`
    &:nth-child(1) {
      margin-right: 3rem;
    }
  `}

  ${media.greaterThan("large")`
    &:nth-child(1) {
      margin-right: 10rem;
    }
  `}
`;

export const SectionTitle = styled.h2`
  font-size: 1.7rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkerGrey};
  letter-spacing: 1px;
  margin-bottom: 2rem;
`;

export const FieldDateContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FieldContainer = styled.div`
  display: flex;
`;

export const LabelField = styled.label`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.darkGrey};
  margin-bottom: 1rem;
`;

export const DateContainer = styled.div`
  display: flex;
`;

export const DateContent = styled.div<ErrorDate>`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.lighterGrey};
  border: 1px solid
    ${({ theme, error }) => (error ? "#ca0000" : theme.colors.lighterGrey)};

  &:first-child {
    border-right: 1px solid ${({ theme }) => theme.colors.grey};
  }
`;

export const DateDescription = styled.span`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

export const DateInput = styled.input`
  font-size: 1.5rem;
  border: none;
  outline: none;
  background: none;
`;

export const TextInput = styled.input`
  flex: auto;
  font-size: 1.3rem;
  height: 3.6rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  text-indent: 1rem;
  outline: ${({ theme }) => theme.colors.softGreen};
  border-radius: 0.4rem;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.grey};
  }

  &:focus {
    outline: 1px solid #2684ff;
  }
`;

export const SearchTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  width: 100%;
  height: 3rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
  padding: 1.7rem;
  background-color: ${({ theme }) => theme.colors.jvrisAqua};

  :hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.jvrisAquaDark};
    transition: 300ms;
  }
`;

export const ErrorMessage = styled.span`
  margin-top: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.softRed};
`;

export const ContainerButtons = styled.div`
  display: flex;
  height: 4rem;
  margin-bottom: 3rem;
`;

export const WarningMessage = styled.span`
  margin-top: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const SubmitButton = styled.button`
  transition: all 500ms ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey : theme.colors.softGreen};
  outline: none;
  border: none;
  text-align: center;
  width: 15rem;
  padding: 1rem;
  letter-spacing: 1px;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.5rem;
`;

export const ClearButton = styled.button`
  transition: all 500ms ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  margin-left: 2rem;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey : theme.colors.bgCleanButton};
  outline: none;
  border: none;
  text-align: center;
  width: 15rem;
  padding: 1rem;
  letter-spacing: 1px;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.5rem;
`;
