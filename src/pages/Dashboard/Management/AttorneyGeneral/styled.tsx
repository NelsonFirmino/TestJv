import { Link } from "react-router-dom";
import styled from "styled-components";
import { ContentParagraphProps } from "./interfaces";
import Select from "react-select";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export const FormContainer = styled.form`
  display: flex;
`;

export const CustomSelect = styled(Select)`
  width: 100%;
  * {
    font-size: 1.3rem;
  }
`;

export const SearchButton = styled.button`
  margin-left: 1rem;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.lighterGrey};
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 1.1rem;
  background-color: ${({ theme }) => theme.colors.jvrisAqua};
  color: ${({ theme }) => theme.colors.white};
  transition: 500ms all;

  &:hover {
    background-color: ${({ theme }) => theme.colors.jvrisAquaDark};
  }
`;

export const FlagContainer = styled.div`
  display: flex;
  margin-bottom: 3rem;
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

export const SubtitleSection = styled.section`
  display: flex;
  //margin: 2rem 0;
  margin: 5rem 0 3rem 1rem;
`;

export const Subtitle = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray};
  font-weight: bold;
  margin-right: 1rem;
`;

export const SubtitleContainer = styled.div`
  display: flex;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.darkerGrey};

  &:not(last-child) {
    margin-right: 0.5rem;
  }
`;

export const SubtitleIcon = styled.div`
  height: 0.8rem;
  width: 0.8rem;
  border-radius: 50%;
  background-color: #fa8564;
  margin-right: 0.5rem;
`;

export const SubtitleText = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.darkerGrey};
  font-weight: bold;
`;

export const CardsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  //justify-content: space-between;
  // grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
  gap: 3rem;
`;

export const ContentParagraph = styled.p<ContentParagraphProps>`
  font-size: 1.4rem;
  font-style: ${({ bold }) => (bold ? "bold" : "regular")};
  color: ${({ theme }) => theme.colors.darkerGrey};
  margin: 0.5rem 0;

  &.name {
    font-weight: bold;
  }

  &.job-role {
    //font-weight: bold;
    font-style: italic;
    color: ${({ theme }) => theme.colors.gray};
  }
`;

export const LinkButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.jvrisAqua};
  font-size: 1.35rem;
  text-align: center;
  border-radius: 5px;
  color: white;
  padding: 5px 3.5rem;
  margin-top: 0.5rem;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background-color: #1ca59e;
  }
`;
export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.jvrisAqua};
  font-size: 1.35rem;
  text-align: center;
  border-radius: 5px;
  color: white;
  padding: 5px 3.5rem;
  margin-top: 0.5rem;
  text-decoration: none;
  border: none;

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

export const StatusColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5rem 1rem 3rem 0;
`;

export const StatusWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;

  &:first-child {
    margin-bottom: 2rem;
  }
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

export const StatusLabel = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.grey};
  margin-left: 0.2rem;
`;
