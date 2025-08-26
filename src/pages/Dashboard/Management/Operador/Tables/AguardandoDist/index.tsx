import { ArrowsClockwise, Circle } from "phosphor-react";
import { useEffect } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { CustomTable } from "../../../../../../components/CustomTable";
import { SharedState } from "../../../../../../context/SharedContext";
import { StatusProcess } from "../../../Attorney/components/TableComponents/StatusProcess";
import { useOperadorContext } from "../../context";
import { NumeroProcessoComponent } from "../components/NumeroProcesso/NumeroProcessoComponent";
import { Redistribuicao } from "../components/Redistribuicao";
import { ProcessRelevance } from "../components/Relevancia";
import MutipleSelectOptions from "./MultipleSelectOptions";
import * as S from "./styled";
import usePPC from "./usePPC";

const AguardandoDist = () => {
  const { AtosAguardandoDistribuicao, setProcessosData } = useOperadorContext();

  const { selectedDataTable } = SharedState();
  const { distribuir, editarato, editartriagem, excluirtriagem } = usePPC();

  useEffect(() => {
    if (selectedDataTable) {
      setProcessosData(selectedDataTable);
    }
  }, [selectedDataTable]);

  console.log(selectedDataTable);

  const navigate = useNavigate();
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
            name: (
              <ArrowsClockwise
                size={"1.8rem"}
                // weight="fill"
                alt="Redistribuição"
              />
            ),
            isSortable: true,
            keyData: "txStatusRedistribuicaoAto",
            component: {
              element: (data) => (
                <Redistribuicao
                  txStatusRedistribuicaoAto={data.txStatusRedistribuicaoAto}
                />
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
            keyData: "dtCiencia",
            name: "Ciente",
            formatToDate: true,
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
                    <S.MainDropDownButton
                      //href={`/dashboard/procurador/cadastro-peca/${data.id}`}
                      style={{ whiteSpace: "nowrap" }}
                      onClick={() => {
                        distribuir(data);
                      }}
                    >
                      <p
                        style={{
                          fontSize: "1.3rem",
                          margin: "0",
                          padding: "10px",
                        }}
                      >
                        Distribuição
                      </p>
                    </S.MainDropDownButton>

                    <S.DropdownToggle split id="dropdown-split-basic" />

                    <Dropdown.Menu>
                      <S.DropDownItem
                        onClick={() => {
                          editarato(data.id);
                        }}
                      >
                        Editar Ato
                      </S.DropDownItem>
                      <Dropdown.Divider />

                      <S.DropDownItem
                        onClick={() => {
                          editartriagem(data.id, data.idEspecializada, data);
                        }}
                      >
                        Editar Triagem
                      </S.DropDownItem>
                      <S.DropDownItem
                        onClick={() => {
                          excluirtriagem(data);
                        }}
                      >
                        Excluir Triagem
                      </S.DropDownItem>
                    </Dropdown.Menu>
                  </Dropdown>
                );
              },
              isButton: false,
            },
          },
        ]}
        data={AtosAguardandoDistribuicao.rawData}
        isLoading={false}
        showPagination
        showSearchField
        showSelectNumberOfRows
        selectRows
      />
    </>
  );
};

export default AguardandoDist;
