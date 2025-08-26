import { useEffect, useState } from "react";
import { PageTitle } from "../../../../components/TitlePage";
import { SharedState } from "../../../../context/SharedContext";
import { useDistributionsByAttorney } from "../../../../hooks/useDistributionsByAttorney";
import { useInactionsByAttorney } from "../../../../hooks/useInactionsByAttorney";
import { useRedistributionsByAttorney } from "../../../../hooks/useRedistributionsByAttorney";
import Cards from "./components/Cards";
import CardContainer from "./components/Cards/Container";
import TableInfo from "./components/TableInfo";
import CardContainerLegenda from "./components/TableInfo/Container";
import { Atuacao } from "./components/Tables/Atuacao";
import { Inacao } from "./components/Tables/Inacao";
import { Redistribuicao } from "./components/Tables/Redistribuicao";
import * as S from "./styled";

const Attorney = () => {
  const [currentTable, setCurrentTable] = useState<
    "ATUACAO" | "INACAO" | "REDISTRIBUICAO" | "INFO" | "INGRESSO"
  >("ATUACAO");
  const {
    user,
    selectedUser,
    setPagination,
    selectedDataTable,
    setSelectedDataTable,
    selectedRowHashes,
    setSelectedRowHashes,
    selectedProcessoInActionDataTable,
    setSelectedProcessoInActionDataTable,
    selectedInactionDataTable,
    setSelectedInactionDataTable,
    selectedRedistributionDataTable,
    setSelectedRedistributionDataTable,
  } = SharedState();
  const { distributions, isLoadingDistributions } = useDistributionsByAttorney(
    selectedUser?.id || +user["Jvris.User.Id"]
  );
  const { inactions, isLoadingInactions } = useInactionsByAttorney(
    selectedUser?.id || +user["Jvris.User.Id"]
  );
  const { redistributions, isLoadingRedistributions } =
    useRedistributionsByAttorney(selectedUser?.id || +user["Jvris.User.Id"]);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 450);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 450);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <PageTitle
        pageTitle={
          +user["jvris.User.Perfil"] == 3
            ? `Dashboard do Assessor`
            : `Dashboard do Procurador`
        }
        showCurrentDate={true}
      />

      <CardContainer>
        <Cards data={distributions?.data} isLoading={isLoadingDistributions} />
      </CardContainer>
      <S.ContainerSwitchCards>
        <S.SwitchCard
          isSelected={currentTable === "ATUACAO"}
          onClick={() => {
            setCurrentTable("ATUACAO");
            setSelectedRowHashes([]);
            setSelectedDataTable([]);
            setSelectedProcessoInActionDataTable([]);
            setSelectedInactionDataTable([]);
            setSelectedRedistributionDataTable([]);
          }}
        >
          {isLoadingDistributions ? (
            <S.LoadingSpinner />
          ) : (
            distributions?.data?.length || 0
          )}{" "}
          processos em atuação
        </S.SwitchCard>
        {(user["Jvris.User.isChefe"] == "True" ||
          +user["jvris.User.Perfil"] == 1) && (
          <>
            <S.SwitchCard
              isSelected={currentTable === "INACAO"}
              onClick={() => {
                setCurrentTable("INACAO");
                setSelectedRowHashes([]);
                setSelectedDataTable([]);
                setSelectedProcessoInActionDataTable([]);
                setSelectedInactionDataTable([]);
                setSelectedRedistributionDataTable([]);
              }}
            >
              {isLoadingInactions ? (
                <S.LoadingSpinner />
              ) : (
                inactions?.data?.length || 0
              )}{" "}
              pedidos de inação
            </S.SwitchCard>
            <S.SwitchCard
              isSelected={currentTable === "REDISTRIBUICAO"}
              onClick={() => {
                setCurrentTable("REDISTRIBUICAO");
                setSelectedRowHashes([]);
                setSelectedDataTable([]);
                setSelectedProcessoInActionDataTable([]);
                setSelectedInactionDataTable([]);
                setSelectedRedistributionDataTable([]);
              }}
            >
              {isLoadingRedistributions ? (
                <S.LoadingSpinner />
              ) : (
                redistributions?.data?.length || 0
              )}{" "}
              pedidos de redistribuição
            </S.SwitchCard>
          </>
        )}
      </S.ContainerSwitchCards>

      {isMobile ? (
        <CardContainerLegenda>
          <S.TableInfoContainer>
            <TableInfo />
          </S.TableInfoContainer>
        </CardContainerLegenda>
      ) : (
        <S.TableInfoContainer>
          <TableInfo />
        </S.TableInfoContainer>
      )}

      <Atuacao
        data={distributions?.data}
        isLoading={isLoadingDistributions}
        currentTable={currentTable}
        setCurrenteTable={setCurrentTable}
      />
      <Inacao
        data={inactions?.data}
        isLoading={isLoadingInactions}
        currentTable={currentTable}
        setCurrenteTable={setCurrentTable}
      />
      <Redistribuicao
        data={redistributions?.data}
        isLoading={isLoadingRedistributions}
        currentTable={currentTable}
        setCurrenteTable={setCurrentTable}
      />
    </>
  );
};

export default Attorney;
