import axiosInstance from "../../axiosInstance";

const usePecasAnexosService = () => {
    const excluirAnexo = (PecaId: number) =>
        new Promise(
            async (
                resolve: (res: any) => void,
                reject: (res: string) => void
            ) => {
                try {
                    // string url = string.Format("{0}/v1.0/pecas-anexos/{1}", URL, id);
                    const res = await axiosInstance.delete(
                        `/api/v1.0/pecas-anexos/${PecaId}`
                    );
                    resolve(res.data.data);
                } catch (err) {
                    reject(err);
                }
            }
        );

    return {
        excluirAnexo
    };
};

export default usePecasAnexosService;
