export interface ModalsContextI {
    openModal: (modalID: string) => void;
    closeModal: () => void;

    resetModal: () => void;
    currModal: string;
    isModalOpen: (modalID: string) => boolean;
    shouldReset: boolean;
    setShouldReset: (value: boolean) => void;
}
