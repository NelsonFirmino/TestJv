import { BookmarkSimple, Circle } from "phosphor-react";
import { CustomTable } from "../../../../../../../components/CustomTable";
import { SharedState } from "../../../../../../../context/SharedContext";
import { DropDownAtuacao } from "../../TableComponents/DropDownAtuacao";
import { Expediente } from "../../TableComponents/Expediente";
import { PecaSymbol } from "../../TableComponents/PecaSymbol";
import { ProcessNumber } from "../../TableComponents/ProcessNumber";
import { RelevanciaAto } from "../../TableComponents/RelevanciaAto";
import { StatusProcess } from "../../TableComponents/StatusProcess";
import { AtuacaoProps } from "./atuacao.interface";
import { AlterarPrazoEmLote } from "./components/AlterarPrazoEmLote";
import { AlterarRelevanciaEmLote } from "./components/AlterarRelevanciaEmLote";
import { AtribuirAssessorEmLote } from "./components/AtribuirAssessorEmLote";
import { DespachoEmLote } from "./components/DespachoEmLote";
import { ImprimirProcessosEmLote } from "./components/ImprimirProcessoEmLote";
import { RedistribuicaoEmLote } from "./components/RedistribuicaoEmLote";
import { RegistrarObservacaoEmLote } from "./components/RegistrarObservacaoEmLote";
import * as S from "./styled";

export const Atuacao = ({ currentTable, data, isLoading }: AtuacaoProps) => {
  const { user, selectedUser, selectedProcessoInActionDataTable } =
    SharedState();

  return (
    <S.Wrapper isOpen={currentTable === "ATUACAO"}>
      <S.OptionsForSelectedProcessContainer
        isOpen={Boolean(selectedProcessoInActionDataTable.length)}
      >
        <AtribuirAssessorEmLote />

        <DespachoEmLote />
        <RedistribuicaoEmLote />
        <AlterarPrazoEmLote />
        <AlterarRelevanciaEmLote />
        <RegistrarObservacaoEmLote />
        <ImprimirProcessosEmLote />
      </S.OptionsForSelectedProcessContainer>

      <CustomTable
        isLoading={isLoading}
        data={data ? data : []}
        showPagination={true}
        showSearchField={true}
        showSelectNumberOfRows={true}
        showTodayButton={true}
        showClearButton={true}
        selectRows={true}
        keySelectData="ATUACAO"
        csvButton={{
          nameFile: `processos-atuacao-${
            selectedUser?.name || user["Jvris.User.Name"]
          }`,
        }}
        pdfButton={{
          nameFile: `processos-atuacao-${
            selectedUser?.name || user["Jvris.User.Name"]
          }`,
        }}
        columns={[
          {
            name: "Número do Processo",
            keyData: "txNumero",
            isSortable: true,
            // breakTextOnFirstColumn: true,
            component: {
              element: (data) => <ProcessNumber data={data} />,
              isButton: false,
            },
          },
          {
            name: (
              <BookmarkSimple
                size={"1.6rem"}
                weight="fill"
                alt="Peça cadastrada"
              />
            ),
            isSortable: true,
            keyData: "idPeca",
            component: {
              element: (data) => <PecaSymbol data={data} />,
              isButton: false,
            },
          },
          {
            name: "Assunto(s)",
            keyData: "txAssunto",
            isSortable: true,
          },
          {
            name: "Especializada",
            keyData: "txEspecializada",
            isSortable: true,
          },
          {
            name: "Valor",
            keyData: "vaProcesso",
            isSortable: true,
            formatToCurrency: true,
          },
          {
            name: (
              <Circle size={"1.6rem"} weight="fill" alt="Relevância do Ato" />
            ),
            isSortable: true,
            keyData: "isUrgente",
            component: {
              element: (data) => <RelevanciaAto data={data} />,
              isButton: false,
            },
          },
          {
            name: "Assessores",
            keyData: "txAssessor",
            isSortable: true,
          },
          {
            name: "Distribuído",
            keyData: "dtDistribuicao",
            isSortable: true,
            formatToDate: true,
            includeDateTimeKey: "hrDistribuicao",
          },
          {
            name: "Prazo",
            keyData: "dtPrazo",
            isSortable: true,
            formatToDate: true,
          },
          {
            name: "Status",
            keyData: "dtPrazo",
            isSortable: true,
            component: {
              element: (data) => <StatusProcess data={data} />,
              isButton: false,
            },
          },
          {
            name: "Exp.",
            keyData: "fake132",
            isSortable: true,
            component: {
              element: (data) => <Expediente dataTable={data} />,
              isButton: true,
            },
          },
          {
            name: "",
            keyData: "fake1234",
            isSortable: false,
            component: {
              element: (data) => <DropDownAtuacao data={data} key={data.id} />,
              isButton: true,
            },
          },
        ]}
        defaultSortKeyColumn={{
          direction: "ascending",
          key: "dtPrazo",
        }}
        possibleDataKeyToBeNull={[
          {
            key: "txAssessor",
            fallback: "--",
          },
          {
            key: "dtPrazo",
            fallback: "--",
          },
        ]}
        selectDataColumnButton={{
          columns: [
            {
              name: "Número do Processo",
              key: "txNumero",
            },
            {
              name: "Assunto",
              key: "txAssunto",
            },
            {
              name: "Especializada",
              key: "txEspecializada",
            },
            {
              name: "Distribuído",
              key: "dtDistribuicao",
              formatDate: true,
              orderByDate: true,
            },
            {
              name: "Prazo",
              key: "dtPrazo",
              formatDate: true,
              orderByDate: true,
            },
            {
              name: "Valor",
              key: "vaProcesso",
              rangePredefinedValues: true,
            },
            {
              name: "Assessores",
              key: "txAssessor",
            },
          ],
        }}
      />
    </S.Wrapper>
  );
};
