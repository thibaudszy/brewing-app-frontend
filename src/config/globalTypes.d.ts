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
