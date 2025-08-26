import { useEffect, useState } from "react";
import usePedidoRedistribuicaoService from "../../../../../../../api/services/Distribuições/pedido-restribuição";
import useTriagensService from "../../../../../../../api/services/Triagens";
import useMotivosRedistribuicoesService from "../../../../../../../api/services/motivos-redistribuicoes";
import { mapEspecializadasDoSelect, mapToSelect } from "../../../../../../../utils/MapDataToSelect";
import useEspecializadasService from "../../../../../../../api/services/Especializada";
import useProcuradorService from "../../../../../../../api/services/Procurador";
import toast from "react-hot-toast";
import { OptionsType, StdState } from "../../../interfaces";
import { useTablesContext } from "../../../context/TablesContext";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import { HotToastError, HotToastSucess } from "../../../../../../../components/HotToastFuncs";
import jwtDecode from "jwt-decode";

const usePedidoRestribuicaoModal = () => {
	const { managing } = useTablesContext();
	const { isModalOpen, closeModal, currModal, openModal } = useModalsContext();

	const [motivosRedistribuicoes, setMotivosRedistribuicoes] = useState<StdState>();
	const [especializadas, setEspecializadas] = useState<StdState>();
	const [procuradores, setProcuradores] = useState<StdState>();

	const [process, setProcess] = useState("");
	const [processosOptions, setProcessosOptions] = useState<OptionsType[]>([]);
	const [processosSelecionados, setProcessosSelecionados] = useState<OptionsType[]>([]);
	const { postPedidoRedist } = usePedidoRedistribuicaoService();
	const { getMany: getManyTriagens, get: getTriagens, triagem, triagens } = useTriagensService();

	const { especializadas: espec, get: getEspecializada } = useEspecializadasService();
	const { get: getMotivosRedist, motivosRedistribuicoes: motivRedis } = useMotivosRedistribuicoesService();
	const { get: getProcurador, procuradores: procs } = useProcuradorService();
	const tokenString = localStorage.getItem("token")!;
	const token: any = jwtDecode(tokenString);
	const userId: string = token["Jvris.User.Id"];

	function mapToOptionsType(data: any[], valueKey: string, labelKey: string): OptionsType[] {
		return data.map((item: any) => {
			return {
				value: item[valueKey],
				label: item[labelKey],
				isFixed: true,
				isSelected: true,
			};
		});
	}

	useEffect(() => {
		if (managing.selectedData) {
			const mappedData = mapToOptionsType(managing.selectedData, "id", "txNumero");
			setProcessosOptions(mappedData);
			setProcessosSelecionados(mappedData);
		}
	}, [managing]);

	useEffect(() => {
		if (currModal == modalsID.pedidoRedistribuicao && managing.singularSelectedData) {
			const mappedData = mapToOptionsType([managing.singularSelectedData], "id", "txNumero");
			setProcessosOptions(mappedData);
			setProcessosSelecionados(mappedData);
		}
	}, [managing]);

	useEffect(() => {
		if ((managing.selectedData || managing.singularSelectedData) && isModalOpen(modalsID.pedidoRedistribuicao) && currModal === modalsID.pedidoRedistribuicao) {
			getMotivosRedist();
			// colocar for
			if (managing.singularSelectedData) {
				getTriagens(managing.singularSelectedData.id);
				getManyTriagens([managing.singularSelectedData.id]);
			} else {
				getTriagens(managing.selectedData[0].id);
				getManyTriagens(managing.selectedData.map((d) => d.id));
			}
		}
	}, [currModal]);

	useEffect(() => {
		if (procs) {
			const data = mapToSelect(procs, ["id", "txProcurador"]);
			setProcuradores({
				generalData: data,
				selected: undefined,
			});
		}
	}, [procs]);

	useEffect(() => {
		if (motivRedis) {
			const data = mapToSelect(motivRedis, ["id", "txMotivo"]);
			setMotivosRedistribuicoes({
				generalData: data,
				selected: undefined,
			});
		}
	}, [motivRedis]);

	useEffect(() => {
		if (especializadas?.selected) {
			getProcurador(parseInt(especializadas?.selected.toString()));
		}
	}, [especializadas]);

	useEffect(() => {
		if (triagem) {
			getEspecializada(triagem.idSecretaria);
		}
	}, [triagem]);

	useEffect(() => {
		if (espec) {
			const data = mapEspecializadasDoSelect(espec);
			setEspecializadas({
				generalData: data,
				selected: undefined,
			});
		}
	}, [espec]);

	function reset() {
		managing.resetSingularSelectedData();
		setProcess("");
		closeModal();
	}

	function selectEspecializada(event: any) {
		setEspecializadas({
			generalData: especializadas?.generalData,
			selected: event.value,
		});
	}
	function selectProcurador(event: any) {
		setProcuradores({
			generalData: procuradores?.generalData,
			selected: event.value,
		});
	}
	function selectMotivoRedis(event: any) {
		setMotivosRedistribuicoes({
			generalData: motivosRedistribuicoes?.generalData,
			selected: event.value,
		});
	}

	function savePedidoRedist() {
		if ((!triagens && !triagem) || !especializadas?.selected || !procuradores?.selected || !motivosRedistribuicoes?.selected) {
			//console.log(triagens, especializadas?.selected, procuradores?.selected, motivosRedistribuicoes?.selected);

			HotToastError("Preencha todos os campos");
			return;
		}

		if (!triagens || (triagens && triagens.length == 0)) {
			postPedidoRedist({
				idDistribuicaoAntiga: triagem.id,
				idEspecializada: especializadas.selected,
				idProcurador: procuradores.selected,
				idMotivo: motivosRedistribuicoes.selected,
				idUsuarioCadastro: parseInt(userId),
				txObservacao: "dsadas",
			})
				.then((res: any) => {
					if (res.status == "BadRequest") HotToastError("Erro ao salvar pedido de redistribuição");
					else HotToastSucess("Pedido de redistribuição salvo com sucesso");
					closeModal();
				})
				.catch((err) => {
					HotToastError("Erro ao salvar pedido de redistribuição");
				});
		} else {
			for (let i = 0; i < triagens.length; i++) {
				postPedidoRedist({
					idDistribuicaoAntiga: triagens[i].id,
					idEspecializada: especializadas.selected,
					idProcurador: procuradores.selected,
					idMotivo: motivosRedistribuicoes.selected,
					idUsuarioCadastro: parseInt(userId),
					txObservacao: "dsada",
				})
					.then((res: any) => {
						if (res.status == "BadRequest") HotToastError("Erro ao salvar pedido de redistribuição");
						else HotToastSucess("Pedido de redistribuição salvo com sucesso");
						closeModal();
					})
					.catch((err) => {
						HotToastError("Erro ao salvar pedido de redistribuição");
					});
			}
		}
	}

	return {
		close: reset,
		open: openModal,
		isOpen: isModalOpen(modalsID.pedidoRedistribuicao),
		motivosRedistribuicoes,
		procuradores,
		especializadas,
		selectEspecializada,
		savePedidoRedist,
		selectMotivoRedis,
		selectProcurador,
		processosOptions,
		processosSelecionados,
		managing,
		process,
	};
};

export default usePedidoRestribuicaoModal;
