export interface SideBarProps {
  isSideBarOpen: boolean;
  setSideBarOpen: (isSideBarOpen: boolean) => void;
}

export interface SideBarStyleProps {
  isSideBarOpen?: boolean;
}

export interface SubBarProps {
  isSubBarOpen: isSubBarOpen;
  setSubBarOpen: (isSideBarOpen: isSubBarOpen) => void;
}

export interface isSubBarOpen {
  isSubBarOpen: boolean;
  subBarTitle?: string;
  subLinks?: SubBarLinks[];
}

interface SubBarLinks {
  subTitleLink: string;
  subLink: string;
}

export interface SubBarStyleProps {
  isSubBarOpen: boolean;
}
