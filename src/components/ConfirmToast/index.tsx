import React, { useEffect, useState } from "react";
import classnames from "classnames-creator";
import s from "./ConfirmToast.module.scss";
import { X } from "phosphor-react";
import { ConfirmToastI } from "./interfaces";
import { Wrapper } from "./styled";
import { XCircle, XSquare } from "@phosphor-icons/react";

export default function ConfirmToast(props: ConfirmToastI) {
    const {
        children,
        showCloseIcon,
        customCancel,
        customConfirm,
        onConfirm,
        message,
        show,
        setShowConfirmToast
    } = props;

    useEffect(() => {
        setShowConfirmToast(show);
    }, [show]);

    const closeModal = (e: React.MouseEvent): void => {
        e.stopPropagation();
        setShowConfirmToast(false);
    };

    const clickOutOfModal = (e: React.MouseEvent): void => {
        const target = e.target as HTMLElement;
        if (target.getAttribute("data-out")) {
            closeModal(e);
        }
    };

    const classes = classnames(s.container, {
        [s["modal-content"]]: true
    });

    return (
        <div className={classnames(s[`std_theme`])}>
            {show && (
                <Wrapper clickOutOfModal={clickOutOfModal}>
                    <div className={classes}>
                        <div className={s.title_wrapper}>
                            <div className={s.title}>{message}</div>
                            {showCloseIcon && (
                                <XSquare
                                    weight="fill"
                                    aria-label="close modal"
                                    className={s.close}
                                    onClick={(e) => {
                                        closeModal(e);
                                    }}
                                />
                            )}
                        </div>

                        <div className={s.buttons_container}>
                            <button
                                className={`${s.button} ${s.button_yes}`}
                                onClick={(e) => {
                                    onConfirm();
                                    closeModal(e);
                                }}
                            >
                                {customConfirm}
                            </button>
                            <button
                                className={`${s.button} ${s.button_no}`}
                                onClick={(e) => {
                                    closeModal(e);
                                }}
                            >
                                {customCancel}
                            </button>
                        </div>
                    </div>
                </Wrapper>
            )}
            {children}
        </div>
    );
}
