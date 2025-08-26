import { MagnifyingGlass } from "phosphor-react";
import { JvrisSearchBarI } from "./SearchBar.interface";
import * as S from "./styled";
import { useState } from "react";

export const SearchBar = (props: JvrisSearchBarI) => {
    const [isInFocus, setIsInFocus] = useState(false);

    return (
        <S.SearchBarContainer isInFocus={isInFocus}>
            <MagnifyingGlass
                style={{
                    marginLeft: "10px"
                }}
                weight={props.value ? "fill" : "bold"}
                size={'20px'}
            />
            <S.SearchBarInput
                onFocus={() => setIsInFocus(true)}
                onBlur={() => setIsInFocus(false)}
                value={props.value}
                placeholder="Pesquisar"
                onChange={(e) => props.onChange(e.target.value)}
            />
        </S.SearchBarContainer>
    );
};
