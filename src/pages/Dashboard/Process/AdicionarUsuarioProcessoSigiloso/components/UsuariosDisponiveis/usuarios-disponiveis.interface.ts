import { UserSigilo } from "../../../../../../api/services/sigilo/sigilo.interface";
import { UsuarioSigilo } from "../../adicionar-usuario-processo-sigiloso.interface";

export interface UsuarioDisponiveisParams {
  availableUser: UserSigilo[];
  usersWithPermission: UserSigilo[];
  usersToRemovePermission: UsuarioSigilo[];
  setRemoveUserPermission: (usuarioSigilo: UsuarioSigilo[]) => void;
  usersToAddPermission: UsuarioSigilo[];
  setUserPermission: (usuarioSigilo: UsuarioSigilo[]) => void;
}
