import { MaltAdditionsInput } from "./Types";
import { Range } from "./Types";

interface Specifications {
  param: Params;
  label: string;
  type: string;
  range: Range;
  placeholder: string;
}
export const specifications: Specifications[] = [
  {
    param: "ABV",
    label: "t_ABV",
    type: "number",
    range: { min: 0, warningMin: 2, warningMax: 16, max: 30 },
    placeholder: "enter a value",
  },
  {
    param: "IBU",
    label: "t_IBU",
    type: "number",
    range: { min: 0, warningMin: 10, warningMax: 16, max: 30 },
    placeholder: "enter a value",
  },
  {
    param: "FGinPlato",
    label: "t_fg",
    type: "number",
    range: { min: 0, warningMin: 1, warningMax: 7, max: 25 },
    placeholder: "enter a value",
  },
  {
    param: "DesiredCarbonationInGramsPerLiter",
    label: "t_carbonation",
    type: "number",
    range: { min: 0, warningMin: 3, warningMax: 7, max: 10 },
    placeholder: "enter a value",
  },
  {
    param: "colorInEBC",
    label: "t_color",
    type: "number",
    range: { min: 0, warningMin: 3, warningMax: 100, max: 500 },
    placeholder: "enter a value",
  },
];
export const maltAdditionInputFields: MaltAdditionsInput[] = [
  {
    param: "name",
    label: "t_malt_name",
    type: "string",
    range: { min: 2, warningMin: 4, warningMax: 20, max: 30 },
    placeholder: "enter a name",
  },
  {
    param: "percentageOfExtract",
    label: "t_percentage_extract",
    type: "number",
    range: { min: 0, warningMin: 0, warningMax: 100, max: 100 },
    placeholder: "enter a value",
  },
  {
    param: "defaultMoistureInPercentage",
    label: "t_moisture",
    type: "number",
    range: { min: 1, warningMin: 2, warningMax: 7, max: 10 },
    placeholder: "enter a value",
  },

  {
    param: " defaultColorInEBC",
    label: "t_color",
    type: "number",
    range: { min: 1, warningMin: 2, warningMax: 1500, max: 2000 },
    placeholder: "enter a value",
  },
];
