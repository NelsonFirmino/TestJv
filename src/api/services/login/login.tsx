import axiosInstance from "../../axiosInstance";
import { LoginResponse, SubmitLogin } from "./login.interface";

export const postLogin = async ({
  user,
  password,
}: SubmitLogin): Promise<LoginResponse> => {
  let obj = {
    username: user,
    password: password,
    idsistema: 19,
    txNomeField: null,
    txUsuarioField: null,
  };
  try {
    let objSerializedBase64 = btoa(JSON.stringify(obj));
    const { data } = await axiosInstance.post<LoginResponse>(
      "/api/v1.0/Autenticacao/signin",
      objSerializedBase64
    );

    if (data?.status !== "OK") {
      throw new Error(JSON.parse(data?.message).Message);
    }

    localStorage.setItem("token", data.data.token);

    return data;
  } catch (err) {
    return err;
  }
};
