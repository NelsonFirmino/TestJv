import { UserSigilo } from "../../../../../../api/services/sigilo/sigilo.interface";
import { UsuarioSigilo } from "../../adicionar-usuario-processo-sigiloso.interface";

export interface UsuarioComPermissaoParams {
  availableUser: UsuarioSigilo[];
  usersToAddPermission: UsuarioSigilo[];
  setUserPermission: (usuarioSigilo: UsuarioSigilo[]) => void;
  usersToRemovePermission: UsuarioSigilo[];
  setRemoveUserPermission: (usuarioSigilo: UsuarioSigilo[]) => void;
  usersWithPermission: UserSigilo[];
}
