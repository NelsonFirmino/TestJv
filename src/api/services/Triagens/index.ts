import { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { TriagenServiceI } from "./interface";
import { AxiosResponse } from "axios";

const useTriagensService = () => {
	const [triagem, setTriagem] =
		useState<TriagenServiceI>();
	const [triagens, setTriagens] =
		useState<TriagenServiceI[]>();
	
	const get = (idTriagem: number) =>
		new Promise(
			async (
				resolve: (
					res: TriagenServiceI,
				) => void,
				reject: (res: string) => void,
			) => {
				{
					try {
						const triagem =
							await axiosInstance.get(
								`/api/v1.0/triagens/${idTriagem}`,
							);

						setTriagem(
							triagem.data.data,
						);
						resolve(
							triagem.data.data,
						);
					} catch (err) {
						reject(err as any);
					}
				}
			},
		);
	const getMany = (idsTriagem: number[]) =>
		new Promise(
			async (
				resolve: (
					res: TriagenServiceI[],
				) => void,
				reject: (res: string) => void,
			) => {
				{
					const triList = [];
					for (
						let i = 0;
						i <
						idsTriagem.length;
						i++
					) {
						try {
							const tri =
								await axiosInstance.get(
									`/api/v1.0/triagens/${idsTriagem[i]}`,
								);
							triList.push(
								tri.data.data,
							);
							// setTriagens((old) => {
							//   if (old) {
							//     return [...old, tri.data.data];
							//   }
							//   return [tri.data.data];
							// });
							resolve(triList);
						} catch (err) {
							reject(err as any);
						}
					}
				}
			},
		);

	const deleteAto = (id: number) =>
		new Promise(
			async (
				resolve: (
					res: AxiosResponse<any, any>,
				) => void,
				reject: (res: string) => void,
			) => {
				{
					try {
						const triagem =
							await axiosInstance.delete(
								`/api/v1.0/Triagens/Atos/${id}`,
							);

						resolve(triagem);
					} catch (err) {
						reject(err as any);
					}
				}
			},
		);

	return {
		get,
		triagem,
		getMany,
		triagens,
		deleteAto,
	};
};

export default useTriagensService;
