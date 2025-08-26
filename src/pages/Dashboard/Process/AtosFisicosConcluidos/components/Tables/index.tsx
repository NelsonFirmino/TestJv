import ProcessosTable from "./Processos";
import { useState } from "react";
import { SecretariaSelect } from "./Processos/styled";
import { SecretariasI } from "./Processos/interfaces";

interface AttorneyTablesI {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setProcessoData: React.Dispatch<any>
}

const AttorneyTables = (props: AttorneyTablesI) => {
    //const navigate = useNavigate();
    const { setProcessoData, setOpenModal } = props;
    const [secretarias, setSecretarias] =
        useState<SecretariasI[]>([]);

    return (
        <>
            <div style={{
                marginBottom: "20px",
            }}>
                <SecretariaSelect
                    options={secretarias.map((secretaria) => ({
                        value: secretaria.id,
                        label: secretaria.txSecretaria,
                    }))}
                />
            </div>


            <ProcessosTable
                setData={setProcessoData}
                setOpenModal={setOpenModal}
                setSecretarias={setSecretarias}


            />
        </>
    );
};

export default AttorneyTables;
