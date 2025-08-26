import * as S from "./styled";
import { UsuarioDisponiveisParams } from "./usuarios-disponiveis.interface";
import { UsuarioSigilo } from "../../adicionar-usuario-processo-sigiloso.interface";

export const UsuariosDisponiveis = ({
  availableUser,
  usersWithPermission,
  setRemoveUserPermission,
  usersToRemovePermission,
  usersToAddPermission,
  setUserPermission,
}: UsuarioDisponiveisParams) => {
  const handleAddUser = (user: UsuarioSigilo) => {
    setRemoveUserPermission(usersToRemovePermission.filter((u) => u !== user));

    if (!usersWithPermission?.includes(user)) {
      setUserPermission([...usersToAddPermission, user]);
    }
  };

  const removeDuplicates = (firstArray: any[], secondArray: any[]) => {
    return firstArray?.filter(
      (item1) => !secondArray?.some((item2) => item2.id === item1.id)
    );
  };

  return (
    <S.Wrapper>
      <S.TitleContainer>
        <S.Title>
          Usuários Disponíveis (
          {removeDuplicates(availableUser, usersWithPermission)?.length})
        </S.Title>
        <S.SubtitleNewUsers>
          Usuários removidos da lista de permissão do processo (
          <S.SubtitleNewUsersCount>
            {usersToRemovePermission.length}
          </S.SubtitleNewUsersCount>
          )
        </S.SubtitleNewUsers>
      </S.TitleContainer>

      <S.ListUsersContainer>
        {Boolean(usersToRemovePermission?.length) &&
          usersToRemovePermission.map((user) => (
            <S.UserContainerSelected key={user.id}>
              <S.AddedUsername>{user.txUsuario}</S.AddedUsername>
              <S.AddButton onClick={() => handleAddUser(user)}>
                <S.XIcon weight="bold" />
              </S.AddButton>
            </S.UserContainerSelected>
          ))}

        {Boolean(
          removeDuplicates(availableUser, usersWithPermission)?.length
        ) ? (
          removeDuplicates(availableUser, usersWithPermission).map(
            (user) =>
              !usersToAddPermission.includes(user) && (
                <S.UserContainer key={user.id}>
                  <S.Username>{user.txUsuario}</S.Username>
                  <S.AddButton onClick={() => handleAddUser(user)}>
                    <S.ArrowIcon weight="bold" />
                  </S.AddButton>
                </S.UserContainer>
              )
          )
        ) : (
          <S.Username>
            Não foram encontrados usuários disponíveis para atribuir sigilo.
          </S.Username>
        )}
      </S.ListUsersContainer>
    </S.Wrapper>
  );
};
