enum AvailableLanguages {
  "En-GB",
  "Fr-FR",
}
type Language = keyof typeof AvailableLanguages;

enum Genders {
  "male",
  "female",
  "other",
}
type Gender = keyof typeof Genders;

interface TranslationItem {
  [language: string]: string;
}
interface TranslationObject {
  [name: string]: TranslationItem;
}
interface Action {
  type: string;
  payload: any;
}
interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  language: "En-GB" | "Fr-FR";
  gender: "male" | "female" | "other";
}
interface MaltAddition {
  id: number;
  recipeId: number;
  name: string;
  percentageOfExtract: number;
  defaultExtract: number;
  defaultMoistureInPercentage: number;
  defaultColorInEBC: number;
}
interface MashStep {
  id: number;
  recipeId: number;
  stepNo: number;
  temperature: number;
  durationInMin: number;
}
interface HopAddition {
  id: number;
  recipeId: number;
  name: string;
  alphaAcidContent: number;
  percentageAlphaAcidsFromAddition?: number | null;
  timeOfAdditionInMinBeforeEndOfBoil?: number | null;
  isDryHop: boolean;
  dryHopTimingInPercentageAF?: number | null;
  dryHopRateInGramsPerLitre: number;
}

interface Recipe {
  id: number;
  name: string;
  authorId: number;
  imageURL: string;
  description: string;
  ABV: number;
  IBU: number;
  OGinPlato: number;
  FGinPlato: number;
  DesiredCarbonationInGramsPerLiter: number;
  colorInEBC: number;
  LiquorToGristRatio: number;
  yeastStrain: string;
  PitchRateInGramsperLiter: number;
  BoilDurationInMin: number;
  FermentationTemperature: number;
  comments: string;
}

interface FullRecipe extends Recipe {
  maltAdditions: MaltAddition[];
  hopAdditions: HopAddition[];
  mashSteps: MashSteps[];
  HopAdditions: HopAddition[];
}
