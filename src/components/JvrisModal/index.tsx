import Modal from "react-modal";
import React from "react";
import theme from "../../globalStyle/theme";

interface JvrisModalI {
  modalIsOpen: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
  customStyles?: React.CSSProperties;
}

export const JvrisModal = (props: JvrisModalI) => {
  const ModalStyle: Modal.Styles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.4)",
      zIndex: 1000,
    },
    content: {
      //width: "fit-content",
      //height: "fit-content",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.45)",
      border: "none",
      padding: "0px",
      overflow: "visible",
      maxWidth: "100%",
      ...props.customStyles,
    },
  };
  return (
    <Modal
      shouldCloseOnOverlayClick
      onRequestClose={() => props.closeModal()}
      isOpen={props.modalIsOpen}
      style={ModalStyle}
    >
      {props.children}
    </Modal>
  );
};

export const JvrisModal2 = (props: JvrisModalI) => {
  const ModalStyle: Modal.Styles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.4)",
      zIndex: 1000,
    },
    content: {
        display: 'block',
        position: 'absolute',
        right: '0px',
        top: 'calc(100% + 4px)',
        left: 'auto',
        minWidth: '160px',
        borderRadius: '5px',
        boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.2)',
        listStyle: 'none',
        backgroundColor: theme.colors.white,
        overflow: 'hidden',
        zIndex: 1,
      ...props.customStyles,
    },
  };
  return (
    <Modal
      shouldCloseOnOverlayClick
      onRequestClose={() => props.closeModal()}
      isOpen={props.modalIsOpen}
      style={ModalStyle}
    >
      {props.children}
    </Modal>
  );
};

