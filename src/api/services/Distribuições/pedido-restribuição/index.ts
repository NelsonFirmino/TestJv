import axiosInstance from "../../../axiosInstance";
import { PedidoRedistribuicaoServiceI } from "./interfaces";

const usePedidoRedistribuicaoService = () => {
	const postPedidoRedist = (data: PedidoRedistribuicaoServiceI) =>
		new Promise(async (resolve: (res: string) => void, reject: (res: string) => void) => {
			try {
				const res = await axiosInstance.post("/api/v1.0/Distribuicoes/pedido-redistribuicao", data);
				resolve(res.data);
			} catch (err) {
				reject(err);
			}
		});

	return { postPedidoRedist };
};

export default usePedidoRedistribuicaoService;
