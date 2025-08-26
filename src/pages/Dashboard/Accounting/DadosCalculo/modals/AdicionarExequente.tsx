import { cnpj, cpf } from "cpf-cnpj-validator";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axiosInstance from "../../../../../api/axiosInstance";
import { BaseModal } from "../../../../../components/BaseModal";
import {
  HotToastError,
  HotToastSucess,
} from "../../../../../components/HotToastFuncs";
import { SharedState } from "../../../../../context/SharedContext";
import { ModalAddIndiceProps } from "../../../Process/Indices/components/AddIndice/modal-add.interface";
import { useCalculosContext } from "../../Calculation/context/CalculosContext";
import { useDadosCalculoContext } from "../DadosCalcContext";
import * as S from "../styled";
import { AddExequente } from "./AddExequente.interface";

export const AdicionarExequente = ({
  isOpenModal,
  setOpenModal,
}: ModalAddIndiceProps) => {
  const { respostaFichaDCJE, getData, exequente } = useCalculosContext();
  const {
    register,
    formState: { isValid, errors },
    control,
    handleSubmit,
  } = useForm<AddExequente>({
    mode: "onChange",
  });

  const pessoas = [
    {
      label: "Física",
      value: "F",
    },
    {
      label: "Jurídica",
      value: "J",
    },
    {
      label: "Estado do RN",
      value: "E",
    },
    {
      label: "Associação",
      value: "A",
    },
    {
      label: "Sindicato",
      value: "S",
    },
  ];

  const { user } = SharedState();
  const { openAddExeModal, setOpenAddExeModal, CalcData } =
    useDadosCalculoContext();
  const [nome, setNome] = useState("");
  const [pessoa, setPessoa] = useState({
    label: "Física",
    value: "F",
  });
  const [documento, setDocumento] = useState("");
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

  const handleClose = () => {
    setNome("");
    setPessoa({ label: "Física", value: "F" });
    setDocumento("");
    setFormattedCPF("");
    setFormattedCNPJ("");
  };

  const handleName = (event) => {
    setNome(event.target.value);
  };

  const onSubmit: SubmitHandler<AddExequente> = async (params) => {
    let personAlreadyExist = exequente.some(
      (item) => item.label.toUpperCase() === nome.toUpperCase()
    );
    if (personAlreadyExist) {
      HotToastError("Pessoa já existe nesse Cálculo");
    } else {
      const res = await axiosInstance.get(
        `/api/v1.0/Partes/autocomplete?txCpf=${documento}`
      );
      let parteId = 0;
      if (res.data.status != "NotFound") {
        parteId = res.data.data[0].id;
      }

      if (parteId === 0) {
        const parte = {
          id: parteId,
          txParte: nome.toUpperCase(),
          txCpfCnpj: params.txCpfCnpj,
          txTipoPessoa: pessoa.value,
          idUsuarioCadastro: user["Jvris.User.Id"],
        };
        const res2 = await axiosInstance.post(`/api/v1.0/Partes`, parte);
        parteId = res2?.data.data?.id;
        if (res2.data.status == "Created") {
          const processoParte = {
            idParte: res2?.data?.data?.id,
            idProcesso: respostaFichaDCJE?.data?.idProcesso,
            idUsuarioCadastro: user["Jvris.User.Id"],
            txPolo: "A",
            isPrincipal: false,
          };
          const res3 = await axiosInstance.post(
            `/api/v1.0/processos-partes`,
            processoParte
          );
          if (res3.data.status == "Created") {
            HotToastSucess("Exequente adicionado com sucesso!");
          } else {
            HotToastError("Erro ao adicionar exequente!");
          }
        } else {
          HotToastError("Erro ao adicionar exequente!");
        }
      } else {
        const processoParte = {
          idParte: parteId,
          idProcesso: respostaFichaDCJE?.data.idProcesso,
          idUsuarioCadastro: user["Jvris.User.Id"],
          txPolo: "A",
          isPrincipal: false,
        };
        const res3 = await axiosInstance.post(
          `/api/v1.0/processos-partes`,
          processoParte
        );
        if (res3.data.status == "Created") {
          HotToastSucess("Exequente adicionado com sucesso!");
        } else {
          HotToastError("Erro ao adicionar exequente!");
        }
      }

      handleClose();
      getData();
      setOpenModal(false);
    }
  };

  return (
    <BaseModal
      title="Adicionar Exequente"
      isOpenModal={isOpenModal}
      setOpenModal={setOpenModal}
      isSelect={true}
      onClose={() => {
        handleClose();
      }}
    >
      <S.FormExequente onSubmit={handleSubmit(onSubmit)}>
        <S.ContainerExequente>
          <S.Row>
            <S.Column>
              <S.SectionTitleExequente>Nome: *</S.SectionTitleExequente>
              <S.TextInput
                maxLength={56}
                minLength={3}
                required={true}
                placeholder="Digite o nome do exequente"
                value={nome}
                onChange={handleName}
              />
            </S.Column>
          </S.Row>
          <S.Row style={{ marginTop: "2rem" }}>
            <S.Column>
              <S.SectionTitleExequente>Pessoa: *</S.SectionTitleExequente>
              <S.FieldContainer>
                <Controller
                  name="txTipoPessoa"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelectExequente
                      required={true}
                      placeholder="Selecione o tipo de pessoa"
                      {...field}
                      options={pessoas}
                      value={pessoa}
                      onChange={(value: any) => {
                        setPessoa(value);
                      }}
                    />
                  )}
                />
              </S.FieldContainer>
            </S.Column>
            <S.Column>
              <S.SectionTitleExequente>Documento: *</S.SectionTitleExequente>
              <S.TextInput
                value={pessoa.value == "F" ? formattedCPF : formattedCNPJ}
                defaultValue={
                  pessoa.value == "F" ? formattedCPF : formattedCNPJ
                }
                minLength={pessoa.value == "F" ? 11 : 14}
                maxLength={pessoa.value == "F" ? 14 : 18}
                required={true}
                placeholder="Digite o número do documento"
                onChange={(value: any) =>
                  pessoa.value == "F"
                    ? handleCPFChange(value)
                    : handleCNPJChange(value)
                }
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
            </S.Column>
          </S.Row>
          <S.ContainerExequenteButton>
            <S.SubmitButton
              type="submit"
              disabled={!documentoValido || !isValid}
            >
              Salvar
            </S.SubmitButton>
          </S.ContainerExequenteButton>
        </S.ContainerExequente>
      </S.FormExequente>
    </BaseModal>
  );
};
