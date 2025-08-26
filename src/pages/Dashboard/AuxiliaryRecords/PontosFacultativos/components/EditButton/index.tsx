import * as S from "./styled";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from 'react-query';

import { BaseModal } from "../../../../../../components/BaseModal";
import toast from 'react-hot-toast';
import { updatePontoFacultativo } from '../../../../../../api/services/pontos-facultativos/pontos-facultativos';

export const EditButton = ({ dataTable }: any) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();
  const [txPontoFacultativo, setTxPontoFacultativo] = useState<string>("");
  const [dtPontoFacultativo, setDtPontoFacultativo] = useState("");
  const [txDiarioOficial, setTxDiarioOficial] = useState<string>("");

  //*! =========================================[REGRAS]==========================================

  const isDataFutura = (data) => {
    return new Date(data) > new Date()
      ? true
      : false;
  }

  const isFormularioInvalido = !txPontoFacultativo || !isDataFutura(dtPontoFacultativo);

  //*! =========================================[REQUEST]==========================================

  const requestUpdate = useMutation(updatePontoFacultativo, {
    onSettled: ({ status, message }) => {
      if (status === "OK") {
        toast(message, {
          icon: "✔",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        });
        queryClient.invalidateQueries(`pontosFacultativos`);
        setOpenModal(false);
      }
      else if (status === "BadRequest") {
        const formattedMessage = message
          .replace("Validation failed: \r\n", "")
          .split("\r\n -- ")
          .map((error) => error.replace(/^\s*--\s*/, ""))
          .map((error) => `• ${error}`)
          .join("\n");

        toast.error(formattedMessage, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
      } else {
        toast.error(message, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
      }
    },
  });

  //*! ========================================[HANDLERS]==========================================

  const handleTxPontoFacultativo = (event) => {
    const inputValue = event.target.value;
    setTxPontoFacultativo(inputValue);
  }

  const handleDtPontoFacultativo = (event) => {
    const inputValue = event.target.value;
    setDtPontoFacultativo(inputValue);
  }

  const handleTxDiarioOficial = (event)  =>{
    const inputValue = event.target.value;
    setTxDiarioOficial(inputValue);
  }

  useEffect(() => {
    if (dataTable) {
      setTxPontoFacultativo(dataTable.txPontoFacultativo);
      setDtPontoFacultativo(dataTable.dtPontoFacultativo);
      setTxDiarioOficial(dataTable.txDiarioOficial);
    }
  }, [isOpenModal]);



  //*! ========================================[INTERFACE]=========================================

  return (
    <>
      <BaseModal
        title="Editar Ponto Facultativo"
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}>
        <S.FormContainer>
          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Ponto Facultativo: *</S.FieldTitle>
                <S.FieldContainer>
                  <S.Input
                    type='text'
                    inputMode='text'
                    maxLength={50}
                    minLength={1}
                    required={true}
                    placeholder='Informe Ponto Facultativo'
                    defaultValue={txPontoFacultativo}
                    value={txPontoFacultativo}
                    onChange={(e) => {
                      handleTxPontoFacultativo(e);
                    }}
                  />
                </S.FieldContainer>

                {
                  txPontoFacultativo.length > 0
                  ? ''
                  : <S.ErrorSpan>O campo Ponto Facultativo precisa ser fornecido</S.ErrorSpan>
                }

              </S.ContainerField>
          </S.ContentSection>

          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Data do Ponto Facultativo</S.FieldTitle>

              <S.DateContent>
                <S.DateInput
                  type='date'
                  required={true}
                  defaultValue={dtPontoFacultativo}
                  value={dtPontoFacultativo}
                  onChange={(e) => {
                    handleDtPontoFacultativo(e);
                  }}
                />
              </S.DateContent>

              {
                isDataFutura(dtPontoFacultativo)
                ? ''
                : <S.ErrorSpan>Data deve ser maior que a data atual</S.ErrorSpan>
              }
            </S.ContainerField>
          </S.ContentSection>

          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Diário Ofícial:</S.FieldTitle>
                <S.FieldContainer>
                  <S.Input
                    type='text'
                    inputMode='text'
                    maxLength={50}
                    minLength={0}
                    autoFocus
                    placeholder='Informe o Diário Ofícial'
                    defaultValue={txDiarioOficial}
                    value={txDiarioOficial}
                    onChange={(e) => {
                      handleTxDiarioOficial(e);
                    }}
                  />
                </S.FieldContainer>
              </S.ContainerField>
          </S.ContentSection>
        </S.FormContainer>

        <S.OptionsContainer>
          <S.OptionCancel onClick={() => setOpenModal(false)}>
            Cancelar
          </S.OptionCancel>
          <S.OptionSave
                disabled={isFormularioInvalido}
                onClick={() => requestUpdate.mutate({
                    id: dataTable?.id,
                    txPontoFacultativo: txPontoFacultativo,
                    dtPontoFacultativo: dtPontoFacultativo,
                    txDiarioOficial: txDiarioOficial
                })}
          >
            Salvar
          </S.OptionSave>
        </S.OptionsContainer>

      </BaseModal>
      <S.Wrapper onClick={() => setOpenModal(true)}>Editar</S.Wrapper>
    </>
  );
};
