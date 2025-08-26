import { CustomTable } from "../../../../../../../components/CustomTable";
import { SharedState } from "../../../../../../../context/SharedContext";
import { ProcessNumber } from "../../TableComponents/ProcessNumber";
import * as S from './styled';
import { RedistribuicaoProps } from "./inacao.interface";
import { AvaliarPedidoEmLote } from "./components/AvaliarPedidoEmLote";

export const Redistribuicao = ({ currentTable, data, isLoading }: RedistribuicaoProps) => {
    const { user, selectedUser, selectedRedistributionDataTable, setSelectedRedistributionDataTable } = SharedState();
    return (
        <S.Wrapper isOpen={currentTable === "REDISTRIBUICAO"}>
            <S.OptionsForSelectedProcessContainer isOpen={Boolean(selectedRedistributionDataTable.length)}>
                <AvaliarPedidoEmLote />
            </S.OptionsForSelectedProcessContainer>

            <CustomTable
                isLoading={isLoading}
                data={data ? data : []}
                showPagination={true}
                showSearchField={true}
                showSelectNumberOfRows={true}
                selectRows={true}
                keySelectData="REDISTRIBUICAO"
                csvButton={{
                    nameFile: `processos-redistribuicao-${selectedUser?.name || user["Jvris.User.Name"]}`
                }}
                pdfButton={{
                    nameFile: `processos-redistribuicao-${selectedUser?.name || user["Jvris.User.Name"]}`
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
                        keyData: "txUsuarioSolicitante",
                        isSortable: true,
                    },
                    {
                        name: "Especializada do solicitante",
                        keyData: "txEspecializadaSolicitante",
                        isSortable: true,
                    },
                    {
                        name: "Motivo",
                        keyData: "txMotivo",
                        isSortable: true,
                    },
                    {
                        name: "Observação",
                        keyData: "txObservacao",
                        isSortable: true,
                    },
                    {
                        name: "Especializada de destino",
                        keyData: "txEspecializadaDestino",
                        isSortable: true,
                    },
                    {
                        name: "Procurador de destino",
                        keyData: "txProcuradorDestino",
                        isSortable: true,
                    },
                    {
                        name: "Data de pedido",
                        keyData: "dtCadastro",
                        isSortable: true,
                        formatToDate: true,
                    },
                    {
                        name: "Data de prazo",
                        keyData: "dtPrazo",
                        isSortable: true,
                        formatToDate: true,
                    },
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
                            key: "txUsuarioSolicitante",
                        }, {
                            name: "Especializada do solicitante",
                            key: "txEspecializadaSolicitante"
                        },
                        {
                            name: "Motivo",
                            key: "txMotivo"
                        }
                    ],
                }}
            />
        </S.Wrapper>

    );
}