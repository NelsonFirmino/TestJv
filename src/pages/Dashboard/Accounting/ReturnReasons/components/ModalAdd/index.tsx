import { useQueryClient } from "react-query";
import * as S from "./styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalAddProps } from "./modaladd.interface";
import toast from "react-hot-toast";
import theme from "../../../../../../globalStyle/theme";
import {
  postMotivosDevolucao,
  putMotivosDevolucaoByID,
} from "../../../../../../api/services/motivos-devolucao/motivosDevolucao";
import { SharedState } from "../../../../../../context/SharedContext";

export const ModalAdd = ({
  setShowModalAdd: setShowModalAdd,
  txMotivo,
  id,
}: ModalAddProps) => {
  const { user } = SharedState();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ModalAddProps>({
    mode: "onChange",
  });

  const handleToast = (msg: string, error: boolean = false) => {
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
    setShowModalAdd(false);
  };

  const handleCancel = () => {
    setShowModalAdd(false);
  };

  const onSubmit: SubmitHandler<ModalAddProps> = async (data) => {
    data.id
      ? putMotivosDevolucaoByID({
          id: data.id,
          txMotivo: data.txMotivo,
          idUsuarioCadastro: +user["Jvris.User.Id"],
        })
          .then((response) => {
            if (response.status == "OK") {
              handleToast("Motivo para Devolução Alterado com Sucesso");
              queryClient.invalidateQueries(`motivosDevolucao`);
            } else {
              handleToast(response.message, true);
            }
          })
          .catch((e) => {
            handleToast(
              "Erro ao Tentar Alterar Motivo para Devolução, tente novamente!",
              true
            );
          })
      : postMotivosDevolucao({
          txMotivo: data.txMotivo,
          idUsuarioCadastro: +user["Jvris.User.Id"],
        })
          .then((response) => {
            if (response.status == "Created") {
              handleToast("Motivo para Devolução Adicionado com Sucesso");
              queryClient.invalidateQueries(`motivosDevolucao`);
            } else {
              handleToast(response.message, true);
            }
          })
          .catch((e) => {
            handleToast(
              "Erro ao Tentar Adicionar Motivo para Devolução, tente novamente!",
              true
            );
          });
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>
            {id
              ? "Editar Motivo para Devolução"
              : "Adicionar Novo Motivo para Devolução"}
          </S.TitleModal>
          <S.CloseModal
            onClick={() => {
              setShowModalAdd(false);
            }}
          >
            Fechar
          </S.CloseModal>
        </S.TitleContainer>
        <S.ContainerForm>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.TextAreaInput hidden defaultValue={id} {...register("id")} />
            <S.ContainerField>
              <S.FieldTitle>Motivo para Devolução</S.FieldTitle>
              <S.TextInput
                defaultValue={txMotivo}
                maxLength={56}
                minLength={3}
                required={true}
                autoFocus
                placeholder="Digite aqui o nome do Motivo para Devolução"
                {...register("txMotivo", {
                  maxLength: 56,
                  minLength: 3,
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
  );
};
