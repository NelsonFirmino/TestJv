import { useQueryClient } from "react-query";
import * as S from "./styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalAddProps } from "./modaladd.interface";
import toast from "react-hot-toast";
import {
  postOrigemDespesas,
  putOrigemDespesasByID,
} from "../../../../../../api/services/rpvOrigemDespesas/rpvOrigemDespesas";
import { SharedState } from "../../../../../../context/SharedContext";

export const ModalAdd = ({
  setShowModalAdd: setShowModalAdd,
  txOrigem,
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

  const onSubmit: SubmitHandler<ModalAddProps> = async (data) => {
    data.id
      ? putOrigemDespesasByID({
          id: data.id,
          txOrigem: data.txOrigem,
          idUsuarioCadastro: +user["Jvris.User.Id"],
        }).then((response) => {
          if (response.status == "OK") {
            queryClient.invalidateQueries(`origemDespesas`);
            handleToast("Origem da Despesa Alterada com Sucesso");
          } else {
            handleToast(
              "Erro ao Tentar Alterar Origem da Despesa, tente novamente!",
              true
            );
          }
        })
      : postOrigemDespesas({
          txOrigem: data.txOrigem,
          idUsuarioCadastro: +user["Jvris.User.Id"],
        }).then((response) => {
          if (response.status == "Created") {
            queryClient.invalidateQueries(`origemDespesas`);
            handleToast("Origem da Despesa Adicionada com Sucesso");
          } else {
            handleToast(
              "Erro ao Tentar Adicionar Origem da Despesa, tente novamente!",
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
              ? "Editar Origem da Despesa"
              : "Adicionar Nova Origem da Despesa"}
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
              <S.FieldTitle htmlFor="txOrigem">Origem da Despesa</S.FieldTitle>
              <S.TextInput
                defaultValue={txOrigem}
                maxLength={56}
                minLength={3}
                required={true}
                autoFocus
                placeholder="Digite aqui a Origem da Despesa"
                {...register("txOrigem", {
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
