import * as S from "./styled";
import { UsuarioComPermissaoParams } from "./usuario-com-permissao.interface";
import { UsuarioSigilo } from "../../adicionar-usuario-processo-sigiloso.interface";

export const UsuariosComPermissao = ({
  availableUser,
  usersToAddPermission,
  setUserPermission,
  usersToRemovePermission,
  setRemoveUserPermission,
  usersWithPermission,
}: UsuarioComPermissaoParams) => {
  const handleRemoveUser = (user: UsuarioSigilo) => {
    setUserPermission(usersToAddPermission.filter((u) => u !== user));

    if (!availableUser.includes(user)) {
      setRemoveUserPermission([...usersToRemovePermission, user]);
    }
  };

  return (
    <S.Wrapper>
      <S.TitleContainer>
        <S.Title>
          Usuários com permissão para o processo (
          {usersWithPermission?.length || 0})
        </S.Title>
        <S.SubtitleNewUsers>
          Usuários adicionados para a lista de permissão do processo (
          <S.SubtitleNewUsersCount>
            {usersToAddPermission?.length}
          </S.SubtitleNewUsersCount>
          )
        </S.SubtitleNewUsers>
      </S.TitleContainer>

      <S.ListUsersContainer>
        {Boolean(usersToAddPermission?.length) &&
          usersToAddPermission.map((user) => (
            <S.UserContainerSelected key={user.id}>
              <S.AddedUsername>{user.txUsuario}</S.AddedUsername>
              <S.RemoveButton onClick={() => handleRemoveUser(user)}>
                <S.XIcon weight="bold" />
              </S.RemoveButton>
            </S.UserContainerSelected>
          ))}

        {Boolean(usersWithPermission?.length) ? (
          usersWithPermission?.map(
            (user) =>
              !usersToRemovePermission.includes(user) && (
                <S.UserContainer key={user.id}>
                  <S.Username>{user.txUsuario}</S.Username>
                  <S.RemoveButton onClick={() => handleRemoveUser(user)}>
                    <S.ArrowIcon weight="bold" />
                  </S.RemoveButton>
                </S.UserContainer>
              )
          )
        ) : (
          <S.Username>
            Não foram encontrados usuários para remover sigilo.
          </S.Username>
        )}
      </S.ListUsersContainer>
    </S.Wrapper>
  );
};
