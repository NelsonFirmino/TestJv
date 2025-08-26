import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useModelosPecaService from "../../../../api/services/modelos-peca";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import * as S from "./styled";

const ConsultModels = () => {
    const {  getModelos,loadingModelos,modelos} = useModelosPecaService();
    const navigate = useNavigate();

    useEffect(() => {
        getModelos();
    }, []);

    return (
        <>
            <PageTitle
                pageTitle="LISTA DE MODELOS DE PEÇAS"
                pageIcon={<S.PageIcon weight="fill" />}
                button={
                    <S.RedirectPage to="/dashboard/procurador/cadastro-peca">
                        <S.RedirectPageIcon />
                    </S.RedirectPage>
                }
            />

            <S.Wrapper
                style={{
                    display: "flex",
                    flexDirection: "column",
                    //alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <CustomTable
                    data={modelos?.length? modelos : []}
                    isLoading={loadingModelos}
                    showPagination
                    showSearchField
                    showSelectNumberOfRows  
                    columns={
                        [
                            {
                                name: "Titulo",
                                isSortable: true,
                                keyData: "txDescricao",
                                component: {
                                    isButton: false,
                                    element: (data) => {
                                        console.log(data);
                                        return (
                                            <S.TitleText
                                                onClick={() => {
                                                    navigate(
                                                        `/dashboard/procurador/visualizar-peca/${data.id}`
                                                    );
                                                }}
                                            >
                                                {data.txDescricao}
                                            </S.TitleText>
                                        );
                                    }
                                }
                            },
                            {
                                name: "Tipo de Documento",
                                isSortable: true,
                                keyData: "txTipoDocumento"
                            },
                            {
                                name: "Autor",
                                isSortable: true,
                                keyData: "txAutor"
                            }
                    ]
                }
                />
              
            </S.Wrapper>
        </>
    );
};

export default ConsultModels;
