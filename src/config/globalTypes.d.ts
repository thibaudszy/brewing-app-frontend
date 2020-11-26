enum AvailableLanguages {
  "En-GB",
  "Fr-FR",
}
type Language = keyof typeof AvailableLanguages;

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
