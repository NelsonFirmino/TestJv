import { useState } from "react";
import TableLoading from "../../../../../components/JvrisLoading";
import { SharedState } from "../../../../../context/SharedContext";
import { ContainerSwitchCards, SwitchCard } from "../../Attorney/styled";
import { useOperadorContext } from "../context";
import AguardandoCiencia from "./AguardandoCiencia";
import AguardandoDist from "./AguardandoDist";
import AguardandoTriagem from "./AguardandoTriagem";
import DistHoje from "./DistHoje";
import ProcessosPendentesCadastro from "./ProcessosPendentesCadastro";
import SecretariasSel from "./Secretarias";

const OperadorTables = () => {
  const {
    AtosAguardandoCiencia,
    AtosAguardandoDistribuicao,
    AtosDistribuidosHoje,
    AtosAguardandoTriagem,
    processosPendentes,
  } = useOperadorContext();

  const { setSelectedDataTable, setSelectedRowHashes } = SharedState();

  const [showingTable, setShowingTable] = useState(0);

  return (
    <>
      <SecretariasSel />
      <ContainerSwitchCards style={{ margin: "0" }}>
        <SwitchCard
          isSelected={showingTable === 0}
          onClick={() => {
            setShowingTable(0);
          }}
        >
          {processosPendentes.rawData ? processosPendentes.rawData.length : 0}{" "}
          Processos pendentes de cadastro
        </SwitchCard>
        <SwitchCard
          isSelected={showingTable === 1}
          onClick={() => {
            setShowingTable(1);
            // Clear selected row hashes and data table
            // Limpa as linhas selecionadas e os dados selecionados da tabela
            setSelectedRowHashes([]);
            setSelectedDataTable([]);
          }}
        >
          {AtosAguardandoTriagem.rawData
            ? AtosAguardandoTriagem.rawData.length
            : 0}{" "}
          Atos aguardando triagem
        </SwitchCard>
        <SwitchCard
          isSelected={showingTable === 2}
          onClick={() => {
            setShowingTable(2);
            // Clear selected row hashes and data table
            // Limpa as linhas selecionadas e os dados selecionados da tabela
            setSelectedRowHashes([]);
            setSelectedDataTable([]);
          }}
        >
          {AtosAguardandoCiencia.rawData
            ? AtosAguardandoCiencia.rawData.length
            : 0}{" "}
          Atos Aguardando tomada de Ciência
        </SwitchCard>
        <SwitchCard
          isSelected={showingTable === 3}
          onClick={() => {
            setShowingTable(3);
            // Clear selected row hashes and data table
            // Limpa as linhas selecionadas e os dados selecionados da tabela
            setSelectedRowHashes([]);
            setSelectedDataTable([]);
          }}
        >
          {AtosAguardandoDistribuicao.rawData
            ? AtosAguardandoDistribuicao.rawData.length
            : 0}{" "}
          Atos Aguardando Distribuição
        </SwitchCard>
        <SwitchCard
          isSelected={showingTable === 4}
          onClick={() => {
            setShowingTable(4);
            // Clear selected row hashes and data table
            // Limpa as linhas selecionadas e os dados selecionados da tabela
            setSelectedRowHashes([]);
            setSelectedDataTable([]);
          }}
        >
          {AtosDistribuidosHoje.rawData
            ? AtosDistribuidosHoje.rawData.length
            : 0}{" "}
          Atos Distribuidos Hoje
        </SwitchCard>
      </ContainerSwitchCards>

      {showingTable == 0 ? (
        processosPendentes.rawData ? (
          <div style={{ marginTop: "1rem" }}>
            <ProcessosPendentesCadastro />
          </div>
        ) : (
          <TableLoading loading />
        )
      ) : showingTable == 1 ? (
        AtosAguardandoTriagem.rawData ? (
          <AguardandoTriagem />
        ) : (
          <TableLoading loading />
        )
      ) : showingTable == 2 ? (
        AtosAguardandoCiencia.rawData ? (
          <AguardandoCiencia />
        ) : (
          <TableLoading loading />
        )
      ) : showingTable == 3 ? (
        AtosAguardandoDistribuicao.rawData ? (
          <AguardandoDist />
        ) : (
          <TableLoading loading />
        )
      ) : showingTable == 4 && AtosDistribuidosHoje.rawData ? (
        <DistHoje />
      ) : (
        <TableLoading loading />
      )}
    </>
  );
};

export default OperadorTables;
