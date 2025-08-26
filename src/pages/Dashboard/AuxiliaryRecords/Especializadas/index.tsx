import * as S from "./styled";
import { PageTitle } from "../../../../components/TitlePage";
import { useEffect, useState } from "react";
import { ModalAdd } from "./components/ModalAdd";
import { ModalRemove } from "./components/ModalRemove";
import { useAllSpecials } from "../../../../hooks/useSpecials";
import { PencilSimple, Rectangle, X } from "phosphor-react";
import theme from "../../../../globalStyle/theme";
import ListBoxWidget from "./ListBoxWidget";
import { useGetAttorneys } from "../../../../hooks/useAttorneys";
import { getProcuradoresByEspecializada } from "../../../../api/services/specials/specials";

const Motoristas = () => {
  const { specialsList, loadingSpecialsList } = useAllSpecials();
  const { attorneysList, loadingAttorneysList } = useGetAttorneys();
  const [specialAttorneyList, setSpecialAttorneyList] = useState<
    {
      label: string;
      value: number;
      isChefe: boolean;
      isDistribuicaoAutomatica: boolean;
      idEspecializada: number;
      nuPercentualDistribuicao: number;
    }[]
  >([]);

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);

  const [id, setId] = useState<number>(0);
  const [txEspecializada, setTxEspecializada] = useState("");
  const [idSecretaria, setIdSecretaria] = useState<number>(0);
  const [isRpv, setIsRpv] = useState<boolean>(false);
  const [isBloqueado, setIsBloqueado] = useState<boolean>(false);

  useEffect(() => {
    if (id > 0) {
      getProcuradoresByEspecializada(id).then((response) => {
        const specialsProcuradoresList = response.data?.map((at) => ({
          label: at.txProcurador,
          value: at.id,
          isChefe: at.isChefe,
          isDistribuicaoAutomatica: at.isDistribuicaoAutomatica,
          idEspecializada: at.idEspecializada,
          nuPercentualDistribuicao: at.nuPercentualDistribuicao,
        }));
        specialsProcuradoresList?.sort((a, b) =>
          a.label.trim().localeCompare(b.label.trim())
        );
        setSpecialAttorneyList(specialsProcuradoresList);
      });
    }
  }, [id]);

  return (
    <>
      {showModalAdd && <ModalAdd setShowModalAdd={setShowModalAdd} />}

      {showModalEditar && (
        <ModalAdd
          setShowModalAdd={setShowModalEditar}
          id={id}
          txEspecializada={txEspecializada}
          idSecretaria={idSecretaria}
          isRpv={isRpv}
          isBloqueado={isBloqueado}
        />
      )}

      {showModalRemove && (
        <ModalRemove
          setShowModalRemove={setShowModalRemove}
          id={id}
          txEspecializada={txEspecializada}
        />
      )}

      <PageTitle
        pageTitle="GERENCIAMENTO DE ESPECIALIZADAS"
        pageIcon={<S.PageIcon weight="fill" />}
      />

      <S.Wrapper>
        <S.Row style={{ justifyContent: "flex-end", marginBottom: "2rem" }}>
          <S.ContainerButtons>
            <S.SubmitButton
              title="Adicionar Especializada"
              onClick={() => {
                setShowModalAdd(!showModalAdd);
              }}
            >
              Adicionar
            </S.SubmitButton>
          </S.ContainerButtons>
        </S.Row>
        <S.Row>
          <S.Section style={{ width: "50%" }}>
            <S.SectionTitle>Especializada:</S.SectionTitle>
            <S.FieldContainer>
              <S.CustomSelect
                isLoading={loadingSpecialsList}
                placeholder="Selecione a especializada"
                options={specialsList}
                onChange={(item: any) => {
                  setId(item.value);
                  setTxEspecializada(item.txEspecializada);
                  setIdSecretaria(item.idSecretaria);
                  setIsRpv(item.isRpv);
                  setIsBloqueado(item.isBloqueado);
                }}
              />
            </S.FieldContainer>
          </S.Section>
          {id > 0 && (
            <>
              <S.Section style={{ marginLeft: "3rem" }}>
                <S.Button
                  title="Editar"
                  colorHover={theme.colors.softYellow}
                  onClick={() => {
                    setShowModalEditar(!showModalEditar);
                  }}
                >
                  <PencilSimple weight="fill" size={20} />
                </S.Button>
              </S.Section>
              {!specialAttorneyList && (
                <S.Section style={{ marginLeft: "1rem" }}>
                  <S.Button
                    title="Excluir"
                    colorHover={theme.colors.softRed}
                    onClick={() => {
                      setShowModalRemove(!showModalRemove);
                    }}
                  >
                    <X weight="fill" size={20} />
                  </S.Button>
                </S.Section>
              )}
            </>
          )}
        </S.Row>
        {id > 0 && (
          <>
            <S.ListRow>
              <S.ListStatusWrapper>
                <S.StatusLabelTitle>Legendas:</S.StatusLabelTitle>
                <S.StatusSection>
                  <S.StatusLabel>
                    <Rectangle
                      weight="fill"
                      size={12}
                      color={theme.colors.jvrisAqua}
                    />
                  </S.StatusLabel>
                  <S.StatusLabel>Chefia de Especializada</S.StatusLabel>
                </S.StatusSection>
                <S.StatusSection>
                  <S.StatusLabelBold>DM -</S.StatusLabelBold>
                  <S.StatusLabel>Distribuição Manual</S.StatusLabel>
                </S.StatusSection>
                <S.StatusSection>
                  <S.StatusLabelBold>DA -</S.StatusLabelBold>
                  <S.StatusLabel>Distribuição Automática</S.StatusLabel>
                </S.StatusSection>
              </S.ListStatusWrapper>
            </S.ListRow>
            <S.ListRow>
              <ListBoxWidget
                firstList={attorneysList ?? []}
                secondList={specialAttorneyList ?? []}
                idEspecializada={id}
              />
            </S.ListRow>
          </>
        )}
      </S.Wrapper>
    </>
  );
};

export default Motoristas;
