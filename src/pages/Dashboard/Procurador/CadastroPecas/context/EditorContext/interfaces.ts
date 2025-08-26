export interface EditorContextI {
    text: string;
    loadingDocx: boolean;
    loadDocx: (file: any) => void;
    updateText: (text: string) => void;
}
