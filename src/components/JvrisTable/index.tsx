import * as S from "./styled";
import { JvrisTableI } from "./JvrisTable.interface";
import TopSection from "./Sections/Top";
import TableSection from "./Sections/Table";
import BottomSection from "./Sections/Bottom";
import { JvrisTableProvider } from "./context/JvrisTableContext";
import JvrisLoading from "../JvrisLoading";
import theme from "../../globalStyle/theme";

interface LoadingHandlerI {
    loading?: {
        loadingData: boolean,
        loadingStatus: string
    },
    data: any[]
    children: any
    hasData?: boolean
}
const LoadingHandler = (props: LoadingHandlerI) => {
    const { loading, data, children, hasData } = props;
    return (
        loading?.loadingData ?
            <S.LoadingContainer>
                <JvrisLoading loading />
                <S.LoadingText>{loading.loadingStatus}</S.LoadingText>
            </S.LoadingContainer>
            : hasData && (!data || data.length == 0) ?
                <S.LoadingContainer>
                    <JvrisLoading loading />
                    <S.LoadingText>Preenchendo Tabela</S.LoadingText>
                </S.LoadingContainer>
                : data.length == 0 && !hasData ? <S.ErrorText>Não há dados para serem exibidos</S.ErrorText>
                    :
                    <>
                        {children}
                    </>
    )
}

const JvrisTable = (props: JvrisTableI) => {
    return (
        <JvrisTableProvider {...props}>
            <div style={{
                outline: `1px solid ${theme.colors.lightGrey}`
            }}>
                <LoadingHandler
                    loading={props.loading}
                    data={props.data}
                    hasData={props.hasData}
                >
                    <TopSection />
                    <TableSection />
                    <BottomSection />
                </LoadingHandler>
            </div>

        </JvrisTableProvider>
    );
};

export default JvrisTable;
