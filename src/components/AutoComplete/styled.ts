import styled from "styled-components";

export const AutocompleteWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const Input = styled.input``;

export const SuggestionsList = styled.ul`
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
`;

export const Suggestion = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;

  &.suggestion-active {
    background-color: #d4d4d4;
  }

  &:hover {
    background-color: #e9e9e9;
  }
`;

export const NoSuggestions = styled.div`
  color: #999;
  padding: 10px 20px;
`;
