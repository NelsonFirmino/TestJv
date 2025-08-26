import { Circle } from "@phosphor-icons/react";
import { useEffect } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { CustomTable } from "../../../../../../components/CustomTable";
import { SharedState } from "../../../../../../context/SharedContext";
import { useOperadorContext } from "../../context";
import MultipleSelectEditarTriagemOptions from "../../Modals/EditarTriagemEmLoteAguardTomCien/components/MultipleSelectEditarTriagemOptions";
import { NumeroProcessoComponent } from "../components/NumeroProcesso/NumeroProcessoComponent";
import { ProcessRelevance } from "../components/Relevancia";
import * as S from "./styled";

const AguardandoCiencia = () => {
  const {
    AtosAguardandoCiencia,
    setOpenEditarTriagem,
    setEditarTriagemData,
    setProcessoData,
    setOpenTomarCienciaModal,
    setTomarCienciaNoJVRIS,
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
      <MultipleSelectEditarTriagemOptions />
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
            keyData: "txOrgaoJulgador",
            name: "Órgão Julgador",
          },
          {
            isSortable: true,
            keyData: "dtCiencia",
            name: "Data de Ciência Programada",
            formatToDate: true,
          },
          {
            isSortable: true,
            keyData: "txEspecializada",
            name: "Especializada",
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
                        setProcessoData(data);
                        setOpenTomarCienciaModal(true);
                        setTomarCienciaNoJVRIS(false);
                      }}
                    >
                      <p
                        style={{
                          fontSize: "1.3rem",
                          margin: "0",
                          padding: "10px",
                        }}
                      >
                        ! Tomar Ciência
                      </p>
                    </S.MainDropDownButton>

                    <S.DropdownToggle split id="dropdown-split-basic" />

                    <Dropdown.Menu>
                      <S.DropDownItem
                        onClick={() => {
                          setOpenEditarTriagem(true);
                          setEditarTriagemData({
                            id: data.id,
                            idAto: data.idAto,
                            txNumeroFormatado: data.txNumeroFormatado,
                            nuCodigoAviso: data.nuCodigoAviso,
                            txClasse: data.txClasse,
                            dtCiencia: data.dtCiencia,
                            idEspecializada: data.idEspecializada,
                          } as any);
                          setProcessoData(data);
                        }}
                      >
                        Editar Triagem
                      </S.DropDownItem>
                      <Dropdown.Divider />

                      <S.DropDownItem
                        onClick={() => {
                          setProcessoData(data);
                          setOpenTomarCienciaModal(true);
                          setTomarCienciaNoJVRIS(true);
                        }}
                      >
                        Tomar Ciencia no JVRIS
                      </S.DropDownItem>
                    </Dropdown.Menu>
                  </Dropdown>
                );
              },
              isButton: false,
            },
          },
        ]}
        data={AtosAguardandoCiencia.rawData}
        isLoading={false}
        showPagination
        showSearchField
        showSelectNumberOfRows
        selectRows
      />
    </>
  );
};

export default AguardandoCiencia;
