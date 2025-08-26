import styled from "styled-components";
import Select from "react-select";

export const Wrapper = styled.div`
    display: flex;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ContentSection = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));

  &:not(last-child) {
    margin-bottom: 2rem;
  }
`;

export const ContainerField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentSectionTitle = styled.h2`
  display: flex;
  position: relative;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors["gray/700"]};
  margin-bottom: 0.5rem;
  align-items: center;
  font-weight: 500;
`

export const FieldTitle = styled.h3`
  display: flex;
  position: relative;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.darkerGrey};
  margin-bottom: 0.5rem;
  align-items: center;
  font-weight: 500;
`;

export const CustomSelect = styled(Select)`
  max-width: 32rem;
  * {
    font-size: 1.3rem;
  }
`;

export const Button = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.softYellow};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.15rem;
  text-decoration: none;
  transition: all 500ms;
  margin-left: auto;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.softYellowDark};
  }
`;