import { useQueryClient } from "react-query";
import * as S from "./styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalAddProps } from "./modaladd.interface";
import toast from "react-hot-toast";
import {
  postSistemasProcessuais,
  putSistemasProcessuaisByID,
} from "../../../../../../api/services/sistemasProcessuais/sistemasProcessuais";

export const ModalAdd = ({
  setShowModalAdd: setShowModalAdd,
  txSistemaProcessual,
  id,
}: ModalAddProps) => {
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

  const onSubmit: SubmitHandler<ModalAddProps> = async (data) => {
    data.id
      ? putSistemasProcessuaisByID({
          id: data.id,
          txSistemaProcessual: data.txSistemaProcessual,
        }).then((response) => {
          if (response.status == "OK") {
            queryClient.invalidateQueries(`sistemasProcessuais`);
            handleToast("Sistema Processual Alterado com Sucesso");
          } else {
            handleToast(
              "Erro ao Tentar Alterar Sistema Processual, tente novamente!",
              true
            );
          }
        })
      : postSistemasProcessuais({
          txSistemaProcessual: data.txSistemaProcessual,
        }).then((response) => {
          if (response.status == "Created") {
            queryClient.invalidateQueries(`sistemasProcessuais`);
            handleToast("Sistema Processual Adicionado com Sucesso");
          } else {
            handleToast(
              "Erro ao Tentar Adicionar Sistema Processual, tente novamente!",
              true
            );
          }
        });
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>
            {id
              ? "Editar Sistema Processual"
              : "Adicionar Novo Sistema Processual"}
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
              <S.FieldTitle htmlFor="txSistemaProcessual">
                Sistema Processual
              </S.FieldTitle>
              <S.TextInput
                defaultValue={txSistemaProcessual}
                maxLength={56}
                minLength={3}
                required={true}
                autoFocus
                placeholder="Digite aqui o nome do Sistema Processual"
                {...register("txSistemaProcessual", {
                  maxLength: 56,
                  minLength: 3,
                  required: true,
                })}
              />
            </S.ContainerField>

            <S.ContainerSubmitButton>
              <S.SubmitButton disabled={!isValid}>Salvar</S.SubmitButton>
            </S.ContainerSubmitButton>
          </S.Form>
        </S.ContainerForm>
      </S.Modal>
    </S.Wrapper>
  );
};
