import * as S from "./styled";
import { RegisterProcessTable } from "./table.interface";

export const Table = ({ title, data }: RegisterProcessTable) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>CPF/CNPJ</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {data.map((line, index) => (
            <tr key={index}>
              <td>{line.name}</td>
              <td>{line.cpfCnpj}</td>
              <td>
                <button onClick={() => {}}>Ação</button>
              </td>
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.Container>
  );
};
