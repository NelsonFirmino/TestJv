import { SubmitHandler, useForm } from "react-hook-form";
import { postIndice } from "../../../../../../api/services/indices/indices";
import { SubmitAddIndice, ModalAddIndiceProps } from "./modal-add.interface";
import * as S from "./styled";
import { SharedState } from "../../../../../../context/SharedContext";
import { BaseModal } from "../../../../../../components/BaseModal";

export const ModalAddIndice = ({
  isOpenModal,
  setOpenModal,
}: ModalAddIndiceProps) => {
  const { user } = SharedState();
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<SubmitAddIndice>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SubmitAddIndice> = async (params) => {
    try {
      await postIndice({
        dtIndice: params.dtIndice,
        vaIpca: params.vaIpca.replace(",", "0"),
        vaPoupanca: params.vaPoupanca.replace(",", "0"),
        vaSelic: params.vaSelic.replace(",", "0"),
        vaTr: params.vaTr.replace(",", "0"),
        idUsuarioCadastro: user["Jvris.User.Id"],
      });
      setOpenModal(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  // TODO: adicionar formataçao de valores com vírgula
  return (
    <BaseModal
      title="Cadastro de valores de índices"
      isOpenModal={isOpenModal}
      setOpenModal={setOpenModal}
    >
      <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <S.ContentSection>
          <S.ContainerField>
            <S.FieldTitle>Data Índice</S.FieldTitle>

            <S.DateContent error={errors.dtIndice?.message}>
              <S.DateInput
                type="date"
                required={true}
                {...register("dtIndice", {
                  required: "Data de defeso é obrigatória.",
                })}
              />
            </S.DateContent>
          </S.ContainerField>
        </S.ContentSection>
        <S.ContentSection>
          <S.ContainerField>
            <S.FieldTitle>SELIC: *</S.FieldTitle>

            <S.FieldContainer>
              <S.Input
                type="text"
                inputMode="numeric"
                pattern="^-?\d*(\.\d+)?$"
                placeholder="Digite o valor da SELIC"
                {...register("vaSelic", {
                  maxLength: 10,
                  required: true,
                })}
              />
            </S.FieldContainer>
          </S.ContainerField>

          <S.ContainerField>
            <S.FieldTitle>TR: *</S.FieldTitle>

            <S.FieldContainer>
              <S.Input
                type="text"
                inputMode="numeric"
                pattern="^-?\d*(\.\d+)?$"
                placeholder="Digite o valor do TR"
                {...register("vaTr", {
                  maxLength: 10,
                  required: true,
                })}
              />
            </S.FieldContainer>
          </S.ContainerField>
        </S.ContentSection>
        <S.ContentSection>
          <S.ContainerField>
            <S.FieldTitle>IPCA: *</S.FieldTitle>

            <S.FieldContainer>
              <S.Input
                type="text"
                inputMode="numeric"
                pattern="^-?\d*(\.\d+)?$"
                placeholder="Digite o valor do IPCA"
                {...register("vaIpca", {
                  maxLength: 10,
                  required: true,
                })}
              />
            </S.FieldContainer>
          </S.ContainerField>

          <S.ContainerField>
            <S.FieldTitle>Poupança: *</S.FieldTitle>

            <S.FieldContainer>
              <S.Input
                type="text"
                inputMode="numeric"
                pattern="^-?\d*(\.\d+)?$"
                placeholder="Digite o valor do poupança"
                {...register("vaPoupanca", {
                  maxLength: 10,
                  required: true,
                })}
              />
            </S.FieldContainer>
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
  );
};
