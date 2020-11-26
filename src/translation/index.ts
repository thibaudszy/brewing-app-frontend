import translation from "../components/Navbar/translation";

export default function getTranslation(
  translationArray: TranslationObject,
  stringToDisplay: string,
  language: Language
) {
  const translatedString: string = translationArray[stringToDisplay][language];
  if (translatedString) {
    return translatedString;
  }
  return translationArray[stringToDisplay]["En-GB"];
}
