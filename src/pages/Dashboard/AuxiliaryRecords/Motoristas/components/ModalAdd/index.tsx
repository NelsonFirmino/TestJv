import { useQueryClient } from "react-query";
import * as S from "./styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalAddProps } from "./modaladd.interface";
import {
  postMotorista,
  putMotoristaByID,
} from "../../../../../../api/services/motoristas/motoristas";
import toast from "react-hot-toast";

export const ModalAdd = ({
  setShowModalAdd: setShowModalAdd,
  txMotorista,
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
      ? putMotoristaByID({ id: data.id, txMotorista: data.txMotorista }).then(
          (response) => {
            if (response.status == "OK") {
              queryClient.invalidateQueries(`motoristas`);
              handleToast("Motorista Alterado com Sucesso");
            } else {
              handleToast(
                "Erro ao Tentar Alterar Motorista, tente novamente!",
                true
              );
            }
          }
        )
      : postMotorista({ txMotorista: data.txMotorista }).then((response) => {
          if (response.status == "Created") {
            queryClient.invalidateQueries(`motoristas`);
            handleToast("Motorista Adicionado com Sucesso");
          } else {
            handleToast(
              "Erro ao Tentar Adicionar Motorista, tente novamente!",
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
            {id ? "Editar Motorista" : "Adicionar Novo Motorista"}
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
              <S.FieldTitle htmlFor="txMotorista">Motorista</S.FieldTitle>
              <S.TextInput
                defaultValue={txMotorista}
                maxLength={56}
                minLength={3}
                required={true}
                autoFocus
                placeholder="Digite aqui o nome do motorista"
                {...register("txMotorista", {
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
