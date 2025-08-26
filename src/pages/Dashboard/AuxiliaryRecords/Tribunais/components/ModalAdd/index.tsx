import { useQueryClient } from "react-query";
import * as S from "./styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalAddProps } from "./modaladd.interface";
import toast from "react-hot-toast";
import {
  postTribunal,
  updateTribunal,
} from "../../../../../../api/services/tribunais/tribunais";

export const ModalAdd = ({
  setShowModalAdd: setShowModalAdd,
  txTribunal,
  txSigla,
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
      ? updateTribunal(data.id, data.txTribunal, data.txSigla)
          .then((response) => {
            if (response.status == "OK") {
              queryClient.invalidateQueries(`tribunais`);
              handleToast("Tribunal Alterado com Sucesso");
            }
          })
          .catch((err) => {
            handleToast(
              "Erro ao Tentar Alterar Tribunal, tente novamente!",
              true
            );
          })
      : postTribunal(data.txTribunal, data.txSigla)
          .then((response) => {
            if (response.status == "Created") {
              queryClient.invalidateQueries(`tribunais`);
              handleToast("Tribunal Adicionado com Sucesso");
            }
          })
          .catch((err) => {
            handleToast(
              "Erro ao Tentar Adicionar Tribunal, tente novamente!",
              true
            );
          });
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>
            {id ? "Editar Tribunal" : "Adicionar Novo Tribunal"}
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
              <S.FieldTitle htmlFor="txTribunal">Tribunal</S.FieldTitle>
              <S.TextInput
                defaultValue={txTribunal}
                maxLength={56}
                minLength={3}
                required={true}
                autoFocus
                placeholder="Digite aqui o nome do tribunal"
                {...register("txTribunal", {
                  maxLength: 56,
                  minLength: 3,
                  required: true,
                })}
              />
            </S.ContainerField>
            <S.ContainerField>
              <S.FieldTitle htmlFor="txSigla">Sigla</S.FieldTitle>
              <S.TextInput
                defaultValue={txSigla}
                maxLength={56}
                minLength={3}
                required={true}
                autoFocus
                placeholder="Digite aqui a sigla"
                {...register("txSigla", {
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
