import { useState } from "react";
import * as S from "./styled";
import { BaseModal } from "../../../../../../components/BaseModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { putIndice } from "../../../../../../api/services/indices/indices";
import { useIndice } from "../../../../../../hooks/useIndice";
import { SubmitEditIndice } from "./edit-indice.interface";

export const EditIndice = ({ dataTable }: any) => {
  // TODO: incluir toast
  const { indice, isLoadingIndice } = useIndice(dataTable.id);
  const [isOpenModal, setOpenModal] = useState(false);

  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<SubmitEditIndice>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SubmitEditIndice> = async (params) => {
    try {
      await putIndice({
        idIndice: dataTable.id,
        dtIndice: params.dtIndice,
        vaIpca: params.vaIpca.replace(",", "0"),
        vaPoupanca: params.vaPoupanca.replace(",", "0"),
        vaSelic: params.vaSelic.replace(",", "0"),
        vaTr: params.vaTr.replace(",", "0"),
        idUsuarioCadastro: dataTable.idUsuarioCadastro,
      });
      setOpenModal(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <BaseModal
        title="Edição de Valores de Índice"
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
      >
        <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Data Índice</S.FieldTitle>

              {!isLoadingIndice ? (
                <S.DateContent error={errors.dtIndice?.message}>
                  <S.DateInput
                    type="date"
                    required={true}
                    defaultValue={indice?.data.dtIndice}
                    {...register("dtIndice", {
                      required: "Data de defeso é obrigatória.",
                    })}
                  />
                </S.DateContent>
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
          </S.ContentSection>
          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>SELIC: *</S.FieldTitle>

              {!isLoadingIndice ? (
                <S.FieldContainer>
                  <S.Input
                    type="text"
                    inputMode="numeric"
                    pattern="^-?\d*(\.\d+)?$"
                    defaultValue={indice?.data.vaSelic}
                    placeholder="Digite o valor da SELIC"
                    {...register("vaSelic", {
                      maxLength: 10,
                      required: true,
                    })}
                  />
                </S.FieldContainer>
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>TR: *</S.FieldTitle>

              {!isLoadingIndice ? (
                <S.FieldContainer>
                  <S.Input
                    type="text"
                    inputMode="numeric"
                    pattern="^-?\d*(\.\d+)?$"
                    defaultValue={indice?.data.vaTr}
                    placeholder="Digite o valor do TR"
                    {...register("vaTr", {
                      maxLength: 10,
                      required: true,
                    })}
                  />
                </S.FieldContainer>
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
          </S.ContentSection>
          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>IPCA: *</S.FieldTitle>

              {!isLoadingIndice ? (
                <S.FieldContainer>
                  <S.Input
                    type="text"
                    inputMode="numeric"
                    pattern="^-?\d*(\.\d+)?$"
                    defaultValue={indice?.data.vaIpca}
                    placeholder="Digite o valor do IPCA"
                    {...register("vaIpca", {
                      maxLength: 10,
                      required: true,
                    })}
                  />
                </S.FieldContainer>
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>Poupança: *</S.FieldTitle>

              {!isLoadingIndice ? (
                <S.FieldContainer>
                  <S.Input
                    type="text"
                    inputMode="numeric"
                    pattern="^-?\d*(\.\d+)?$"
                    defaultValue={indice?.data.vaPoupanca}
                    placeholder="Digite o valor do poupança"
                    {...register("vaPoupanca", {
                      maxLength: 10,
                      required: true,
                    })}
                  />
                </S.FieldContainer>
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
          </S.ContentSection>
          <S.OptionsContainer>
            <S.OptionCancel onClick={() => setOpenModal(false)}>
              Cancelar
            </S.OptionCancel>
            <S.OptionSave disabled={!isValid} onClick={() => {}}>
              Salvar
            </S.OptionSave>
          </S.OptionsContainer>
        </S.FormContainer>
      </BaseModal>
      <S.Wrapper onClick={() => setOpenModal(true)}>Editar</S.Wrapper>
    </>
  );
};
