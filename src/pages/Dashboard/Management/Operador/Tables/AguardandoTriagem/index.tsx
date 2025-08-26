import { useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { useNavigate } from "react-router-dom";
import { CustomTable } from "../../../../../../components/CustomTable";
import { SharedState } from "../../../../../../context/SharedContext";
import { StatusProcess } from "../../../Attorney/components/TableComponents/StatusProcess";
import { useOperadorContext } from "../../context";
import MutipleSelectTriagemOptions from "../../Modals/TriagemDistAtoManualEmLote/components/MultipleSelectTriagemOptions";
import { NumeroProcessoComponent } from "../components/NumeroProcesso/NumeroProcessoComponent";
import * as S from "./styled";

const AguardandoTriagem = () => {
  const navigate = useNavigate();
  const {
    AtosAguardandoTriagem,
    secretaria,
    setExcluirAtoData,
    setOpenExcluirAto,
    setOpenTriagem,
    setTriagemData,
    setProcessoData,
    setProcessosData,
  } = useOperadorContext();

  const { selectedDataTable } = SharedState();

  useEffect(() => {
    if (selectedDataTable) {
      setProcessosData(selectedDataTable);
    }
  }, [selectedDataTable]);

  return (
    <>
      <MutipleSelectTriagemOptions />
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
            name: "Sistema",
          },
          {
            isSortable: true,
            keyData: "txStatusRedistribuicaoAto",
            name: "Órgão Julgador",
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
            isSortable: true,
            keyData: "txRelevancia",
            name: "Relevancia",
          },
          {
            isSortable: true,
            keyData: "dtCiencia",
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
                      borderRadius: "0.5rem",
                    }}
                    autoClose="outside"
                    as={ButtonGroup}
                  >
                    <S.MainDropDownButton
                      //href={`/dashboard/procurador/cadastro-peca/${data.id}`}
                      style={{ whiteSpace: "nowrap" }}
                      onClick={() => {
                        setOpenTriagem(true);
                        setTriagemData({
                          idAto: data.id,
                          idEspecializada: data.idEspecializada,
                          idSecretaria: secretaria,
                        } as any);
                        setProcessoData(data);
                      }}
                    >
                      <p
                        style={{
                          fontSize: "1.3rem",
                          margin: "0",
                          padding: "10px",
                        }}
                      >
                        Triagem
                      </p>
                    </S.MainDropDownButton>

                    <S.DropdownToggle split id="dropdown-split-basic" />

                    <Dropdown.Menu>
                      <S.DropDownItem
                        onClick={() =>
                          navigate(
                            `/dashboard/processo/registro-ato/${data.id}`
                          )
                        }
                      >
                        Editar Ato
                      </S.DropDownItem>
                      <Dropdown.Divider />

                      <S.DropDownItem
                        onClick={() => {
                          setOpenExcluirAto(true);
                          setExcluirAtoData({
                            idAto: data.id,
                            txNumeroFormatado: data.txNumeroFormatado,
                            txSistemaProcessual: data.txSistemaProcessual,
                            txSecretaria: data.txSecretaria,
                            txClasse: data.txClasse,
                            dtCiencia: data.dtCiencia,
                            idEspecializada: data.idEspecializada,
                            idSecretaria: secretaria,
                          } as any);
                          setProcessoData(data);
                        }}
                      >
                        Excluir Ato
                      </S.DropDownItem>

                      {/* <Dropdown.Divider />
<S.DropDownItem>Alterar nível de sigilo</S.DropDownItem>
<S.DropDownItem>
  <S.ContainerLink
  to={`/dashboard/processo/adicionar-usuario-ao-processo-sigiloso/${data.id}`}
  >
    Permissão de sigilo
    </S.ContainerLink>
</S.DropDownItem> */}
                    </Dropdown.Menu>
                  </Dropdown>
                );
              },
              isButton: false,
            },
          },
        ]}
        data={AtosAguardandoTriagem.rawData}
        isLoading={false}
        showPagination
        showSearchField
        showSelectNumberOfRows
        selectRows
      />
    </>
  );
};

export default AguardandoTriagem;
