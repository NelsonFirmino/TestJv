import { useQueryClient } from "react-query";
import * as S from "./styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalAddProps } from "./modaladd.interface";
import toast from "react-hot-toast";
import {
  postTiposAusencias,
  putTiposAusenciasByID,
} from "../../../../../../api/services/tiposAusencias/tiposAusencias";

export const ModalAdd = ({
  setShowModalAdd: setShowModalAdd,
  txTipoAusencia,
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
      ? putTiposAusenciasByID({
          id: data.id,
          txTipoAusencia: data.txTipoAusencia,
        }).then((response) => {
          if (response.status == "OK") {
            queryClient.invalidateQueries(`tiposAusencias`);
            handleToast("Tipo de Ausência Alterado com Sucesso");
          } else {
            handleToast(
              "Erro ao Tentar Alterar Tipo de Ausência, tente novamente!",
              true
            );
          }
        })
      : postTiposAusencias({
          txTipoAusencia: data.txTipoAusencia,
        }).then((response) => {
          if (response.status == "Created") {
            queryClient.invalidateQueries(`tiposAusencias`);
            handleToast("Tipo de Ausência Adicionado com Sucesso");
          } else {
            handleToast(
              "Erro ao Tentar Adicionar Tipo de Ausência, tente novamente!",
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
            {id ? "Editar Tipo de Ausência" : "Adicionar Novo Tipo de Ausência"}
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
              <S.FieldTitle htmlFor="txTipoAusencia">
                Tipo de Ausência
              </S.FieldTitle>
              <S.TextInput
                defaultValue={txTipoAusencia}
                maxLength={56}
                minLength={3}
                required={true}
                autoFocus
                placeholder="Digite aqui o nome do Tipo de Ausência"
                {...register("txTipoAusencia", {
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
