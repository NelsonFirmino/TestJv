import { SharedState } from "../../../context/SharedContext";
import { LogoutProps } from "./logout.interface";
import * as S from "./styled";

export const Logout = ({ isSideBarOpen }: LogoutProps) => {
  const { setUser, setSelectedUser } = SharedState();

  const handleLogout = () => {
    setUser(null);
    setSelectedUser(null);
    localStorage.clear();
  };

  return (
    <S.Wrapper isSideBarOpen={isSideBarOpen} onClick={handleLogout}>
      <S.ExitIcon />
      <S.Text isSideBarOpen={isSideBarOpen}>Sair</S.Text>
    </S.Wrapper>
  );
};
