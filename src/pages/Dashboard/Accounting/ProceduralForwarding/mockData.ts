export function TableDataTitle() {
    const TableTitles = [
        {
            title: "SOLICITAÇÃO"
        },
        {
            title: "Nº PROCESSO"
        },
        {
            title: "ENCAMINHADO À DCJE"
        },
        {
            title: "PRAZO PROCURADOR"
        },
        {
            title: "PRAZO DCJE PROCURADOR"
        },
        {
            title: "RESPONSÁVEL CÁLCULO"
        },
        {
            title: "RESPONDIDO EM"
        },
        {
            title: "DIVERGÊNCIA"
        },
        {
            title: "AÇÕES"
        }
    ];
    return TableTitles.map((content) => {
        return { text: content.title };
    });
}
