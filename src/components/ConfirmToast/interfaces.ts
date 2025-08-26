import React from "react";

export interface ConfirmToastI {
    show: boolean;
    children?: React.ReactNode;
    showCloseIcon?: boolean;
    customCancel?: string;
    customConfirm?: string;
    onConfirm: Function;
    message?: string;
    setShowConfirmToast: React.Dispatch<React.SetStateAction<boolean>>;
}
