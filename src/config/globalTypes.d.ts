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
interface user {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  language: "En-GB" | "Fr-FR";
  gender: "male" | "female" | "other";
}
