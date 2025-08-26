import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { CustomTable } from "../../../../../../components/CustomTable";
import { useOperadorContext } from "../../context";
import { NumeroProcessoComponent } from "../components/NumeroProcesso/NumeroProcessoComponent";
import { StatusProcessDashboardOperador } from "../components/StatusProcess";
import * as S from "./styled";

const ProcessosPendentesCadastro = () => {
  const {
    processosPendentes,
    setExcluirAtoData,
    setProcessoData,
    setOpenExcluirAto,
  } = useOperadorContext();
  const navigate = useNavigate();

  const handleMainButtonClick = (data: any) => {
    navigate(`/dashboard/cadastro-processos/${data.id}`);
  };
  return (
    <CustomTable
      columns={[
        {
          name: "Número do Processo",
          isSortable: false,
          keyData: "txNumeroFormatado",
          component: {
            element: (data) => (
              <NumeroProcessoComponent data={data} hasEspelho={false} />
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
          keyData: "txOrgaoJulgador",
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
          keyData: "dtCiencia",
          name: "Status",
          component: {
            element: (data) => (
              <StatusProcessDashboardOperador data={data} type="dtCiencia" />
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
                    borderRadius: "0.5rem",
                  }}
                  autoClose="outside"
                  as={ButtonGroup}
                >
                  <S.MainDropDownButton
                    //href={`/dashboard/procurador/cadastro-peca/${data.id}`}
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => handleMainButtonClick(data)}
                  >
                    <p
                      style={{
                        fontSize: "1.3rem",
                        margin: "0",
                        padding: "10px",
                      }}
                    >
                      Cadastrar
                    </p>
                  </S.MainDropDownButton>

                  <S.DropdownToggle split id="dropdown-split-basic" />

                  <Dropdown.Menu>
                    <S.DropDownItem
                      onClick={() =>
                        navigate(`/dashboard/processo/registro-ato/${data.id}`)
                      }
                    >
                      Editar Ato
                    </S.DropDownItem>
                    <Dropdown.Divider />

                    <S.DropDownItem
                      onClick={() => {
                        setOpenExcluirAto(true);
                        setExcluirAtoData({
                          idAtoasnasna: data.id,
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
      data={processosPendentes.rawData}
      isLoading={false}
      showPagination
      showSearchField
      showSelectNumberOfRows
    />
  );
};
/* 
<BaseModalV2
          title="Despacho"
          keyStateOpenModal={keyStateOpenModal}
          setKeyStateOpenModal={setKeyStateOpenModal}
          keyString={keyString}
        >
          <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.Section>
              <S.SectionTitle>Número do Processo</S.SectionTitle>
              <S.Text>{txNumeroProcesso}</S.Text>
        </S.Section>
      </S.Form>
    </BaseModalV2>,
*/

export default ProcessosPendentesCadastro;
