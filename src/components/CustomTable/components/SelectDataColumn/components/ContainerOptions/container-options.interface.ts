import { ReactNode } from "react";

export interface ContainerOptionsProps {
  children: ReactNode;
  isOpen: boolean;
  setOpenModal?: (isOpen: boolean) => void;
  data: any;
  columns: Colum[];
  onClick?: () => void;
}

interface Colum {
  name: string;
  key: string;
}
