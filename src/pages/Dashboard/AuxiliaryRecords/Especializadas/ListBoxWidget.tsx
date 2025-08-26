import { ArrowsLeftRight, Info } from "phosphor-react";
import { useEffect, useState } from "react";
import { getProcuradoresByEspecializada } from "../../../../api/services/specials/specials";
import theme from "../../../../globalStyle/theme";
import { ModalAddProcurador } from "./components/ModalAddProcurador";
import { ModalRemoveProcurador } from "./components/ModalRemoveProcurador";
import * as S from "./styled";

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>;

export default function ListBoxWidget(props) {
  const { firstList, secondList, idEspecializada } = props;
  const [firstListValues, setFirstListValues] = useState(firstList);
  const [secondListValues, setSecondListValues] = useState(secondList);

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState<boolean>(null);

  const [idProcurador, setIdProcurador] = useState(0);
  const [txProcurador, setTxProcurador] = useState("");
  const [txProcuradorFull, setTxProcuradorFull] = useState("");

  useEffect(() => {
    if (firstList) {
      setFirstListValues(firstList);
    }
  }, [firstList]);

  useEffect(() => {
    if (secondList) {
      setSecondListValues(secondList);
      removeOnLoad(secondList);
    }
  }, [secondList]);

  useEffect(() => {
    if (showModalAdd == false || showModalRemove == false) {
      getProcuradoresByEspecializada(idEspecializada).then((response) => {
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
        setSecondListValues(specialsProcuradoresList);
        removeOnLoad(specialsProcuradoresList);
      });
    }
  }, [showModalAdd, showModalRemove]);

  const removeOnLoad = (secList) => {
    let newList = firstList;
    if (secList?.length > 0) {
      secList.map((element) => {
        newList = newList.filter((item) => item.value != element.value);
      });
    }
    setFirstListValues(newList);
  };

  return (
    <>
      {showModalAdd && (
        <ModalAddProcurador
          setShowModalAdd={setShowModalAdd}
          txProcurador={txProcurador}
          idEspecializada={idEspecializada}
          idProcurador={idProcurador}
        />
      )}

      {showModalRemove && (
        <ModalRemoveProcurador
          setShowModalRemove={setShowModalRemove}
          idEspecializada={idEspecializada}
          idProcurador={idProcurador}
          txProcurador={txProcuradorFull}
        />
      )}
      <S.ListBoxRow>
        <S.ListCol2>
          <S.LabelField style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
            CORPO GERAL DE PROCURADORES
          </S.LabelField>
          <S.ListSelect multiple>
            {firstListValues?.map((item: any) => (
              <S.ListOption
                chefeBG={item.isChefe}
                value={item.value}
                label={item.label}
                onClick={() => {
                  setTxProcurador(item.label);
                  setIdProcurador(item.value);
                  setShowModalAdd(true);
                }}
              />
            ))}
          </S.ListSelect>
          <S.ListLabelRow>
            <Info size={26} weight="fill" color="#5c5c5c" />
            <S.ListLabel>
              Clique sobre o nome de um Procurador para ADICIONAR na
              especializada selecionada.
            </S.ListLabel>
          </S.ListLabelRow>
        </S.ListCol2>
        <S.ListCol1>
          <ArrowsLeftRight size={32} color={theme.colors.mediumGrey} />
        </S.ListCol1>
        <S.ListCol2>
          <S.LabelField style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
            PROCURADORES INCLUÍDOS NA ESPECIALIZADA
          </S.LabelField>
          {secondListValues && (
            <S.ListSelect multiple>
              {secondListValues?.map((item: any) => (
                <S.ListOption
                  selected={false}
                  chefeBG={item.isChefe}
                  value={item.value}
                  label={`${item.label} ${item.isChefe ? "(Chefe)" : ""} ${
                    item.isDistribuicaoAutomatica
                      ? item.nuPercentualDistribuicao
                        ? `(DA ${item.nuPercentualDistribuicao}%)`
                        : `(DA)`
                      : `(DM)`
                  }`}
                  onClick={() => {
                    setTxProcurador(item.label);
                    setTxProcuradorFull(
                      `${item.label} ${item.isChefe ? "(Chefe)" : ""} ${
                        item.isDistribuicaoAutomatica
                          ? item.nuPercentualDistribuicao
                            ? `(DA ${item.nuPercentualDistribuicao}%)`
                            : `(DA)`
                          : `(DM)`
                      }`
                    );
                    setIdProcurador(item.value);
                    setShowModalRemove(true);
                  }}
                />
              ))}
            </S.ListSelect>
          )}
          <S.ListLabelRow>
            <Info size={26} weight="fill" color="#5c5c5c" />
            <S.ListLabel>
              Clique sobre o nome de um Procurador para REMOVER da especializada
              selecionada.
            </S.ListLabel>
          </S.ListLabelRow>
        </S.ListCol2>
      </S.ListBoxRow>
    </>
  );
}
