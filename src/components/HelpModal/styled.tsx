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
    width="240"
    height="240"
    viewBox="0 0 240 240"
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
      d="M110.7 128.5C118.4 114.6 133.2 106.4 141.8 94.1C150.9 81.2 145.8 57.1 120 57.1C103.1 57.1 94.7999 69.9 91.2999 80.5L65.3999 69.6C72.4999 48.3 91.7999 30 119.9 30C143.4 30 159.5 40.7 167.7 54.1C174.7 65.6 178.8 87.1 168 103.1C156 120.8 144.5 126.2 138.3 137.6C135.8 142.2 134.8 145.2 134.8 160H105.9C105.8 152.2 104.6 139.5 110.7 128.5ZM140 200C140 211 131 220 120 220C109 220 99.9999 211 99.9999 200C99.9999 189 109 180 120 180C131 180 140 189 140 200Z"
      //fill="black"
    />
  </svg>
);

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
