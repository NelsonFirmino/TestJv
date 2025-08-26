import { AutoCompleteContent, Suggestion } from "./autocomplete.interface";
import * as S from "./styled";
import { useState, useEffect } from "react";

export const Autocomplete = ({ suggestions }: AutoCompleteContent) => {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>(
    []
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState<Suggestion>();

  useEffect(() => {
    setFilteredSuggestions(suggestions);
  }, [suggestions]);

  const onChange = (e: any) => {
    const userInput = e.currentTarget.value;

    // Filter our suggestions
    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.label.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setActiveSuggestion(0);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setUserInput(e.currentTarget.value);
  };

  const onClick = (e: any) => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
  };

  const onKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      // User pressed the enter key
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion]);
    } else if (e.keyCode === 38) {
      // User pressed the up arrow
      if (activeSuggestion === 0) {
        return;
      }

      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode === 40) {
      // User pressed the down arrow
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }

            return (
              <li
                className={className}
                key={suggestion.value}
                onClick={onClick}
              >
                {suggestion.label}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className="no-suggestions">
          <em>No suggestions available.</em>
        </div>
      );
    }
  }

  return (
    <S.AutocompleteWrapper className="autocomplete">
      <S.Input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput?.label}
      />
      {suggestionsListComponent}
    </S.AutocompleteWrapper>
  );
};
