import { useRef } from "react";

export const InputLoader = ({
    OnExecute,
    id
}: {
    OnExecute: any;
    id: string;
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        OnExecute(event);
        if (inputRef.current) {
            inputRef.current.value = ""; // Reset input value
        }
    };

    return (
        <input
            ref={inputRef}
            multiple
            onChange={handleInputChange}
            id={id}
            style={{ display: "none", height: 0, width: 0 }}
            type="file"
        />
    );
};
