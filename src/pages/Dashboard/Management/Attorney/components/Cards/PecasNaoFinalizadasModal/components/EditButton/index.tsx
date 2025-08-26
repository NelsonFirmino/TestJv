import { useNavigate } from "react-router-dom";
import * as S from "./styled";

export const EditButton = ({ dataTable }: any) => {
  const navigate = useNavigate();

  return (
    <S.Wrapper
      onClick={() =>
        navigate(
          `/dashboard/procurador/cadastro-peca/${dataTable.idAto}`,
          {
            state: {
              processo: dataTable,
              idProcesso: dataTable.id,
            },
          }
        )
      }
    >
      Editar
    </S.Wrapper>
  );
};
