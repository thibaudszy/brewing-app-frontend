const emptyRecipe: FullRecipe = {
  id: 0,
  name: "",
  authorId: 0,
  imageURL: "",
  description: "",
  ABV: 0,
  IBU: 0,
  OGinPlato: 0,
  FGinPlato: 0,
  DesiredCarbonationInGramsPerLiter: 0,
  colorInEBC: 0,
  LiquorToGristRatio: 0,
  yeastStrain: "",
  PitchRateInGramsperLiter: 0,
  BoilDurationInMin: 0,
  FermentationTemperature: 0,
  comments: "",
  maltAdditions: [],
  hopAdditions: [],
  mashSteps: [],
};

export default emptyRecipe;
