import { Circle } from "@phosphor-icons/react";
import { useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { CustomTable } from "../../../../../../components/CustomTable";
import { SharedState } from "../../../../../../context/SharedContext";
import { StatusProcess } from "../../../Attorney/components/TableComponents/StatusProcess";
import { useOperadorContext } from "../../context";
import { MainDropDownButton } from "../AguardandoCiencia/styled";
import { NumeroProcessoComponent } from "../components/NumeroProcesso/NumeroProcessoComponent";
import { ProcessRelevance } from "../components/Relevancia";
import MutipleSelectOptions from "./MultipleSelectOptions";

const DistHoje = () => {
  const {
    AtosDistribuidosHoje,
    setProcessosData,
    setProcessoData,
    setOpenDistHjExluirModal,
  } = useOperadorContext();
  const { selectedDataTable } = SharedState();

  useEffect(() => {
    if (selectedDataTable) {
      setProcessosData(selectedDataTable);
    }
  }, [selectedDataTable]);
  return (
    <>
      <MutipleSelectOptions />
      <CustomTable
        columns={[
          {
            isSortable: true,
            keyData: "txNumeroFormatado",
            name: "Número do Processo",
            component: {
              element: (data) => (
                <NumeroProcessoComponent data={data} hasEspelho={true} />
              ),
              isButton: false,
            },
          },
          {
            isSortable: true,
            keyData: "txClasse",
            name: "Clase",
          },
          {
            isSortable: true,
            keyData: "txSistemaProcessual",
            name: "Sistema Processual",
          },
          {
            isSortable: true,
            keyData: "txOrgaoJulgador",
            name: "Órgão Julgador",
            formatToDate: true,
          },
          {
            isSortable: true,
            keyData: "txEspecializada",
            name: "Especializada",
          },
          {
            isSortable: true,
            keyData: "txProcurador",
            name: "Procurador",
          },
          {
            isSortable: true,
            keyData: "dtPrazo",
            name: "Prazo",
            formatToDate: true,
          },
          {
            name: (
              <Circle size={"1.6rem"} weight="fill" alt="Relevância do Ato" />
            ),
            isSortable: true,
            keyData: "txRelevancia",
            component: {
              element: (data) => (
                <ProcessRelevance txRelevancia={data?.txRelevancia} />
              ),
              isButton: false,
            },
          },
          {
            isSortable: true,
            keyData: "dtCadastro",
            name: "Status",
            component: {
              element: (data) => <StatusProcess data={data} />,
              isButton: false,
            },
          },
          {
            isSortable: false,
            keyData: "fake132",
            name: "",
            component: {
              element: (data) => {
                return (
                  <Dropdown
                    style={{
                      height: "4rem",
                    }}
                    autoClose="outside"
                    as={ButtonGroup}
                  >
                    <MainDropDownButton
                      //href={`/dashboard/procurador/cadastro-peca/${data.id}`}
                      style={{ whiteSpace: "nowrap" }}
                      onClick={() => {
                        setProcessoData(data);
                        setOpenDistHjExluirModal(true);
                      }}
                    >
                      <p
                        style={{
                          fontSize: "1.3rem",
                          margin: "0",
                          padding: "10px",
                        }}
                      >
                        Excluir
                      </p>
                    </MainDropDownButton>
                  </Dropdown>
                );
              },
              isButton: false,
            },
          },
        ]}
        data={AtosDistribuidosHoje.rawData}
        isLoading={false}
        showPagination
        showSearchField
        showSelectNumberOfRows
        selectRows
      />
    </>
  );
};

export default DistHoje;
