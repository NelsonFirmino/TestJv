import * as S from "./styled";

import { useMutation, useQueryClient } from 'react-query';

import { BaseModal } from "../../../../../../components/BaseModal";
import { postPontoFacultativo } from '../../../../../../api/services/pontos-facultativos/pontos-facultativos';
import toast from 'react-hot-toast';
import { useState } from "react";

interface CreateButtonProps {
  isOpen: boolean;
  resetStates: () => void;
  onClose: () => void;
}

export const CreateButton = ({ isOpen, onClose }: CreateButtonProps) => {
  const queryClient = useQueryClient();
  const [txPontoFacultativo, setTxPontoFacultativo] = useState<string>("");
  const [dtPontoFacultativo, setDtPontoFacultativo] = useState(new Date(Date.now() + 86400000).toISOString().split("T")[0]);
  const [txDiarioOficial, setTxDiarioOficial] = useState<string>("");

  const resetStates = () => {
    setTxPontoFacultativo("");
    setDtPontoFacultativo(new Date(Date.now() + 86400000).toISOString().split("T")[0]);
    setTxDiarioOficial("");
  };

  //*! =========================================[REQUEST]==========================================

  const requestPost = useMutation(postPontoFacultativo, {
    onSettled: ({ status, message }) => {
      if (status === "Created") {
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
        resetStates();
        onClose()
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
      }
      else {
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

  //*! =========================================[HANDLES]==========================================

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

  //*! =========================================[REGRAS]==========================================

  const isDataFutura = (data) => {
    return new Date(data) > new Date()
      ? true
      : false;
  }

  const isFormularioInvalido = !txPontoFacultativo || !isDataFutura(dtPontoFacultativo);

  //*! ========================================[INTERFACE]=========================================
  return (
    <>
      <BaseModal
        title="Cadastrar Ponto Facultativo"
        isOpenModal={isOpen}
        setOpenModal={onClose}>
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
                    placeholder='Informe o Ponto Facultativo'
                    defaultValue={txPontoFacultativo}
                    value={txPontoFacultativo}
                    onChange={(e) => {
                      handleTxPontoFacultativo(e);
                    }}
                  />
                </S.FieldContainer>
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
          <S.OptionCancel onClick={() => {
              resetStates();
              onClose()
            }
          }>
            Cancelar
          </S.OptionCancel>
          <S.OptionSave
                disabled={isFormularioInvalido}
                onClick={() => requestPost.mutate({
                    txPontoFacultativo: txPontoFacultativo,
                    dtPontoFacultativo: dtPontoFacultativo,
                    txDiarioOficial: txDiarioOficial
                })}
          >
            Salvar
          </S.OptionSave>
        </S.OptionsContainer>
      </BaseModal>
    </>
  );
};
