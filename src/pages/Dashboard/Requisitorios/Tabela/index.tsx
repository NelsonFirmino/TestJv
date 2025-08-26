import * as S from "../styled";
import useRequisitoriosPage from "../useRequisitoriosPage";
import JvrisTable from "../../../../components/JvrisTable";
import { formatDataToTableExtra } from "../../../../utils/formatDataToTableExtra";

const TabelaRequisitorios = ({ process_id }: { process_id: string }) => {
  const { requisitorios, deleteRequisitorio } = useRequisitoriosPage({
    idURL: process_id,
  });

  return (
    <S.Wrapper>
      <S.ContainerHeader>
        <S.TitleHeader>Requisitores Cadastrados</S.TitleHeader>
      </S.ContainerHeader>
      {requisitorios ? (
        <div>
          <JvrisTable
            data={formatDataToTableExtra({
              content: requisitorios,
              keysToInclude: [
                "txRequisitor",
                "txCpfCnpjRequisitor",
                "txDevedor",
                "txNatureza",
                "txTipo",
                "dtLimitePagamento",
                "vaPagamento",
              ],
              keysToFormatAsMoney: ["vaPagamento"],
              keysToFormatAsDate: ["dtLimitePagamento"],
              keysToFormatAsType: ["txTipo"],
            })}
            columns={[
              {
                text: "Requisitor",
                dataName: "txRequisitor",
              },
              {
                text: "Documento Requisitor",
                dataName: "txCpfCnpjRequisitor",
              },
              {
                text: "Devedor",
                dataName: "txDevedor",
              },
              {
                text: "Natureza da Despesa",
                dataName: "txNatureza",
              },
              {
                text: "Tipo",
                dataName: "txTipo",
              },
              {
                text: "Limite de pagamento",
                dataName: "dtLimitePagamento",
              },
              {
                text: "Valor",
                dataName: "vaPagamento",
              },
            ]}
            ClicableButton={{
              subOptions: [
                [
                  {
                    text: "Excluir",
                    onClick: (index) => {
                      if (index != undefined) {
                        deleteRequisitorio(requisitorios[index].idAto).then(
                          (response) => { }
                        );
                      }
                    },
                  },
                ],
                [
                  {
                    text: "Editar",
                    onClick: (index) => { },
                  },
                ],
              ],
            }}
          />
        </div>
      ) : (
        <div
          style={{
            padding: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "2.4rem",
              //fontWeight: "bold"
            }}
          >
            Nenhum cadastro registrado
          </p>
        </div>
      )}
    </S.Wrapper>
  );
};

export default TabelaRequisitorios;
