import React from "react";
import s from "./ConfirmToast.module.scss";

export interface WrapperI {
    children: any;
    clickOutOfModal?: (e: React.MouseEvent) => void;
}

export function Wrapper(props: WrapperI) {
    const { children, clickOutOfModal } = props;

    return (
        <div data-out={true} onClick={clickOutOfModal} className={s.modal}>
            {children}
        </div>
    );
}
