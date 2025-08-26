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
import { useRpvOrigemDespesas } from "../../../../hooks/useRpvOrigemDespesas";

const OrigemDespesa = () => {
  const { origemDespesas, isLoadingOrigemDespesas } = useRpvOrigemDespesas();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);

  const [id, setId] = useState<number>(null);
  const [txOrigemNatureza, setTxOrigemNatureza] = useState("");

  const resetStates = () => {
    setId(null);
    setTxOrigemNatureza("");
  };

  return (
    <>
      {showModalAdd && (
        <ModalAdd
          setShowModalAdd={setShowModalAdd}
          id={id}
          txOrigem={txOrigemNatureza}
        />
      )}

      {showModalRemove && (
        <ModalRemove
          setShowModalRemove={setShowModalRemove}
          id={id}
          txOrigem={txOrigemNatureza}
        />
      )}

      <PageTitle pageTitle="ORIGEM DA DESPESA" pageIcon={<S.PageIcon />} />

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

        {!isLoadingOrigemDespesas && (
          <S.TableWrapper>
            <JvrisTable
              autoPrimaryColumn={false}
              
              columns={MockData.TableDataTitle()}
              data={formatDataToTable(origemDespesas?.data, ["txOrigem"])}
              GenericButton={[
                {
                  icon: <PencilSimple weight="fill" size={20} />,
                  hoverColor: theme.colors.jvrisAqua,
                  onClick: (index) => {
                    if (index !== undefined) {
                      setId(origemDespesas?.data[index].id);
                      setTxOrigemNatureza(origemDespesas?.data[index].txOrigem);
                      setShowModalAdd(!showModalAdd);
                    }
                  },
                },
                {
                  icon: <X weight="bold" size={20} />,
                  hoverColor: theme.colors.softRed,
                  onClick: (index) => {
                    if (index !== undefined) {
                      setId(origemDespesas?.data[index].id);
                      setTxOrigemNatureza(origemDespesas?.data[index].txOrigem);
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

export default OrigemDespesa;
