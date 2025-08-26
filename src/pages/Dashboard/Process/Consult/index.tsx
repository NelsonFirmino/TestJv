import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { getProcess } from "../../../../api/services/processGeneral/process";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import { NumeroProcessoComponent } from "./components/NumeroProcessoComponent";
import { SubmitProcCons } from "./interfaces/processconsult.interface";
import * as S from "./styled";

const ProcessConsult = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm<SubmitProcCons>({
    mode: "onChange",
  });

  const { mutate, data: response, isLoading } = useMutation(getProcess);

  const [consultTypeState, setConsultTypeState] = useState(0);

  const handleCheckboxChange = (value: number) => {
    setConsultTypeState(value);
  };

  const onSubmit: SubmitHandler<SubmitProcCons> = (params) => {
    mutate({
      ...params,
      resource: consultTypeState,
    });
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    // Remove caracteres não numéricos
    const numericValue = inputValue.replace(/\D/g, "");
    // Atualiza o valor no campo
    event.target.value = numericValue;
  };

  return (
    <>
      <PageTitle pageTitle="CONSULTA PROCESSUAL" pageIcon={<S.PageIcon />} />

      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Row>
          <S.Section>
            <S.FieldContainer>
              <S.CheckboxInput
                type="checkbox"
                checked={consultTypeState === 0}
                onChange={() => handleCheckboxChange(0)}
              />
              <S.CheckboxTitle>Número do Processo</S.CheckboxTitle>
            </S.FieldContainer>
          </S.Section>
        </S.Row>
        <S.Row>
          <S.Section>
            <S.FieldContainer>
              <S.CheckboxInput
                type="checkbox"
                checked={consultTypeState === 1}
                onChange={() => handleCheckboxChange(1)}
              />
              <S.CheckboxTitle>CPF ou CNPJ</S.CheckboxTitle>
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.Row>
          <S.Section>
            <S.FieldContainer>
              <S.TextInput
                type="text"
                placeholder="Digite aqui o que deseja pesquisar..."
                required={true}
                {...register("consultData")}
                onChange={handleInputChange}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.ContainerButtons>
          <S.SubmitButton disabled={!isValid} type="submit">
            Pesquisar
          </S.SubmitButton>
          {isLoading && <S.LoadingSpinner />}
        </S.ContainerButtons>

        {response?.message && <S.DataStatus>{response?.message}</S.DataStatus>}
      </S.Form>

      {response?.data && (
        <S.TableWrapper>
          <CustomTable
            columns={[
              {
                isSortable: true,
                keyData: "txNumeroFormatado",
                name: "Numero do Processo",
                component: {
                  element: (data) => <NumeroProcessoComponent data={data} />,
                  isButton: false,
                },
              },
              {
                isSortable: true,
                keyData: "txAssunto",
                name: "Assunto",
              },
              {
                isSortable: true,
                keyData: "txTribunal",
                name: "Tribunal",
              },
              {
                isSortable: true,
                keyData: "txRelevancia",
                name: "Relevância",
              },
              {
                isSortable: true,
                keyData: "vaProcesso",
                name: "Valor Processo",
                formatToCurrency: true,
              },
            ]}
            data={response?.data}
            isLoading={false}
            showPagination={false}
            showSearchField={false}
            showSelectNumberOfRows={false}
          />
        </S.TableWrapper>
      )}
    </>
  );
};

export default ProcessConsult;
