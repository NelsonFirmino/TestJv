import { User } from "@phosphor-icons/react";
import { UserIconI } from "./UserIcon.interface";
import theme from "../../../../globalStyle/theme";

const UserIcon = (props: UserIconI) => {
    return (
        <User
            alt={props.text}
            size={15}
            weight={props.text == "Nenhum" ? "bold" : "fill"}
            color={props.color ? props.color : theme.colors.jvrisAqua}
        />
    );
};

export default UserIcon;
