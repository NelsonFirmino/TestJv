import * as MockData from "./mockData";
import * as S from "./styled";
import { PageTitle } from "../../../../components/TitlePage";
import JvrisTable from "../../../../components/JvrisTable";
import { formatDataToTable } from "../../../../utils/formatDataToTable";
import theme from "../../../../globalStyle/theme";
import { useState } from "react";
import { ModalAdd } from "./components/ModalAdd";
import { ModalRemove } from "./components/ModalRemove";
import { PencilSimple, X } from "phosphor-react";
import { useRpvNaturezaDespesas } from "../../../../hooks/useRpvNaturezaDespesas";

const NaturezaDespesa = () => {
  const { naturezaDespesas, isLoadingNaturezaDespesas } =
    useRpvNaturezaDespesas();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);

  const [id, setId] = useState<number>(null);
  const [txNatureza, setTxNatureza] = useState("");

  const resetStates = () => {
    setId(null);
    setTxNatureza("");
  };

  return (
    <>
      {showModalAdd && (
        <ModalAdd
          setShowModalAdd={setShowModalAdd}
          id={id}
          txNatureza={txNatureza}
        />
      )}

      {showModalRemove && (
        <ModalRemove
          setShowModalRemove={setShowModalRemove}
          id={id}
          txNatureza={txNatureza}
        />
      )}

      <PageTitle pageTitle="NATUREZA DA DESPESA" pageIcon={<S.PageIcon />} />

      <S.Wrapper>
        <S.Row>
          <S.ContainerButtons>
            <S.SubmitButton
              onClick={() => {
                resetStates();
                setShowModalAdd(!showModalAdd);
              }}
            >
              Adicionar
            </S.SubmitButton>
          </S.ContainerButtons>
        </S.Row>

        {!isLoadingNaturezaDespesas && (
          <S.TableWrapper>
            <JvrisTable
              autoPrimaryColumn={false}
              
              columns={MockData.TableDataTitle()}
              data={formatDataToTable(naturezaDespesas?.data, ["txNatureza"])}
              GenericButton={[
                {
                  icon: <PencilSimple weight="fill" size={20} />,
                  hoverColor: theme.colors.jvrisAqua,
                  onClick: (index) => {
                    if (index !== undefined) {
                      setId(naturezaDespesas?.data[index].id);
                      setTxNatureza(naturezaDespesas?.data[index].txNatureza);
                      setShowModalAdd(!showModalAdd);
                    }
                  },
                },
                {
                  icon: <X weight="bold" size={20} />,
                  hoverColor: theme.colors.softRed,
                  onClick: (index) => {
                    if (index !== undefined) {
                      setId(naturezaDespesas?.data[index].id);
                      setTxNatureza(naturezaDespesas?.data[index].txNatureza);
                      setShowModalRemove(!showModalRemove);
                    }
                  },
                },
              ]}
            />
          </S.TableWrapper>
        )}
      </S.Wrapper>
    </>
  );
};

export default NaturezaDespesa;
