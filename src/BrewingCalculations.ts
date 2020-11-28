export const DEFAULT_BREWING_EFFICIENCY = 0.85;

export function hopUtilisation(
  timeOfAdditionBeforeEndOfBoilInMin: number
): number {
  // temporary solution. Based on the regression of the hop utilisation in a wort of 1050 gravity

  return -0.0663 + 0.0703 * Math.log(timeOfAdditionBeforeEndOfBoilInMin);
}

export function IsoAlphaAcidRequiredForBrewLengthInGrams(
  targetIBU: number,
  brewLengthInL: number
) {
  return (targetIBU / Math.pow(10, 6)) * brewLengthInL;
}
export function alphaAcidsRequiredForAdditionInGrams(
  targetBitterness: number,
  percentageBitternessFromThatAdditon: number,
  timeOfAdditionBeforeEndOfBoilInMin: number,
  brewLengthInL: number
): number {
  const answer =
    ((IsoAlphaAcidRequiredForBrewLengthInGrams(
      targetBitterness,
      brewLengthInL
    ) /
      hopUtilisation(timeOfAdditionBeforeEndOfBoilInMin)) *
      percentageBitternessFromThatAdditon) /
    100;

  return answer;
}
export function hopAdditionInGrams(
  targetBitterness: number,
  percentageBitternessFromThatAdditon: number,
  timeOfAdditionBeforeEndOfBoilInMin: number,
  hopAlphaAcidContent: number,
  brewLengthInL: number
): number {
  return (
    ((alphaAcidsRequiredForAdditionInGrams(
      targetBitterness,
      percentageBitternessFromThatAdditon,
      timeOfAdditionBeforeEndOfBoilInMin,
      brewLengthInL
    ) *
      100) /
      hopAlphaAcidContent) *
    1000
  );
}

export const calculateWortDensityInGramsperMl = (
  DensityInPlato: number
): number => {
  return (1000 + DensityInPlato / 4) / 1000;
};
export function convertPlatoToExtractPerLiter(valueInPlato: number): number {
  return valueInPlato * calculateWortDensityInGramsperMl(valueInPlato) * 10;
}
export const calculateMaltQuantity = (
  OGinPlato: number,
  percentageOfExtract: number,
  defaultMoistureInPercentage: number,
  brewLengthInL: number
): number => {
  const quantityInKG =
    (((convertPlatoToExtractPerLiter(OGinPlato) * percentageOfExtract) /
      100 /
      (1 - defaultMoistureInPercentage / 100)) *
      brewLengthInL) /
    DEFAULT_BREWING_EFFICIENCY /
    1000;

  return parseFloat(quantityInKG.toFixed(2));
};
