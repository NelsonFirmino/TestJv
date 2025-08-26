import { useForm } from "react-hook-form";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import { useErgonRubricas } from "../../../../hooks/useErgonRubricas";
import { AlterarTipoCalculoRubrica } from "./components/Alterar";
import Irrf from "./components/Irrf";
import Previdencia from "./components/Previdencia";
import TipoCalculo from "./components/TipoCalculo";
import { SubmitErgonRubricas } from "./interfaces/ergonRubricas.interface";
import * as S from "./styled";

const ErgonRubricas = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitErgonRubricas>({
    mode: "onChange",
  });

  const { ergonRubricas, isLoadingErgonRubricas } = useErgonRubricas();

  return (
    <>
      <PageTitle pageTitle="ERGON - RUBRICAS" pageIcon={<S.PageIcon />} />

      {/* <S.CadastrarWrapper>
        <CadastroRubrica />
      </S.CadastrarWrapper> */}

      <S.TableWrapper>
        <CustomTable
          columns={[
            {
              name: "Código",
              isSortable: true,
              keyData: "nuRubrica",
            },
            {
              name: "Rubrica",
              isSortable: true,
              keyData: "txRubrica",
            },
            {
              name: "Abreviatura",
              isSortable: true,
              keyData: "txAbreviatura",
            },
            {
              name: "Tipo de Rubrica",
              isSortable: true,
              keyData: "txTipoRubrica",
            },
            {
              name: "IRRF",
              isSortable: true,
              keyData: "isIrrf",
              component: {
                element: (data) => <Irrf dataTable={data} />,
                isButton: false,
              },
            },
            {
              name: "Previdência",
              isSortable: true,
              keyData: "isPrevidencia",
              component: {
                element: (data) => <Previdencia dataTable={data} />,
                isButton: false,
              },
            },
            {
              name: "Cálculo",
              isSortable: true,
              keyData: "nuTipoCalculo",
              component: {
                element: (data) => <TipoCalculo dataTable={data} />,
                isButton: false,
              },
            },
            {
              name: "",
              isSortable: false,
              keyData: "alterar",
              component: {
                element: (data) => (
                  <AlterarTipoCalculoRubrica dataTable={data} />
                ),
                isButton: true,
              },
            },
          ]}
          data={ergonRubricas?.data ? ergonRubricas.data : []}
          showSelectNumberOfRows={true}
          isLoading={isLoadingErgonRubricas}
          showPagination={true}
          showSearchField={true}
          selectRows={false}
          tootTipSearcField="Campo de pesquisa filtra apenas dados da página atual da tabela."
          pdfButton={{
            nameFile: "requisitores-cadastrados",
          }}
          csvButton={{
            nameFile: "requisitores-cadastrados",
          }}
        />
      </S.TableWrapper>
    </>
  );
};

export default ErgonRubricas;
