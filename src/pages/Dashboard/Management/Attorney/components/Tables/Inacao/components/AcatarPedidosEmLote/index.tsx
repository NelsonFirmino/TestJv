import { Eye, EyeSlash } from "phosphor-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { postComplyRequestForInactionv2 } from "../../../../../../../../../api/services/complyRequestForInaction/complyRequestForInaction";
import { BaseModal } from "../../../../../../../../../components/BaseModal";
import { SharedState } from "../../../../../../../../../context/SharedContext";
import { AcatarPedidosEmLote } from "./acatar-pedidos-em-lote.interface";
import * as S from "./styled";

export const AcatarPedidoEmLote = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [showSelectedProcess, setShowSelectedProcess] = useState(false);
  const [isRecusado, setIsRecusado] = useState(false);
  const {
    user,
    selectedUser,
    selectedInactionDataTable,
    setSelectedInactionDataTable,
    setSelectedRowHashes,
  } = SharedState();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<AcatarPedidosEmLote>({
    mode: "onChange",
  });
  let countAcatoS = 0;
  let countAcatoF = 0;

  const {
    mutate: mutateComplyRequestForInactionv2,
    isLoading: isLoadingComplyRequestForInactionv2,
  } = useMutation(postComplyRequestForInactionv2, {
    onSuccess: (res) => {
      countAcatoS++;
    },
    onError: () => {
      countAcatoF++;
    },
    onSettled: (res) => {
      if (countAcatoS + countAcatoF === selectedInactionDataTable.length) {
        toast(
          `Total selecionado: ${selectedInactionDataTable.length}
                    Acatos com sucesso: ${countAcatoS}
                    Falhas no acato: ${countAcatoF}
                `,
          {
            style: {
              borderRadius: "10px",
              background: "#c2b32d",
              color: "#fff",
              fontSize: "30px",
            },
          }
        );
        queryClient.invalidateQueries(
          `inactions-attorney-${selectedUser?.id || +user["Jvris.User.Id"]}`
        );
        queryClient.invalidateQueries(
          `distributions-attorney-${selectedUser?.id || +user["Jvris.User.Id"]}`
        );
        setSelectedInactionDataTable([]);
        setSelectedRowHashes([]);
        countAcatoS = 0;
        countAcatoF = 0;
        setOpenModal(false);
      }
    },
  });

  const onSubmit: SubmitHandler<AcatarPedidosEmLote> = async (params) => {
    selectedInactionDataTable.forEach((p) => {
      mutateComplyRequestForInactionv2({
        id: p.id,
        txObservacao: params.txObservacao,
        idUsuarioCadastro: user["Jvris.User.Id"],
        isRecusado,
      });
    });
  };

  return (
    <>
      <BaseModal
        title="Acatar pedido(s)"
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
      >
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.Section>
            <S.SectionTitle>
              Número dos processos ({selectedInactionDataTable.length})
              <S.ContainerShowProcessNumber
                onClick={() => setShowSelectedProcess(!showSelectedProcess)}
              >
                {showSelectedProcess ? (
                  <Eye size={20} />
                ) : (
                  <EyeSlash size={20} />
                )}
              </S.ContainerShowProcessNumber>
            </S.SectionTitle>

            <S.SelectedProcessNumberContainer isOpen={showSelectedProcess}>
              {selectedInactionDataTable.map((p) => (
                <S.SelectedProcessNumber>
                  {p.txNumeroProcesso}
                </S.SelectedProcessNumber>
              ))}
            </S.SelectedProcessNumberContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Parecer</S.SectionTitle>

            <S.TextAreaAcato
              {...register("txObservacao", {
                required: true,
              })}
              placeholder="Escreva aqui..."
            />
          </S.Section>

          <S.Section>
            <S.SectionTitle>Acatar pedido?</S.SectionTitle>
            <S.ButtonContainer>
              <S.ConfirmButton
                type="submit"
                disabled={isLoadingComplyRequestForInactionv2 || !isValid}
                onClick={() => setIsRecusado(false)}
              >
                Sim
              </S.ConfirmButton>

              {isLoadingComplyRequestForInactionv2 && <S.LoadingSpinner />}

              <S.CancelButton
                type="submit"
                disabled={isLoadingComplyRequestForInactionv2 || !isValid}
                onClick={() => setIsRecusado(true)}
              >
                Não
              </S.CancelButton>
            </S.ButtonContainer>
          </S.Section>
        </S.Form>
      </BaseModal>
      <S.Button onClick={() => setOpenModal(true)}>Acatar pedido(s)</S.Button>
    </>
  );
};
