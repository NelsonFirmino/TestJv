import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SubmitRPV } from "../../interfaces/rpv.interface";
import * as S from "../../styled";

interface BuscarReqProps {
  setAssunto: React.Dispatch<React.SetStateAction<string>>;
  setTxNumeroFormatado: React.Dispatch<React.SetStateAction<string>>;
  setDtDistribuicao: React.Dispatch<React.SetStateAction<string>>;
}

const BuscarReq = (props: BuscarReqProps) => {
  const { setAssunto, setDtDistribuicao, setTxNumeroFormatado } = props;
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitRPV>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SubmitRPV> = (data) => {
    setAssunto(data.txAssunto);
    setTxNumeroFormatado(data.txNumeroFormatado);
    setDtDistribuicao(data.dtDistribuicao);
  };

  const ToggleElement = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <S.SearchTitle onClick={() => ToggleElement()}>
        Buscar Requisitório Pendente de Cadastro
      </S.SearchTitle>

      {isVisible ? (
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.Section>
            <S.SectionTitle>Distribuição:</S.SectionTitle>
            <S.FieldDateContainer>
              <S.DateContainer>
                <S.DateContent error={errors.dtDistribuicao?.message}>
                  <S.DateDescription>Data</S.DateDescription>
                  <S.DateInput
                    type="date"
                    placeholder="Início"
                    max={new Date().toISOString().substring(0, 10)}
                    {...register("dtDistribuicao")}
                  />
                </S.DateContent>
              </S.DateContainer>
            </S.FieldDateContainer>
          </S.Section>

          <S.Row>
            <S.Section>
              <S.SectionTitle>N° do Processo:</S.SectionTitle>
              <S.FieldContainer>
                <S.TextInput
                  type="text"
                  placeholder="Ex: 0000000-00.0000.0.00.0000"
                  defaultValue=""
                  {...register("txNumeroFormatado")}
                />
              </S.FieldContainer>
            </S.Section>

            <S.Section>
              <S.SectionTitle>Assunto:</S.SectionTitle>
              <S.FieldContainer>
                <S.TextInput
                  type="text"
                  placeholder="Ex: Abono de Permanência"
                  defaultValue=""
                  {...register("txAssunto")}
                />
              </S.FieldContainer>
            </S.Section>
          </S.Row>

          <S.ContainerButtons>
            <S.SubmitButton disabled={!isValid} type="submit">
              Buscar
            </S.SubmitButton>
            <S.ClearButton type="reset" onClick={() => reset()}>
              Limpar
            </S.ClearButton>
          </S.ContainerButtons>
        </S.Form>
      ) : (
        ""
      )}
    </>
  );
};

export default BuscarReq;
