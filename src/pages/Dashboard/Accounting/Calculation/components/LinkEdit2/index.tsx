import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { putCalculoPlanilha } from "../../../../../../api/services/RespostaDcje/respostaDcje";
import { BaseModal } from "../../../../../../components/BaseModal";
import { useCalculosContext } from "../../context/CalculosContext";
import * as S from "./styled";

interface Edit {
  dataTable?: any;
  onClick?: () => void;
}
export const EditIndices = (props: Edit) => {
  // TODO: incluir toast
  const { updateData, setUpdateData } = useCalculosContext();
  const [isOpenModal, setOpenModal] = useState(false);
  const [indiceJuros, setIndiceJuros] = useState<string>("");
  const [indiceCorrecao, setIndiceCorrecao] = useState<string>("");

  const clearFields = () => {
    setIndiceJuros("");
    setIndiceCorrecao("");
  };

  const handleIndiceJuros = (event) => {
    const inputValue = event.target.value;

    // Permite apenas números e um único ponto decimal
    const formattedValue = inputValue
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\./g, "$1");

    setIndiceJuros(formattedValue);

    // Atualiza o campo de input diretamente
    event.target.value = formattedValue;
  };

  const handleIndiceCorrecao = (event) => {
    const inputValue = event.target.value;

    // Permite apenas números e um único ponto decimal
    const formattedValue = inputValue
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\./g, "$1");

    setIndiceCorrecao(formattedValue);

    // Atualiza o campo de input diretamente
    event.target.value = formattedValue;
  };

  useEffect(() => {
    if (props?.dataTable) {
      setIndiceCorrecao(props.dataTable.vaIndiceCorrecao);
      setIndiceJuros(props.dataTable.vaIndiceJuros);
    }
  }, [isOpenModal]);

  const testeFunc = useMutation(putCalculoPlanilha, {
    onSettled: ({ status, message }) => {
      if (status === "OK") {
        toast(message, {
          icon: "✔",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        });
        setUpdateData(!updateData);
        setOpenModal(false);
      } else {
        toast.error(message, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
      }
      clearFields();
    },
  });

  return (
    <>
      <BaseModal
        title="Edição de Valores de Índice"
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
        isSelect={true}
        onClose={() => {
          clearFields();
        }}
      >
        {/* <S.FormContainer onSubmit={handleSubmit(onSubmit)}> */}
        <S.ContentSection>
          <S.ContainerField>
            <S.FieldTitle>Índice de Correção:</S.FieldTitle>

            <S.FieldContainer>
              <S.Input
                type="text"
                inputMode="numeric"
                pattern="^-?\d*(\.\d+)?$"
                defaultValue={indiceCorrecao}
                value={indiceCorrecao}
                placeholder="Digite o valor da SELIC"
                onChange={(e) => handleIndiceCorrecao(e)}
              />
            </S.FieldContainer>
          </S.ContainerField>

          <S.ContainerField>
            <S.FieldTitle>Índice de Juros:</S.FieldTitle>

            <S.FieldContainer>
              <S.Input
                type="text"
                inputMode="numeric"
                pattern="^-?\d*(\.\d+)?$"
                defaultValue={indiceJuros}
                value={indiceJuros}
                placeholder="Digite o valor do TR"
                onChange={(e) => handleIndiceJuros(e)}
                // {...register("vaIndiceJuros", {
                //   maxLength: 10,
                // })}
              />
            </S.FieldContainer>
          </S.ContainerField>
        </S.ContentSection>

        <S.ContentSection>
          <S.ContainerField>
            <S.FieldTitle>Valor Atualizado R$:</S.FieldTitle>

            <S.FieldContainer>
              <S.Input
                type="text"
                inputMode="numeric"
                pattern="^-?\d*(\.\d+)?$"
                defaultValue={props.dataTable?.vaAtualizado}
                disabled={true}
                placeholder="Digite o valor do IPCA"
                // {...register("vaAtualizado", {
                //   maxLength: 10,
                // })}
              />
            </S.FieldContainer>
          </S.ContainerField>

          <S.ContainerField>
            <S.FieldTitle>Valor Devido:</S.FieldTitle>

            <S.FieldContainer>
              <S.Input
                type="text"
                inputMode="numeric"
                pattern="^-?\d*(\.\d+)?$"
                defaultValue={props.dataTable?.vaBaseMes}
                disabled={true}
                placeholder="Digite o valor do poupança"
                // {...register("vaBaseMes", {
                //   maxLength: 10,
                // })}
              />
            </S.FieldContainer>
          </S.ContainerField>
        </S.ContentSection>

        <S.ContentSection>
          <S.ContainerField>
            <S.FieldTitle>Índice TR:</S.FieldTitle>

            <S.FieldContainer>
              <S.Input
                type="text"
                inputMode="numeric"
                pattern="^-?\d*(\.\d+)?$"
                defaultValue={props.dataTable?.vaIndiceTr}
                disabled={true}
                placeholder="Digite o valor do IPCA"
                // {...register("vaIndiceTr", {
                //   maxLength: 10,
                // })}
              />
            </S.FieldContainer>
          </S.ContainerField>

          <S.ContainerField>
            <S.FieldTitle>Índice IPCA:</S.FieldTitle>

            <S.FieldContainer>
              <S.Input
                type="text"
                inputMode="numeric"
                pattern="^-?\d*(\.\d+)?$"
                defaultValue={props.dataTable?.vaIndiceIpca}
                disabled={true}
                placeholder="Digite o valor do poupança"
                // {...register("vaIndiceIpca", {
                //   maxLength: 10,
                // })}
              />
            </S.FieldContainer>
          </S.ContainerField>
        </S.ContentSection>

        <S.ContentSection>
          <S.ContainerField>
            <S.FieldTitle>Valor da Correção Monetária:</S.FieldTitle>

            <S.FieldContainer>
              <S.Input
                type="text"
                inputMode="numeric"
                pattern="^-?\d*(\.\d+)?$"
                defaultValue={props.dataTable?.vaCorrecaoMonetaria}
                disabled={true}
                placeholder="Digite o valor do IPCA"
                // {...register("vaCorrecaoMonetaria", {
                //   maxLength: 10,
                // })}
              />
            </S.FieldContainer>
          </S.ContainerField>

          <S.ContainerField>
            <S.FieldTitle>Valor Juros de Mora R$:</S.FieldTitle>

            <S.FieldContainer>
              <S.Input
                type="text"
                inputMode="numeric"
                pattern="^-?\d*(\.\d+)?$"
                defaultValue={props.dataTable?.vaJurosMora}
                disabled={true}
                placeholder="Digite o valor do poupança"
                // {...register("vaJurosMora", {
                //   maxLength: 10,
                // })}
              />
            </S.FieldContainer>
          </S.ContainerField>
        </S.ContentSection>

        <S.OptionsContainer>
          <S.OptionCancel onClick={() => setOpenModal(false)}>
            Cancelar
          </S.OptionCancel>
          <S.OptionSave
            onClick={() =>
              testeFunc.mutate({
                id: props.dataTable?.id,
                idCalculo: props.dataTable?.idCalculo,
                idUsuarioCadastro: props.dataTable?.idUsuarioCadastro,
                vaIndiceCorrecao: +indiceCorrecao,
                vaIndiceJuros: +indiceJuros,
                vaBaseMes: props.dataTable?.vaBaseMes,
                vaBaseTotal: props.dataTable?.vaBaseTotal,
                vaIndiceTr: props.dataTable?.vaIndiceTr,
                vaIndiceIpca: props.dataTable?.vaIndiceIpca,
                vaCorrecaoMonetaria: props.dataTable?.vaCorrecaoMonetaria,
                vaJurosMora: props.dataTable?.vaJurosMora,
                vaAtualizado: props.dataTable?.vaAtualizado,
                isComResultado: props.dataTable?.isComResultado,
                dtBase: props.dataTable?.dtBase,
              })
            }
          >
            Salvar
          </S.OptionSave>
        </S.OptionsContainer>
        {/* </S.FormContainer> */}
      </BaseModal>
      <S.Wrapper onClick={() => setOpenModal(true)}>Editar</S.Wrapper>
    </>
  );
};
