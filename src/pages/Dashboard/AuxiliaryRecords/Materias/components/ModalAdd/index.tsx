import { useQueryClient } from "react-query";
import * as S from "./styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalAddProps } from "./modaladd.interface";
import toast from "react-hot-toast";
import {
  postMateria,
  updateMateria,
} from "../../../../../../api/services/materias/materias";

export const ModalAdd = ({
  setShowModalAdd: setShowModalAdd,
  txMateria,
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
      ? updateMateria(data.id, data.txMateria)
          .then((response) => {
            if (response.status == "OK") {
              queryClient.invalidateQueries(`materias`);
              handleToast("Matéria Alterada com Sucesso");
            }
          })
          .catch((error) => {
            handleToast(
              "Erro ao Tentar Alterar Matéria, tente novamente!",
              true
            );
          })
      : postMateria(data.txMateria)
          .then((response) => {
            if (response.status == "Created") {
              queryClient.invalidateQueries(`materias`);
              handleToast("Matéria Adicionada com Sucesso");
            }
          })
          .catch((error) => {
            handleToast(
              "Erro ao Tentar Adicionar Matéria, tente novamente!",
              true
            );
          });
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>
            {id ? "Editar Matéria" : "Adicionar Nova Matéria"}
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
              <S.FieldTitle htmlFor="txMateria">Materia</S.FieldTitle>
              <S.TextInput
                defaultValue={txMateria}
                maxLength={56}
                minLength={3}
                required={true}
                autoFocus
                placeholder="Digite aqui o nome da Materia"
                {...register("txMateria", {
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
