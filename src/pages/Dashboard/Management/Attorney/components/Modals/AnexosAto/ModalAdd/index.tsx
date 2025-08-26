import { cnpj, cpf } from "cpf-cnpj-validator";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

import {
  ModalAddEditProps,
  SubmitModalAddEdit,
  tipoPessoaOptions,
} from "./modaladd.interface";
import * as S from "./styled";
import { SharedState } from "../../../../../../../../context/SharedContext";
import { postParte, updateParte } from "../../../../../../../../api/services/partes/partes";

export const ModalAddEdit = ({
  setShowModalAddEdit,
  txParte,
  txTipoPessoa,
  txCpfCnpj,
  id,
}: ModalAddEditProps) => {
  const { user } = SharedState();
  const queryClient = useQueryClient();
  const [pessoa, setPessoa] = useState({
    label: "",
    value: "F",
  });

  const [formattedCPF, setFormattedCPF] = useState("");
  const [formattedCNPJ, setFormattedCNPJ] = useState("");
  const [documentoValido, setDocumentoValido] = useState<boolean>(true);

  const handleCPFChange = (event) => {
    const inputCPF = event.target.value.replace(/\D/g, "");
    const formatted = inputCPF.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
      "$1.$2.$3-$4"
    );

    const isValid = cpf.isValid(event.target.value);

    setDocumentoValido(isValid);
    setFormattedCPF(formatted);
  };

  const handleCNPJChange = (event) => {
    const inputCNPJ = event.target.value.replace(/\D/g, "");
    const formatted = inputCNPJ.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
    const isValid = cnpj.isValid(event.target.value);

    setDocumentoValido(isValid);
    setFormattedCNPJ(formatted);
  };

  useEffect(() => {
    if (txTipoPessoa && id) {
      setPessoa(tipoPessoaOptions.find((data) => data.value == txTipoPessoa));
      if (txTipoPessoa == "F") {
        setFormattedCPF(txCpfCnpj);
      } else {
        setFormattedCNPJ(txCpfCnpj);
      }
    } else {
      setPessoa(tipoPessoaOptions[0]);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    control,
  } = useForm<SubmitModalAddEdit>({
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
    setShowModalAddEdit(false);
  };

  const onSubmit: SubmitHandler<SubmitModalAddEdit> = async (data) => {
    let txCpfCnpjConst = "";
    {
      pessoa.value == "F"
        ? (txCpfCnpjConst = formattedCPF)
        : (txCpfCnpjConst = formattedCNPJ);
    }
    //console.log(pessoa.value);

    data?.id
      ? updateParte(
        data.id,
        data.txParte,
        pessoa.value,
        txCpfCnpjConst,
        user["Jvris.User.Id"]
      )
        .then((response) => {
          if (response.status == "OK") {
            queryClient.invalidateQueries(`partes`);
            handleToast("Comarca Alterada com Sucesso");
          }
        })
        .catch((err) => {
          if (
            err.status == "BadRequest" &&
            err.message.includes("O CPF informado é inválido")
          ) {
            handleToast("CPF Inválido", true);
          } else if (
            err.status == "BadRequest" &&
            err.message.includes("O CNPJ informado é inválido")
          ) {
            handleToast("CNPJ Inválido", true);
          } else {
            handleToast("Houve algum erro", true);
          }
        })
      : postParte(
        data.txParte,
        pessoa.value,
        txCpfCnpjConst,
        user["Jvris.User.Id"]
      )
        .then((response) => {
          if (response.status == "Created") {
            queryClient.invalidateQueries(`partes`);
            handleToast("Parte Adicionada com Sucesso");
          } else if (
            response.status == "BadRequest" &&
            response.message.includes("CPF")
          ) {
            handleToast("CPF Inválido", true);
          } else if (
            response.status == "BadRequest" &&
            response.message.includes("O CNPJ informado é inválido")
          ) {
            handleToast("CNPJ Inválido", true);
          } else {
            handleToast("CPF ou CNPJ inválido", true);
          }
        })
        .catch((err) => {
          if (
            err.status == "BadRequest" &&
            err.message.includes("O CPF informado é inválido")
          ) {
          } else if (
            err.status == "BadRequest" &&
            err.message.includes("O CNPJ informado é inválido")
          ) {
            handleToast("CNPJ Inválido", true);
          } else {
            handleToast("CPF ou CNPJ inválido", true);
          }
        });
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>
            {txParte ? "Editar Parte" : "Adicionar Nova Parte"}
          </S.TitleModal>
          <S.CloseModal
            onClick={() => {
              setShowModalAddEdit(false);
            }}
          >
            Fechar
          </S.CloseModal>
        </S.TitleContainer>

        <S.ContainerForm>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.ContainerField>
              <S.SectionTitle>Nome: *</S.SectionTitle>
              <S.TextInput
                defaultValue={txParte}
                maxLength={56}
                minLength={3}
                required={true}
                placeholder="Digite aqui o nome da comarca"
                {...register("txParte", {
                  maxLength: 56,
                  minLength: 3,
                })}
              />
              <S.TextAreaInput hidden defaultValue={id} {...register("id")} />
            </S.ContainerField>

            <S.Row>
              <S.Section>
                <S.SectionTitle>Pessoa: *</S.SectionTitle>
                <S.FieldContainer>
                  <Controller
                    name="txTipoPessoa"
                    control={control}
                    render={({ field }) => (
                      <S.CustomSelect
                        required={true}
                        placeholder="Selecione o tipo de pessoa"
                        {...field}
                        options={tipoPessoaOptions}
                        value={pessoa}
                        onChange={(value: any) => {
                          setPessoa(value);
                        }}
                      />
                    )}
                  />
                </S.FieldContainer>
              </S.Section>
              <S.Section>
                <S.SectionTitle>Documento: *</S.SectionTitle>
                <S.TextInput
                  value={pessoa.value == "F" ? formattedCPF : formattedCNPJ}
                  defaultValue={
                    txTipoPessoa == "F" ? formattedCPF : formattedCNPJ
                  }
                  minLength={pessoa.value == "F" ? 11 : 14}
                  onChange={(value: any) =>
                    pessoa.value == "F"
                      ? handleCPFChange(value)
                      : handleCNPJChange(value)
                  }
                  maxLength={pessoa.value == "F" ? 14 : 18}
                  placeholder="Digite o número do documento"
                  required={true}
                  {...register("txCpfCnpj", {
                    required: true,
                    onChange: (value: any) =>
                      pessoa.value == "F"
                        ? handleCPFChange(value)
                        : handleCNPJChange(value),
                  })}
                />
                {!documentoValido &&
                  (pessoa.value == "F"
                    ? formattedCPF.length > 10
                    : formattedCNPJ.length > 13) && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "1rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      Documento Inválido
                    </span>
                  )}
                <S.TextAreaInput hidden defaultValue={id} {...register("id")} />
              </S.Section>
            </S.Row>

            <S.ContainerSubmitButton>
              <S.SubmitButton
                type="submit"
                disabled={!documentoValido || !isValid}
              >
                Salvar
              </S.SubmitButton>
            </S.ContainerSubmitButton>
          </S.Form>
        </S.ContainerForm>
      </S.Modal>
    </S.Wrapper>
  );
};
