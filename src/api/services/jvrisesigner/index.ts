const useJvrisESignerService = () => {
    async function openSigner(ticket: string) {
        try {
            //Response.Redirect(string.Format("jvrisesigner://{0}", Peca.ticket), true);
            window.location.href = `jvrisesigner://${ticket}`;
            return Promise.resolve("ok");
        } catch (err) {
            return Promise.reject("error");
        }
    }

    async function openSignerReadOnly(ticket: string) {
        try {
            //Response.Redirect(string.Format("jvrisesigner://{0}", Peca.ticket), true);
            window.location.href = `jvrisesigner://${ticket}&readonly`;
            return Promise.resolve("ok");
        } catch (err) {
            return Promise.reject("error");
        }
    }
    return { openSigner, openSignerReadOnly };
};

export default useJvrisESignerService;
