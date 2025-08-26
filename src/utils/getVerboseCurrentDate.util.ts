export const getVerboseCurrentDate = () => {
    const dataAtual = new Date();
    const diaDaSemana = dataAtual.toLocaleDateString('pt-BR', { weekday: 'long' });
    const diaDoMes = dataAtual.getDate();
    const mes = dataAtual.toLocaleDateString('pt-BR', { month: 'long' });

    const data = diaDaSemana + ' ' + diaDoMes + ' de ' + mes;

    return data;
}