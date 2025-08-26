import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SubmitAttDispatch } from "./interfaces/attorneydispatch.interface";
import * as MockData from "./mockData";
import * as S from "./styled";
import { PageTitle } from "../../../../components/TitlePage";
import { useState } from "react";
import JvrisTable from "../../../../components/JvrisTable";
import { useLocation, useNavigate } from "react-router-dom";

const AttorneyDispatch = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitAttDispatch>({
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<SubmitAttDispatch> = (data) => {
    setDispatch(MockData.processNumberOptions.length);
  };

  const sortedOptions = MockData.processNumberOptions.sort((a, b) =>
    a.label > b.label ? 1 : -1
  );

  const navigate = useNavigate();
  const [dispatch, setDispatch] = useState(0);

  const { state } = useLocation();

  return (
    <>
      <PageTitle pageTitle="Despacho" pageIcon={<S.PageIcon />} />

      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Row>
          <S.Section>
            <S.SectionTitle>Número do Processo:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="processNumber"
                control={control}
                render={({ field }) => (
                  <S.DisabledTextInput
                    type="input"
                    placeholder=""
                    defaultValue="0801388-58.2021.8.20.5102"
                    disabled={true}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.Row>
          <S.Section>
            <S.SectionTitle>Tipo Despacho:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="dispatchType"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    placeholder="Selecione o tipo"
                    {...field}
                    options={sortedOptions}
                    isClearable={false}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.Row>
          <S.Section>
            <S.SectionTitle>Despacho:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="dispatch"
                control={control}
                render={({ field }) => (
                  <S.TextInput
                    placeholder="Escreva aqui..."
                    defaultValue=""
                    rows={5}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.ContainerButtons>
          <S.SubmitButton disabled={!isValid} type="submit">
            Salvar
          </S.SubmitButton>
        </S.ContainerButtons>

        {dispatch == 0 && (
          <S.DataStatus>Nenhum registro encontrado</S.DataStatus>
        )}

        {dispatch > 0 && (
          <S.TableWrapper>
            <JvrisTable
              autoPrimaryColumn={false}
              
              columns={MockData.TableDataTitle()}
              data={MockData.TableDataContent()}
            />
          </S.TableWrapper>
        )}
      </S.Form>
    </>
  );
};

export default AttorneyDispatch;
