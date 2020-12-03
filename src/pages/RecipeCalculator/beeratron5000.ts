const names1 = [
  "Big",
  "Funky",
  "Awesome",
  "Delicious",
  "Perky",
  "Amber",
  "Dark",
];
const names2 = [
  "bitter",
  "Lager",
  "Belgian",
  "German",
  "fizz",
  "buzz",
  "dancing buddy",
];

const randomData = {
  description:
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  imageURL: [
    "https://bit.ly/2Jkgow9",
    "https://bit.ly/3qtXgfZ",
    "https://bit.ly/3lr5x0k",
    "https://i.etsystatic.com/9077611/r/il/82a53d/557470837/il_794xN.557470837_3c8l.jpg",
    "https://images.ctfassets.net/sz2xpiwl6od9/6oRth8GKbZl6ewUqbT8YaR/dfdcbf9138584e8f62e8d52118ba958d/Vienna-Lager-2006_CBB_Issue40.jpg?w=500&h=250&fm=jpg&fit=fill",
    "https://bit.ly/3qj8X90",
  ],
  ABV: [2, 4, 5, 6, 8, 10],
  IBU: [23, 40, 50, 60],
  OGinPlato: [22, 10, 12, 15, 17],
  FGinPlato: [1, 3, 2, 2.5],
  DesiredCarbonationInGramsPerLiter: [5, 5.5, 6],
  colorInEBC: [10, 20, 30, 40],
  LiquorToGristRatio: [2.5, 2.8],
  yeastStrain: ["US-05", "Lager yeast", "Belgian Yeast"],
  PitchRateInGramsperLiter: [2, 3, 4],
  BoilDurationInMin: [55, 60, 70],
  FermentationTemperature: [10, 15, 20, 25],
  comments:
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
};
const chooseAtRandom = (array: any[]) => {
  return array[Math.round(Math.random() * (array.length - 1))];
};
export const beeratron5000 = (): any => {
  return {
    name: `${chooseAtRandom(names1)} ${chooseAtRandom(names2)}`,
    imageURL: `${chooseAtRandom(randomData.imageURL)}`,
    description: randomData.description,
    ABV: `${chooseAtRandom(randomData.ABV)}`,
    IBU: `${chooseAtRandom(randomData.IBU)}`,
    OGinPlato: `${chooseAtRandom(randomData.OGinPlato)}`,
    FGinPlato: `${chooseAtRandom(randomData.FGinPlato)}`,
    DesiredCarbonationInGramsPerLiter: `${chooseAtRandom(
      randomData.DesiredCarbonationInGramsPerLiter
    )}`,
    colorInEBC: `${chooseAtRandom(randomData.colorInEBC)}`,
    LiquorToGristRatio: `${chooseAtRandom(randomData.LiquorToGristRatio)}`,
    yeastStrain: `${chooseAtRandom(randomData.yeastStrain)}`,
    PitchRateInGramsperLiter: `${chooseAtRandom(
      randomData.PitchRateInGramsperLiter
    )}`,
    BoilDurationInMin: `${chooseAtRandom(randomData.BoilDurationInMin)}`,
    FermentationTemperature: `${chooseAtRandom(
      randomData.FermentationTemperature
    )}`,
    comments: randomData.comments,
    maltAdditions: randomMaltAddition(),
    mashSteps: [
      {
        stepNo: 1,
        temperature: 63,
        durationInMin: 40,
      },
      {
        stepNo: 2,
        temperature: 72,
        durationInMin: 15,
      },
    ],
    hopAdditions: randomHopAddition(),
  };
};
const randomMaltAddition = () => {
  let ratio = 0;
  let malts = [
    {
      name: "Lager malt",
      defaultExtract: 80,
      defaultMoistureInPercentage: 5,
      defaultColorInEBC: 3,
    },
    {
      name: "Vienna malt",
      defaultExtract: 80,
      defaultMoistureInPercentage: 5,
      defaultColorInEBC: 10,
    },
    {
      name: "Munich malt",
      defaultExtract: 76,
      defaultMoistureInPercentage: 4,
      defaultColorInEBC: 16,
    },
    {
      name: "Cara50",
      defaultExtract: 74,
      defaultMoistureInPercentage: 5,
      defaultColorInEBC: 50,
    },
    {
      name: "Chocolate malt",
      defaultExtract: 60,
      defaultMoistureInPercentage: 6,
      defaultColorInEBC: 600,
    },
  ];
  let maltAdditions = [];
  const max = Math.floor(Math.random() * malts.length - 1) + 2;
  for (let i = 0; i < max; i++) {
    let randomRatio = Math.round(Math.random() * (100 - ratio - 1)) + 1;
    const randomIndex = Math.floor(Math.random() * (malts.length - 1));

    maltAdditions.push({
      ...malts[randomIndex],
      percentageOfExtract: i === max - 1 ? 100 - ratio : randomRatio,
    });
    malts.splice(randomIndex, 1);

    ratio += randomRatio;
  }
  return maltAdditions;
};

const randomHopAddition = () => {
  let ratio = 0;
  let boilHops = [
    {
      name: "Chinook",
      alphaAcidContent: 10,

      timeOfAdditionInMinBeforeEndOfBoil: 10,
      isDryHop: false,
      dryHopTimingInPercentageAF: null,
      dryHopRateInGramsPerLitre: null,
    },
    {
      name: "Magnum",
      alphaAcidContent: 18,

      timeOfAdditionInMinBeforeEndOfBoil: 50,
      isDryHop: false,
      dryHopTimingInPercentageAF: null,
      dryHopRateInGramsPerLitre: null,
    },
    {
      name: "Citra",
      alphaAcidContent: 14,

      timeOfAdditionInMinBeforeEndOfBoil: 20,
      isDryHop: false,
      dryHopTimingInPercentageAF: null,
      dryHopRateInGramsPerLitre: null,
    },
    {
      name: "Hallertau Mittelfruh",
      alphaAcidContent: 4,

      timeOfAdditionInMinBeforeEndOfBoil: 30,
      isDryHop: false,
      dryHopTimingInPercentageAF: null,
      dryHopRateInGramsPerLitre: null,
    },
  ];
  let dryHops = [
    {
      name: "Citra",
      alphaAcidContent: 14,

      timeOfAdditionInMinBeforeEndOfBoil: null,
      isDryHop: true,
      dryHopTimingInPercentageAF: 80,
      dryHopRateInGramsPerLitre: 10,
    },
    {
      name: "Chinook",
      alphaAcidContent: null,

      timeOfAdditionInMinBeforeEndOfBoil: null,
      isDryHop: true,
      dryHopTimingInPercentageAF: 90,
      dryHopRateInGramsPerLitre: 5,
    },
    {
      name: "Cascade",
      alphaAcidContent: null,

      timeOfAdditionInMinBeforeEndOfBoil: null,
      isDryHop: true,
      dryHopTimingInPercentageAF: 90,
      dryHopRateInGramsPerLitre: 5,
    },
  ];
  let hopAdditions = [];
  const max = Math.floor(Math.random() * boilHops.length - 1) + 2;
  for (let i = 0; i < max; i++) {
    let randomRatio = Math.round(Math.random() * (100 - ratio - 1)) + 1;
    const randomIndex = Math.floor(Math.random() * (boilHops.length - 1));
    hopAdditions.push({
      ...boilHops[randomIndex],
      percentageAlphaAcidsFromAddition:
        i === max - 1 ? 100 - ratio : randomRatio,
    });
    boilHops.splice(randomIndex, 1);
    ratio += randomRatio;
  }
  const max2 = Math.floor(Math.random() * dryHops.length - 1) + 2;
  for (let i = 0; i < max2; i++) {
    const randomIndex = Math.floor(Math.random() * (dryHops.length - 1));
    hopAdditions.push({
      ...dryHops[randomIndex],
      percentageAlphaAcidsFromAddition: null,
    });
    dryHops.splice(randomIndex, 1);
  }
  return hopAdditions;
};
