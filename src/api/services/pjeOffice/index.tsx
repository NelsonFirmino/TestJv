import { PjeOffice } from "./PjeApi";

const PjeOfficeService = () => {
    const test = () => {
        PjeOffice.loginSSO("your challenge phrase here", "your token", {
            argument: {
                REQUEST_TIMEOUT: 600000, //Opcional: se não informado será considerado PJEOFFICE_DEFAULT_ARGUMENTS.REQUEST_TIMEOUT
                PAGINA_LOGIN: "/fakeBackend", //Opcional: se não informado será considerado PJEOFFICE_DEFAULT_ARGUMENTS.PAGINA_LOGIN
                ALGORITMO: "MD5withRSA" //Opcional: se não informado será considerado PJEOFFICE_DEFAULT_ARGUMENTS.ALGORITMO_AUTENTICACAO
            },
            onSuccess: function (data) {}, //Opcional: se não informada a notificação é ignorada
            onFailed: function (statusText) {}, //Opcional: se não informada a notificação é ignorada
            onUnavailable: function (statusText) {} //Opcional: se não informada a notificação é ignorada
        });
    };

    return { test };
};

export default PjeOfficeService;
