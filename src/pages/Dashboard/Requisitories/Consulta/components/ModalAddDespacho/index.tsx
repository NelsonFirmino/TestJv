import * as S from "./styled";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ModalAddProps } from "./modaladddespacho.interface";
import toast from "react-hot-toast";
import { postDispatch } from "../../../../../../api/services/dispatch/dispatchModal/dispatch";
import { useTypeOfDispatch } from "../../../../../../hooks/useTypeOfDispatch";
import { SharedState } from "../../../../../../context/SharedContext";

export const ModalAddDespacho = ({
  setShowModalAdd: setShowModalAdd,
  id,
  idAto,
  idProcurador,
}: ModalAddProps) => {
  const { user } = SharedState();
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<ModalAddProps>({
    mode: "onChange",
  });

  const { dispatchList, loadingTypeOfDispatchList } = useTypeOfDispatch();

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

  const onSubmit: SubmitHandler<ModalAddProps> = async (data: any) => {
    postDispatch({
      id: id,
      idAto: idAto,
      idTipoDespacho: data.idTipoDespacho.value,
      idProcurador: idProcurador,
      txObservacao: data.txObservacao,
      idUsuarioCadastrado: user["Jvris.User.Id"],
    } as any)
      .then((response) => {
        if (response.status == "Created") {
          handleToast("Despacho Realizado com Sucesso");
        } else {
          handleToast(
            "Erro ao Tentar Realizar Despacho, tente novamente!",
            true
          );
        }
      })
      .catch((err) => {
        handleToast("Erro ao Tentar Realizar Despacho, tente novamente!", true);
      });
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>Despacho</S.TitleModal>
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
            <S.FieldTitle>Tipo:</S.FieldTitle>
            <S.ContainerField>
              <Controller
                name="idTipoDespacho"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    isDisabled={false}
                    placeholder="Selecione o tipo de despacho"
                    isLoading={loadingTypeOfDispatchList}
                    options={dispatchList}
                    {...field}
                  />
                )}
              />
            </S.ContainerField>
            <S.ContainerField>
              <S.FieldTitle htmlFor="txOrigem">Origem da Despesa</S.FieldTitle>
              <S.TextAreaInput
                placeholder="Digite aqui a Origem da Despesa"
                {...register("txObservacao", {
                  maxLength: 240,
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
