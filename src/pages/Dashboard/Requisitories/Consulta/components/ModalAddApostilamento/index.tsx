import * as S from "./styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalAddProps } from "./modaladdapostilamento.interface";
import toast from "react-hot-toast";
import { postApostilamento } from "../../../../../../api/services/rpvApostilamento/rpvApostilamento";
import { formatNumberText } from "../../../../../../utils/formatNumber.util";
import { useState } from "react";

export const ModalAddApostilamento = ({
  setShowModalAdd: setShowModalAdd,
  idRequisitorio,
  idUsuarioCadastro,
}: ModalAddProps) => {
  const defaultDate = new Date().toISOString().substring(0, 10);

  const [vaPagamento, setVaPagamento] = useState<number>(0);

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
    postApostilamento({
      idRequisitorio: idRequisitorio,
      dtLimitePagamento: data.dtLimitePagamento,
      vaPagamento: vaPagamento,
      idUsuarioCadastro: idUsuarioCadastro,
    })
      .then((response) => {
        if (response.status == "Created") {
          handleToast("Apostilamento Realizado com Sucesso");
        } else {
          handleToast(
            "Erro ao Tentar Realizar Apostilamento, tente novamente!",
            true
          );
        }
      })
      .catch((e) => {
        handleToast(
          "Erro ao Tentar Realizar Apostilamento, tente novamente!",
          true
        );
      });
  };

  function handleValorChange(e: any) {
    const valorNumerico = e.replace(/\D/g, "");
    setVaPagamento(parseFloat(valorNumerico) / 100);
  }

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>Alterar Valor</S.TitleModal>
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
            <S.DateContainer>
              <S.DateContent error={errors.dtLimitePagamento?.message}>
                <S.DateDescription>Início</S.DateDescription>
                <S.DateInput
                  type="date"
                  placeholder="Início"
                  defaultValue={defaultDate}
                  //max={defaultDate}
                  {...register("dtLimitePagamento", {
                    required: "Data de início de período é obrigatória.",
                  })}
                />
              </S.DateContent>
            </S.DateContainer>
            <S.ContainerField>
              <S.FieldTitle htmlFor="vaPagamento">
                Valor do Apostilamento
              </S.FieldTitle>
              <S.TextInput
                type="text"
                value={formatNumberText(Number(vaPagamento))}
                onChange={(value) => handleValorChange(value.target.value)}
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
