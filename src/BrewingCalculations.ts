export const DEFAULT_BREWING_EFFICIENCY = 0.85;
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
