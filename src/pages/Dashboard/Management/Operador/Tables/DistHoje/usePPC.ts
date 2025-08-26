import { JvrisClicableButtonI } from "../../../../../../components/JvrisTable/components/ClicableButton/ClicableButton.interface";
import { useOperadorContext } from "../../context";

import { createSubOptions } from "../utils";

const usePPC = () => {
	const {
		AtosAguardandoCiencia,
		setOpenTomarCienciaModal,
		setProcessoData,
		setTomarCienciaNoJVRIS,
	} = useOperadorContext();

	const tableClicable: JvrisClicableButtonI = {
		text: "Excluir",
		onClick: async (index) => {},
	};

	return {
		tableClicable,
	};
};

export default usePPC;
