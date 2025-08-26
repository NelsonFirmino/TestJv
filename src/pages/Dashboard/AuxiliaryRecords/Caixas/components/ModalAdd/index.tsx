import { useQueryClient } from "react-query";
import * as S from "./styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalAddProps } from "./modaladd.interface";
import toast from "react-hot-toast";
import {
  postCaixa,
  updateCaixa,
} from "../../../../../../api/services/caixas/caixas";
import { SharedState } from "../../../../../../context/SharedContext";

export const ModalAdd = ({
  setShowModalAdd: setShowModalAdd,
  txCaixa,
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
      ? updateCaixa(data.id, data.txCaixa, user["Jvris.User.Id"])
          .then((response) => {
            if (response.status == "Created") {
              queryClient.invalidateQueries(`caixas`);
              handleToast("Caixa Alterada com Sucesso");
            }
          })
          .catch((error) => {
            handleToast("Erro ao Tentar Alterar Caixa, tente novamente!", true);
          })
      : postCaixa(data.txCaixa, user["Jvris.User.Id"])
          .then((response) => {
            if (response.status == "Created") {
              queryClient.invalidateQueries(`caixas`);
              handleToast("Caixa Adicionada com Sucesso");
            }
          })
          .catch((error) => {
            handleToast(
              "Erro ao Tentar Adicionar Caixa, tente novamente!",
              true
            );
          });
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>
            {id ? "Editar Caixa" : "Adicionar Nova Caixa"}
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
              <S.FieldTitle htmlFor="txCaixa">Caixa</S.FieldTitle>
              <S.TextInput
                defaultValue={txCaixa}
                maxLength={56}
                minLength={3}
                required={true}
                autoFocus
                placeholder="Digite aqui o nome da Caixa"
                {...register("txCaixa", {
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
