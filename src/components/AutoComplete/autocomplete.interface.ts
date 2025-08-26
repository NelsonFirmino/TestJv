export interface AutoCompleteContent {
  suggestions: Suggestion[];
}

export interface Suggestion {
  value: string;
  label: string;
}
