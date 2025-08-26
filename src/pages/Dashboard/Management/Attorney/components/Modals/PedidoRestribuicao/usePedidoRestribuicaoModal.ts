import { useEffect, useState } from "react";
import usePedidoRedistribuicaoService from "../../../../../../../api/services/Distribuições/pedido-restribuição";
import useTriagensService from "../../../../../../../api/services/Triagens";
import useMotivosRedistribuicoesService from "../../../../../../../api/services/motivos-redistribuicoes";
import { mapEspecializadasDoSelect, mapToSelect } from "../../../../../../../utils/MapDataToSelect";
import useEspecializadasService from "../../../../../../../api/services/Especializada";
import useProcuradorService from "../../../../../../../api/services/Procurador";
import { OptionsType, StdState } from "../../../interfaces";
import { useTablesContext } from "../../../context/TablesContext";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import { HotToastError, HotToastSucess } from "../../../../../../../components/HotToastFuncs";
import jwtDecode from "jwt-decode";
import useAtosService from "../../../../../../../api/services/atos/atos";
import { TriagenServiceI } from "../../../../../../../api/services/Triagens/interface";

const usePedidoRestribuicaoModal = () => {
	const { managing } = useTablesContext();
	const { isModalOpen, closeModal, currModal, openModal,setShouldReset } = useModalsContext();

	const [motivosRedistribuicoes, setMotivosRedistribuicoes] = useState<StdState>();
	const [especializadas, setEspecializadas] = useState<StdState>();
	const [procuradores, setProcuradores] = useState<StdState>();
	const [observacao, setObservacao] = useState("");
	const [process, setProcess] = useState("");
	const [processosOptions, setProcessosOptions] = useState<OptionsType[]>([]);
	const [processosSelecionados, setProcessosSelecionados] = useState<OptionsType[]>([]);
	const { postPedidoRedist } = usePedidoRedistribuicaoService();
	const { get: getTriagens } = useTriagensService();
	const [triagens, setTriagens] = useState<TriagenServiceI[]>([]);
	const {get:getAto,ato} = useAtosService()
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
				getAto(managing.singularSelectedData.id).then((AtoRes: any) => {
					if (AtoRes) {
						//console.log('GetAtos', AtoRes);
						getTriagens(AtoRes.idTriagem).then((TriagemRes: any) => {
							if (TriagemRes) {
								setTriagens([TriagemRes]);
								//console.log('GetTriagens', TriagemRes);
								getEspecializada(TriagemRes.idSecretaria).then((EspecRes: any) => {
									//console.log('GetEspecializada', EspecRes);
									setEspecializadas({
										generalData: mapEspecializadasDoSelect(EspecRes),
										selected: TriagemRes.idEspecializada,
									})
								});
								//getManyTriagens([res.id]);
							}
						});
					}
				});
			} else {
				const tris = []
				managing.selectedData.forEach((item: any) => {
					//console.log(item);
					getAto(item.id).then((AtoRes: any) => {
						if (AtoRes) {
							//console.log('GetAtos', AtoRes);
							getTriagens(AtoRes.idTriagem).then((TriagemRes: any) => {
								if (TriagemRes) {
									tris.push(TriagemRes)
									//console.log('GetTriagens', TriagemRes);
									getEspecializada(TriagemRes.idSecretaria).then((EspecRes: any) => {
										//console.log('GetEspecializada', EspecRes);
										setEspecializadas({
											generalData: mapEspecializadasDoSelect(EspecRes),
											selected: TriagemRes.idEspecializada,
										})
									});
									//getManyTriagens([res.id]);
								}
							});
						}
					});
				});
				setTriagens(tris);
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
			getProcurador(parseInt(especializadas.selected.toString()));
		}
	}, [especializadas]);


	function reset(reseed?: boolean) {
		managing.resetSingularSelectedData();
		closeModal(reseed);
	}

	function selectEspecializada(event: any) {
		setEspecializadas({
			...especializadas,
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
		//console.log(event);
		setMotivosRedistribuicoes({
			generalData: motivosRedistribuicoes?.generalData,
			selected: event.value,
		});
	}

	function savePedidoRedist() {
		if ((!triagens) || !especializadas?.selected || !procuradores?.selected || !motivosRedistribuicoes?.selected) {
			//console.log(triagens, especializadas?.selected, procuradores?.selected, motivosRedistribuicoes?.selected);

			HotToastError("Preencha todos os campos");
			return;
		}

		for (let i = 0; i < triagens.length; i++) {
			postPedidoRedist({
				idDistribuicaoAntiga: triagens[i].id,
				idEspecializada: especializadas.selected,
				idProcurador: procuradores.selected,
				idMotivo: motivosRedistribuicoes.selected,
				idUsuarioCadastro: parseInt(userId),
				txObservacao: observacao,
			})
				.then((res: any) => {
					if (res.status == "BadRequest") HotToastError("Erro ao salvar pedido de redistribuição");
					else{
						HotToastSucess("Pedido de redistribuição salvo com sucesso"); 
						setShouldReset(true);
						reset(true);
					}
					
				})
				.catch((err) => {
					HotToastError("Erro ao salvar pedido de redistribuição");
				});
		}
	}
	//}

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
		observacao,
		setObservacao
	};
};

export default usePedidoRestribuicaoModal;
