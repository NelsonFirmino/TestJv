import * as S from "./styled";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ModalAddProps } from "./modaldevolucao.interface";
import toast from "react-hot-toast";
import theme from "../../../../../../globalStyle/theme";
import { useMotivosDevolucaoSelect } from "../../../../../../hooks/useMotivosDevolucao";
import { postFichaDCJEDevolucao } from "../../../../../../api/services/fichaDCJEDevolucao/fichaDCJEDevolucao";
import { SharedState } from "../../../../../../context/SharedContext";

export const ModalDevolucao = ({
  setShowModalDevolucao: setShowModalDevolucao,
  idFichaProcessual,
  numProcesso,
}: ModalAddProps) => {
  const { user } = SharedState();
  const { motivosDevolucao, isLoadingMotivosDevolucao } =
    useMotivosDevolucaoSelect();

  motivosDevolucao?.sort((a, b) => (a.label > b.label ? 1 : -1));

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<ModalAddProps>({
    mode: "onChange",
  });

  const handleToast = (
    msg: string,
    error: boolean = false,
    setModal: boolean = true
  ) => {
    !error
      ? toast(msg, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        })
      : toast.error(msg, {
          icon: "😥",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
    if (setModal) setShowModalDevolucao(false);
  };

  const handleCancel = () => {
    setShowModalDevolucao(null);
  };

  const onSubmit: SubmitHandler<ModalAddProps> = async (data: any) => {
    postFichaDCJEDevolucao({
      idFichaProcessual,
      idMotivo: data.idMotivo.value,
      txObservacoes: data.txObservacao,
      idUsuarioCadastro: +user["Jvris.User.Id"],
    })
      .then((response) => {
        if (response.status == "Created") {
          handleToast("Devolução realizada com Sucesso");
        } else {
          handleToast("Erro ao Tentar Fazer Devolução, tente novamente!", true);
        }
      })
      .catch((e) => {
        handleToast("Erro ao Tentar Fazer Devolução, tente novamente!", true);
      });
  };

  return (
    <>
      <S.Wrapper>
        <S.Modal>
          <S.TitleContainer>
            <S.TitleModal>DEVOLUÇÃO DE FICHA</S.TitleModal>
            <S.CloseModal onClick={handleCancel}>Fechar</S.CloseModal>
          </S.TitleContainer>
          <S.ContainerForm>
            <S.Form onSubmit={handleSubmit(onSubmit)}>
              <S.Row>
                <S.ContainerField style={{ width: "40%" }}>
                  <S.FieldTitle>
                    Nº da Ficha Processual:{" "}
                    <b style={{ fontSize: "12px", paddingLeft: "4px" }}>
                      {idFichaProcessual}
                    </b>
                  </S.FieldTitle>
                </S.ContainerField>
                <S.ContainerField>
                  <S.FieldTitle>
                    Número do Processo:{" "}
                    <b style={{ fontSize: "12px", paddingLeft: "4px" }}>
                      {numProcesso}
                    </b>
                  </S.FieldTitle>
                </S.ContainerField>
              </S.Row>
              <S.ContainerField>
                <S.FieldTitle>Motivo: *</S.FieldTitle>
                <Controller
                  name="idMotivo"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      menuPosition="fixed"
                      placeholder="Selecione um motivo"
                      isLoading={isLoadingMotivosDevolucao}
                      options={motivosDevolucao}
                      required={true}
                      isClearable={true}
                      {...field}
                    />
                  )}
                />
              </S.ContainerField>
              <S.ContainerField>
                <S.FieldTitle>Observações: *</S.FieldTitle>
                <S.TextAreaInput
                  placeholder="Digite aqui as informações da Razão para Pedido"
                  {...register("txObservacao", {
                    minLength: 5,
                    required: true,
                  })}
                />
              </S.ContainerField>
              <S.ContainerSubmitButton>
                <S.SubmitButton disabled={!isValid}>Salvar</S.SubmitButton>
                <S.SubmitButton
                  style={{
                    marginLeft: "1rem",
                    backgroundColor: theme.colors.softRed,
                  }}
                  onClick={handleCancel}
                >
                  Cancelar
                </S.SubmitButton>
              </S.ContainerSubmitButton>
            </S.Form>
          </S.ContainerForm>
        </S.Modal>
      </S.Wrapper>
    </>
  );
};
