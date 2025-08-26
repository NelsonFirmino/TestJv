import styled from "styled-components";

// export const Wrapper = styled.div`
//   position: absolute;
//   left: 10px;
//   bottom: 10px;
//   z-index: 99999;
// `;

// export const TextArea = styled.textarea`
//   width: 100%;
//   height: 80%;
//   min-height: 100px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   padding: 10px;
//   resize: none;
//   font-size: 1.4rem;

//   &:focus {
//     outline: 1px solid ${({ theme }) => theme.colors.jvrisAqua};
//   }
// `;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;
  width: 100%;
  height: 4rem;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.colors["gray/500"]};
  padding: 1rem;
  border-radius: 1rem;
  transition: all 200ms;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors["gray/600"]};
  }
`;

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.lightGray};
  min-height: 50rem;
  min-width: 50rem;

  @media (max-width: 450px) {
    flex-wrap: wrap;
    min-width: 35rem;
  }
`;

export const WarningMessage = styled.div`
  display: flex;
  font-size: 1.5rem;
  width: 100%;
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.darkBlue};
  margin-bottom: 2rem;
`;

export const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;

export const OptionCancel = styled.div`
  cursor: pointer;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.white};
`;

export const OptionRemove = styled.div`
  cursor: pointer;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.jvrisAqua};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.white};
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors["gray/600"]};
`;

export const TextArea = styled.textarea`
  font-size: 1.2rem;
  outline: none;
  background: none;
  width: 100%;
  min-height: 12rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  resize: vertical;
`;

export const SvgIcon = ({
  fill,
  width,
  height,
}: {
  fill: string;
  width: number;
  height: number;
}) => (
  <svg
    width="1024"
    height="1024"
    viewBox="0 0 1024 1024"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width: width,
      height: height,
      userSelect: "none",
    }}
  >
    <path
      style={{
        userSelect: "none",
      }}
      d="M704 192H864V928H160V192H320V256H704V192ZM288 512H736V448H288V512ZM288 768H736V704H288V768ZM384 192V96H640V192H384Z"
      //fill="black"
    />
  </svg>
);
