import { CustomTable } from "../../../../../../../components/CustomTable";
import { SharedState } from "../../../../../../../context/SharedContext";
import { ProcessNumber } from "../../TableComponents/ProcessNumber";
import * as S from './styled';
import { InacaoProps } from "./inacao.interface";
import { AcatarPedidoEmLote } from "./components/AcatarPedidosEmLote";

export const Inacao = ({ currentTable, data, isLoading }: InacaoProps) => {
    const { user, selectedUser, selectedInactionDataTable } = SharedState();
    return (
        <S.Wrapper isOpen={currentTable === "INACAO"}>
            <S.OptionsForSelectedProcessContainer isOpen={Boolean(selectedInactionDataTable.length)}>
                <AcatarPedidoEmLote />
            </S.OptionsForSelectedProcessContainer>

            <CustomTable
                isLoading={isLoading}
                data={data ? data : []}
                showPagination={true}
                showSearchField={true}
                showSelectNumberOfRows={true}
                selectRows={true}
                keySelectData="INACAO"
                csvButton={{
                    nameFile: `processos-inacao-${selectedUser?.name || user["Jvris.User.Name"]}`
                }}
                pdfButton={{
                    nameFile: `processos-inacao-${selectedUser?.name || user["Jvris.User.Name"]}`
                }}
                columns={[
                    {
                        name: "Número do Processo",
                        keyData: "txNumeroProcesso",
                        isSortable: true,
                        component: {
                            element: (data) => <ProcessNumber data={data} />,
                            isButton: false,
                        },
                    },
                    {
                        name: "Solicitante",
                        keyData: "txProcurador",
                        isSortable: true,
                    },
                    {
                        name: "Observação",
                        keyData: "txObservacao",
                        isSortable: true,
                    },
                    {
                        name: "Data Pedido Inação",
                        keyData: "dtCadastro",
                        isSortable: true,
                        formatToDate: true,
                    }
                ]}
                defaultSortKeyColumn={{
                    key: "dtCadastro",
                    direction: "ascending"
                }}
                selectDataColumnButton={{
                    columns: [
                        {
                            name: "Número do Processo",
                            key: "txNumeroProcesso",
                        },
                        {
                            name: "Solicitante",
                            key: "txProcurador",
                        }, {
                            name: "Especializada",
                            key: "txEspecializada"
                        },
                        {
                            name: "Data Pedido Inação",
                            key: "dtCadastro"
                        }
                    ],
                }}
            />
        </S.Wrapper>

    );
}