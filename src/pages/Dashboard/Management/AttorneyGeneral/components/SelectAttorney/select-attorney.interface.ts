export interface SelectAttorneyParams {
  setAttorney: (attorney: Attorney) => void;
  attorney: Attorney;
}

interface Attorney {
  label: string;
  id: number;
}
