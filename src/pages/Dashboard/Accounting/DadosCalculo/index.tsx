import { lazy } from "react";
import { DadosCalculoProvider } from "./DadosCalcContext";
import AddExequenteModal from "./modals/AddExequente";
import { CALC } from "../Calculation/interfaces/calculation.interfaces";
import Page from "./Page";

const DadosCalculo = (props: CALC) => {

    return <DadosCalculoProvider>
        <AddExequenteModal />
        <Page pageName={props.pageName} setPageName={props.setPageName} />
    </DadosCalculoProvider>
}

export default DadosCalculo

export const DadosCalcLazy = lazy(
    () => import("./")
);