import { useState } from "react";
import { ContainerField, TitleContainer } from "../modalStyled";
import { OpenSeta, SelectedWrapper } from "./Distruibuir/styled";
import { useOperadorContext } from "../context";
import { TitleLabel } from "../../../../../components/JvrisModal/styled";
import theme from "../../../../../globalStyle/theme";

const ShowProcesss = () => {
    const [mostrarProcessos, setMostrarProcessos] = useState(false);
    const { processosData, processoData } = useOperadorContext();

    return (
        <div style={{
            flexDirection: "column",
            width: "630px"
        }}>
            {processosData.length > 0 ?
                <>
                    <TitleContainer
                        onClick={() =>
                            setMostrarProcessos(!mostrarProcessos)
                        }
                        style={{
                            marginBottom: "1rem",
                            borderRadius: "0.5rem",
                            padding: "1.5rem 1rem",
                            display: "flex",
                            justifyContent: "space-between",
                            cursor: "pointer",
                        }}>
                        <TitleLabel style={{
                            color: theme.colors.white,
                        }}>
                            Num. Processos ({processosData.length})
                        </TitleLabel>
                        <OpenSeta open={mostrarProcessos} size={24} weight="bold" />
                    </TitleContainer>

                    {
                        mostrarProcessos &&
                        <ContainerField

                            style={{
                                flexWrap: "wrap",
                                flexDirection: "row",
                                gap: "1rem",
                            }}>
                            {processosData.map((processo) => {
                                return (
                                    <SelectedWrapper
                                        onClick={() => {
                                            window.location.href = `/dashboard/detalhes-processo/espelho-processos/${processo.idProcesso}`;
                                        }}
                                    >
                                        {processo.txNumeroFormatado}
                                    </SelectedWrapper>
                                )
                            })
                            }
                        </ContainerField>
                    }
                </>
                :
                <ContainerField style={{

                    flexWrap: "wrap",
                    flexDirection: "row",
                    gap: "1rem",
                }}>

                    <SelectedWrapper onClick={() => {
                        window.location.href = `/dashboard/detalhes-processo/espelho-processos/${processoData.idProcesso}`;
                    }}>
                        {processoData.txNumeroFormatado}
                    </SelectedWrapper>



                </ContainerField>
            }

        </div>



    )
}

export default ShowProcesss;