import { lazy } from "react";
import { useParams } from "react-router-dom";
import CadastroRequisitorios from "./Cadastro";
import TabelaRequisitorios from "./Tabela";

const Requisitorios = () => {
    const { process_id } = useParams();

    return (
        <div>
            <CadastroRequisitorios process_id={process_id} />
            <TabelaRequisitorios process_id={process_id} />
        </div>
    );
};

export default Requisitorios;

export const RequisitoriosLazy = lazy(() => import("."));
