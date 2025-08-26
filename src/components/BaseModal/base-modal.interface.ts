import { ReactNode } from "react";

export interface BaseModalParams {
    title: string;
    children: ReactNode;
    isOpenModal: boolean;
    setOpenModal: (isOpenModal: boolean) => void;
    isSchedule?: boolean;
    isSelect?: boolean;
    onClose?: () => void; // Adicionando a função onClose
    containerStyle?: React.CSSProperties; // Adicionando a propriedade containerStyle
}
