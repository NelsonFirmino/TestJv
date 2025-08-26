import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { updateParte } from "../../../../../../api/services/partes/partes";
import { BaseModal } from "../../../../../../components/BaseModal";
import { SharedState } from "../../../../../../context/SharedContext";
import { ModalAddProps, tipoPessoaOptions } from "./modaladd.interface";
import * as S from "./styled";

export const ModalEdit = ({
  setShowModalAdd,
  showModal,
  txParte,
  txSigla,
  txNumeroProcesso,
  nuInstancia,
  txTipoPessoa,
  idParte,
}: ModalAddProps) => {
  const { user } = SharedState();
  const queryClient = useQueryClient();
  const [pessoa, setPessoa] = useState({
    label: "",
    value: "F",
  });

  const [formattedCPF, setFormattedCPF] = useState("");
  const [formattedCNPJ, setFormattedCNPJ] = useState("");

  const handleCPFChange = (event) => {
    const inputCPF = event.target.value.replace(/\D/g, "");
    const formatted = inputCPF.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
      "$1.$2.$3-$4"
    );

    setFormattedCPF(formatted);
  };

  const handleCNPJChange = (event) => {
    const inputCNPJ = event.target.value.replace(/\D/g, "");
    const formatted = inputCNPJ.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
    setFormattedCNPJ(formatted);
  };

  const {
    register,
    handleSubmit,
    control,
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
    let txCpfCnpjConst = "";
    {
      pessoa.value == "F"
        ? (txCpfCnpjConst = formattedCPF)
        : (txCpfCnpjConst = formattedCNPJ);
    }

    updateParte(
      idParte,
      txParte,
      data.txTipoPessoa,
      data.txCpfCnpj,
      user["Jvris.User.Id"]
    )
      .then((response) => {
        if (response.status == "OK") {
          queryClient.invalidateQueries(`listaPartesProcessos`);
          handleToast("Parte do Processo Alterada com Sucesso");
        }
      })
      .catch((error) => {
        handleToast(
          "Erro ao Tentar Alterar Parte do Processo, tente novamente!",
          true
        );
      });
  };

  return (
    <BaseModal
      title="Editar Processo Parte"
      setOpenModal={setShowModalAdd}
      isOpenModal={showModal}
    >
      <S.ContainerForm>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.ContainerField>
            <S.FieldTitle htmlFor="txNumeroProcesso">
              Número do Processo
            </S.FieldTitle>
            <S.TextInput
              defaultValue={txNumeroProcesso}
              disabled={true}
              autoFocus
            />
          </S.ContainerField>
          <S.ContainerFieldRow>
            <S.ContainerField>
              <S.FieldTitle htmlFor="txSigla">Tribunal</S.FieldTitle>
              <S.TextInput defaultValue={txSigla} disabled={true} autoFocus />
            </S.ContainerField>
            <S.ContainerField>
              <S.FieldTitle htmlFor="nuInstancia">Instância</S.FieldTitle>
              <S.TextInput
                defaultValue={nuInstancia}
                disabled={true}
                autoFocus
              />
            </S.ContainerField>
          </S.ContainerFieldRow>
          <S.ContainerField>
            <S.FieldTitle htmlFor="txParte">Nome da Parte</S.FieldTitle>
            <S.TextInput
              defaultValue={txParte}
              disabled={true}
              autoFocus
              {...register("txParte", {
                maxLength: 56,
                minLength: 3,
              })}
            />
          </S.ContainerField>
          <S.ContainerField>
            <S.FieldTitle htmlFor="txTipoPessoa">Tipo de Pessoa</S.FieldTitle>
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
          </S.ContainerField>
          <S.ContainerField>
            <S.FieldTitle htmlFor="txCpfCnpj">Número do Documento</S.FieldTitle>
            <S.TextInput
              value={pessoa.value == "F" ? formattedCPF : formattedCNPJ}
              defaultValue={txTipoPessoa == "F" ? formattedCPF : formattedCNPJ}
              minLength={14}
              onChange={(value: any) =>
                pessoa.value == "F"
                  ? handleCPFChange(value)
                  : handleCNPJChange(value)
              }
              maxLength={pessoa.value == "F" ? 14 : 18}
              placeholder="Digite o número do documento"
              required={true}
              {...register("txCpfCnpj", {
                onChange: (value: any) =>
                  pessoa.value == "F"
                    ? handleCPFChange(value)
                    : handleCNPJChange(value),
              })}
            />
          </S.ContainerField>

          <S.ContainerSubmitButton>
            <S.SubmitButton disabled={!isValid}>Salvar</S.SubmitButton>
          </S.ContainerSubmitButton>
        </S.Form>
      </S.ContainerForm>
    </BaseModal>
  );
};
