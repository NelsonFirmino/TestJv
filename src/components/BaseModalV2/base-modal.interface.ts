import { ReactNode } from "react";

export interface BaseModalParams {
  title: string;
  children: ReactNode;
  keyStateOpenModal: string | false;
  setKeyStateOpenModal: (keyOpenModal: string | false) => void;
  keyString: string | false;
  isSchedule?: boolean;
  isSelect?: boolean;
}
