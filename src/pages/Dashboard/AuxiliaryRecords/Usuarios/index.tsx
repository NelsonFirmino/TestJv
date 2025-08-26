import * as S from "./styled";
import { SharedState } from "../../../../context/SharedContext";
import { PageTitle } from "../../../../components/TitlePage";
import { useUsers } from "../../../../hooks/useUsers";
import { CustomTable } from "../../../../components/CustomTable";
import { BlockedStatus } from "./components/BlockedStatus";
import { EditUser } from "./components/EditUser";

const Usuarios = () => {
    const { user } = SharedState();
    const { data: users, isLoadingUsers } = useUsers(+user["jvris.User.Perfil"])

    return (
        <>
            <PageTitle pageTitle="Lista de usuários do sistema" pageIcon={<S.PageIcon />}
            button={
                <S.RegisterUserButton>
                    <S.RegisterUserIcon />
                </S.RegisterUserButton>
            } />
            <S.Wrapper>
            <CustomTable 
                columns={[
                    {
                        keyData: "txUsuario",
                        name: "Nome do usuário",
                        isSortable: true,
                    },
                    {
                        keyData: "txCpf",
                        name: "CPF",
                        isSortable: false,
                    },
                    {
                        keyData: "txPerfil",
                        name: "Perfil",
                        isSortable: true,
                    },
                    {
                        keyData: "txLogin",
                        name: "Login",
                        isSortable: true,
                    },
                    {
                        keyData: "isBloqueado",
                        name: "Bloqueado",
                        isSortable: false,
                        component: {
                            element: (data) => <BlockedStatus dataTable={data} />,
                            isButton: false,
                        }
                    },
                    {
                        keyData: "jhbhdjs",
                        name: "",
                        isSortable: false,
                        component: {
                            element: (data) => <EditUser dataTable={data} />,
                            isButton: true,
                        }
                    }
                ]}
                data={users?.data ? users.data : []} 
                isLoading={isLoadingUsers}
                showPagination={true}
                showSearchField={true}
                showSelectNumberOfRows={true}
                csvButton={{
                    nameFile: "lista-usuarios"
                }}
                pdfButton={{
                    nameFile: "lista-usuarios"
                }}
            />
            </S.Wrapper>  
        </>
    )
}

export default Usuarios;