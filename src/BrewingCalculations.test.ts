import {
  calculateOG,
  gristInKg,
  mashWaterVolumeInL,
  PGtoPlato,
  platoToPG,
} from "./BrewingCalculations";

describe("#converting plato to PG", () => {
  describe("when given number values", () => {
    test("should return the sum of them", () => {
      expect(platoToPG(4)).toEqual(16);
      expect(platoToPG(3)).toEqual(12);
    });
  });
  describe("when given invalid or wrong type values", () => {
    test("should not return a Number", () => {
      expect(platoToPG(-1)).toEqual(0);
      //@ts-ignore
      expect(platoToPG("-1")).toEqual(0);
    });
  });
});
describe("#converting PG to Plato", () => {
  describe("when given number values", () => {
    test("should return the sum of them", () => {
      expect(PGtoPlato(4)).toEqual(1);
      expect(PGtoPlato(12)).toEqual(3);
    });
  });
  describe("when given invalid or wrong type values", () => {
    test("should return 0", () => {
      expect(PGtoPlato(-1)).toEqual(0);
      //@ts-ignore
      expect(PGtoPlato("-1")).toEqual(0);
    });
  });
});

describe("#calculating the correct OG of a beer", () => {
  describe("when given number values", () => {
    test("should return the sum of them", () => {
      expect(calculateOG(9, 4.5)).toEqual(21.9);
      expect(calculateOG(5, 2)).toEqual(11.7);
    });
  });
});

describe("#calculating the correct amount of mash liquor in l", () => {
  describe("when given number values", () => {
    test("should return the sum of them", () => {
      expect(mashWaterVolumeInL(5, 3)).toEqual(15);
      expect(mashWaterVolumeInL(200, 2.8)).toEqual(560);
      expect(mashWaterVolumeInL(600, 4)).toEqual(2400);
    });
  });
});

describe("#calculating the correct amount of grist in Kg", () => {
  test("should return the sum of them", () => {
    expect(
      gristInKg(22, 100, [
        {
          id: 4,
          recipeId: 2,
          name: "Vienna malt ",
          percentageOfExtract: 95,
          defaultExtract: 70,
          defaultMoistureInPercentage: 5,
          defaultColorInEBC: 6,
        },
        {
          id: 5,
          recipeId: 2,
          name: "Carafa 2",
          percentageOfExtract: 5,
          defaultExtract: 65,
          defaultMoistureInPercentage: 3.8,
          defaultColorInEBC: 1150,
        },
      ])
    ).toEqual(27.37);
    expect(
      parseFloat(
        gristInKg(16, 30, [
          {
            id: 1,
            recipeId: 1,
            name: "Vienna malt",
            percentageOfExtract: 80,
            defaultExtract: 70,
            defaultMoistureInPercentage: 5,
            defaultColorInEBC: 6,
          },
          {
            id: 2,
            recipeId: 1,
            name: "Munich malt",
            percentageOfExtract: 15,
            defaultExtract: 80,
            defaultMoistureInPercentage: 4,
            defaultColorInEBC: 15,
          },
          {
            id: 3,
            recipeId: 1,
            name: "Cara50",
            percentageOfExtract: 7.5,
            defaultExtract: 71,
            defaultMoistureInPercentage: 5,
            defaultColorInEBC: 50,
          },
        ]).toFixed(2)
      )
    ).toEqual(6.11);
  });
});
