import jwtDecode from "jwt-decode";
import { Plus } from "phosphor-react";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "../../../../components/TitlePage";
import { getPatrimonios } from "./apiHooks/usePatrimonios";
import { PatrimoniosProvider } from "./context";
import PatrimoniosModals from "./modals";
import * as S from "./styled";
import PatrimoniosTable from "./Table";

const Patrimonios = () => {
    const {
        mutate: getpatrimonios,
        data: patrimonios,
        isLoading: isLoadingPatrimonios
    } = useMutation(getPatrimonios);

    useEffect(() => {
        getpatrimonios({});
    }, []);

    const nav = useNavigate();
    const tokenString = localStorage.getItem("token")!;
    const token: any = jwtDecode(tokenString);
    const isGestor =
        token["Jvris.User.isGestorPatrimonio"].toLowerCase() === "true";

    return (
        <PatrimoniosProvider>
            <S.Back>
                <PatrimoniosModals />
                <PageTitle
                    pageTitle="Patrimônios"
                    button={
                        isGestor && (
                            <div
                                style={{
                                    flexDirection: "row",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px"
                                }}
                            >
                                <S.TitleSection>Criar Novo</S.TitleSection>

                                <S.IconWrapper
                                    onClick={() => {
                                        nav(
                                            `/dashboard/gerenciamento/create-patrimonios`
                                        );
                                    }}
                                >
                                    <Plus size={20} />
                                </S.IconWrapper>
                            </div>
                        )
                    }
                />
                <S.Wrapper>
                    <PatrimoniosTable
                        isLoadingPatrimonios={isLoadingPatrimonios}
                        patrimonios={patrimonios}
                    />
                </S.Wrapper>
            </S.Back>
        </PatrimoniosProvider>
    );
};

export default Patrimonios;
