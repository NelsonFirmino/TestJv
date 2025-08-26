import { useNavigate } from "react-router-dom";
import { JvrisClicableButtonI } from "../../../../../../components/JvrisTable/components/ClicableButton/ClicableButton.interface";
import { useOperadorContext } from "../../context";
import { createSubOptions } from "../utils";

const usePPC = () => {
  const navigate = useNavigate();
  const {
    processosPendentes,
    cadastrarProcesso,
    setCadastrarProcesso,
    setExcluirAtoData,
    setOpenExcluirAto,
    setProcessoData,
    secretaria,
  } = useOperadorContext();

  const tableClicable: JvrisClicableButtonI = {
    text: "Cadastrar",
    // onClick: (index) => {
    // 	navigate(`/dashboard/cadastro-processos`, {
    // 		state: {
    // 			idAto: processosPendentes.rawData[index].id,
    // 			processoData: processosPendentes.rawData[index],
    // 		},
    // 	});
    // },
    onClick: (index) => {
      // setCadastrarProcesso({
      //   id: processosPendentes.rawData[index].id,
      //   txNumeroFormatado: processosPendentes.rawData[index].txNumeroFormatado,
      //   txSistemaProcessual:
      //     processosPendentes.rawData[index].txSistemaProcessual,
      //   txSecretaria: processosPendentes.rawData[index].txSecretaria,
      //   txClasse: processosPendentes.rawData[index].txClasse,
      //   dtCiencia: processosPendentes.rawData[index].dtCiencia,
      //   idEspecializada: processosPendentes.rawData[index].idEspecializada,
      //   idSecretaria: secretaria.id,
      // } as any);
      // setProcessoData(processosPendentes.rawData[index]);
      navigate(
        `/dashboard/cadastro-processos/${processosPendentes.rawData[index].id}`
      );
    },
    subOptions: createSubOptions([
      [
        {
          onClick: (index) => {
            navigate(
              `/dashboard/processo/registro-ato/${processosPendentes.rawData[index].id}`
            );
          },
          option: "Editar Ato",
        },
        {
          onClick: (index) => {
            setOpenExcluirAto(true);
            setExcluirAtoData({
              idAtoasnasna: processosPendentes.rawData[index].id,
              // txNumeroFormatado:
              //   processosPendentes.rawData[index].txNumeroFormatado,
              // txSistemaProcessual:
              //   processosPendentes.rawData[index].txSistemaProcessual,
              // txSecretaria: processosPendentes.rawData[index].txSecretaria,
              // txClasse: processosPendentes.rawData[index].txClasse,
              // dtCiencia: processosPendentes.rawData[index].dtCiencia,
              // idEspecializada:
              //   processosPendentes.rawData[index].idEspecializada,
              // idSecretaria: secretaria.id,
            } as any);
            setProcessoData(processosPendentes.rawData[index]);
          },

          option: "Excluir Ato",
        },
      ],
    ]),
  };

  return {
    tableClicable,
  };
};

export default usePPC;
