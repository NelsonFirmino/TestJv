import * as MockData from "./mockData";
import * as S from "./styled";
import { PageTitle } from "../../../../components/TitlePage";
import JvrisTable from "../../../../components/JvrisTable";
import { formatDataToTable } from "../../../../utils/formatDataToTable";
import theme from "../../../../globalStyle/theme";
import { useState } from "react";
import { ModalAdd } from "./components/ModalAdd";
import { PencilSimple, X } from "phosphor-react";
import { ModalRemove } from "./components/ModalRemove";
import { useMenus } from "../../../../hooks/useMenus";

const Menus = () => {
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const { menus, isLoadingMenus } = useMenus();
  const [id, setId] = useState<number>(null);
  const [txMenu, setTxMenu] = useState("");
  const [txPagina, setTxPagina] = useState("");
  const [idMenu_Pai, setIdMenu_Pai] = useState<number>(null);
  const [nuOrdem, setNuOrdem] = useState<number>(null);

  const resetStates = () => {
    setId(null);
    setTxMenu("");
    setTxPagina("");
    setIdMenu_Pai(null);
    setNuOrdem(null);
  };

  return (
    <>
      {showModalAdd && (
        <ModalAdd
          id={id}
          txMenu={txMenu}
          idMenu_Pai={idMenu_Pai}
          txPagina={txPagina}
          nuOrdem={nuOrdem}
          setShowModalAdd={setShowModalAdd}
        />
      )}

      {showModalRemove && (
        <ModalRemove
          setShowModalRemove={setShowModalRemove}
          id={id}
          txMenu={txMenu}
        />
      )}

      <PageTitle pageTitle="MENUS" pageIcon={<S.PageIcon />} />

      <S.Wrapper>
        <S.Row>
          <S.ContainerButtons>
            <S.SubmitButton
              onClick={() => {
                resetStates();
                setShowModalAdd(true);
              }}
            >
              Adicionar
            </S.SubmitButton>
          </S.ContainerButtons>
        </S.Row>

        {!isLoadingMenus && (
          <S.TableWrapper>
            <JvrisTable
              autoPrimaryColumn={false}
              columnFilter={false}        
              columns={MockData.TableDataTitle()}
              data={formatDataToTable(menus?.data, [
                "txMenu",
                "txPagina",
                "nuOrdem",
              ])}
              GenericButton={[
                {
                  icon: <PencilSimple weight="fill" size={20} />,
                  hoverColor: theme.colors.jvrisAqua,
                  onClick: (index) => {
                    if (index !== undefined) {
                      setId(menus?.data[index].id);
                      setTxMenu(menus?.data[index].txMenu);
                      setTxPagina(menus?.data[index].txPagina);
                      setIdMenu_Pai(menus?.data[index].idMenu_Pai);
                      setNuOrdem(menus?.data[index].nuOrdem);
                      setShowModalAdd(true);
                    }
                  },
                },
                {
                  icon: <X weight="bold" size={20} />,
                  hoverColor: theme.colors.softRed,
                  onClick: (index) => {
                    if (index !== undefined) {
                      setId(menus?.data[index].id);
                      setTxMenu(menus?.data[index].txMenu);
                      setShowModalRemove(true);
                    }
                  },
                },
              ]}
            />
          </S.TableWrapper>
        )}
      </S.Wrapper>
    </>
  );
};

export default Menus;
