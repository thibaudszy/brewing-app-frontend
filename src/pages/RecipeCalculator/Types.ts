export interface AdditionsInput {
  param: Params;
  label: string;
  type: string;
  range: Range;
  placeholder: string;
}

export interface Range {
  min: number;
  warningMin: number;
  warningMax: number;
  max: number;
}
