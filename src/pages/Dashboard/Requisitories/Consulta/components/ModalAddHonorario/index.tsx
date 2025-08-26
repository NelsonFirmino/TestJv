import * as S from "./styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalAddProps } from "./modaladdhonorario.interface";
import toast from "react-hot-toast";
import { postHonorario } from "../../../../../../api/services/rpvHonorarios/rpvHonorario";
import { useState } from "react";
import { formatNumberText } from "../../../../../../utils/formatNumber.util";

export const ModalAddHonorario = ({
  setShowModalAdd: setShowModalAdd,
  idRequisitorio,
  idUsuarioCadastro,
}: ModalAddProps) => {
  const defaultDate = new Date().toISOString().substring(0, 10);

  const [vaHonorario, setVaHonorario] = useState<number>(0);
  const [documentId, setDocumentId] = useState();

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
    postHonorario({
      idRequisitorio: idRequisitorio,
      vaHonorario: vaHonorario,
      txCpfCnpj: data.txCpfCnpj,
      txNome: data.txNome,
      idUsuarioCadastro: idUsuarioCadastro,
    })
      .then((response) => {
        if (response.status == "Created") {
          handleToast("Honorário Realizado com Sucesso");
        } else {
          handleToast(
            "Erro ao Tentar Realizar Honorário, tente novamente!",
            true
          );
        }
      })
      .catch((e) => {
        handleToast(
          "Erro ao Tentar Realizar Honorário, tente novamente!",
          true
        );
      });
  };

  function handleValorChange(e: any) {
    const valorNumerico = e.replace(/\D/g, "");
    setVaHonorario(parseFloat(valorNumerico) / 100);
  }

  function handleChange(e: string) {
    if (e.length < 15) {
      setDocumentId(cpfMask(e));
    } else {
      setDocumentId(cnpjMask(e));
    }
  }

  const cpfMask = (value) => {
    return value
      .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  };

  const cnpjMask = (value) => {
    return value
      .replace(/\D+/g, "") // não deixa ser digitado nenhuma letra
      .replace(/(\d{2})(\d)/, "$1.$2") // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2") // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1"); // captura os dois últimos 2 números, com um - antes dos dois números
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>Cadastro de Honorário</S.TitleModal>
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
            <S.Row>
              <S.ContainerField>
                <S.FieldTitle htmlFor="txCpfCnpj">CPF / CNPJ *</S.FieldTitle>
                <S.TextInput
                  type="text"
                  placeholder="Digite o CPF / CNPJ"
                  value={documentId}
                  {...register("txCpfCnpj", {
                    required: true,
                    onChange(event) {
                      handleChange(event.target.value);
                    },
                  })}
                />
              </S.ContainerField>
              <S.ContainerField style={{ width: "100%" }}>
                <S.FieldTitle htmlFor="txNome">Nome *</S.FieldTitle>
                <S.TextInput
                  type="text"
                  placeholder="Digite o Nome"
                  {...register("txNome", {
                    required: true,
                  })}
                />
              </S.ContainerField>
            </S.Row>
            <S.ContainerField>
              <S.FieldTitle htmlFor="vaHonorario">Valor (R$) *</S.FieldTitle>
              <S.TextInput
                type="text"
                value={formatNumberText(Number(vaHonorario))}
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
