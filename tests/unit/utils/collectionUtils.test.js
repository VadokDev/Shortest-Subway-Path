const { pushValueIfNotExists, getValSwitch } = require("../../../src/utils/collectionUtils");

describe("Collection Utils test suite", () => {
  it("should not push the element if it not exists in the array", () => {
    const array = [1, 2, 3];
    const expectedArray = [1, 2, 3];

    pushValueIfNotExists(array, 3);
    expect(array).toStrictEqual(expectedArray);
  });

  it("should push the element if it not exists in the array", () => {
    const array = [1, 2, 3];
    const expectedArray = [1, 2, 3, 4];

    pushValueIfNotExists(array, 4);
    expect(array).toStrictEqual(expectedArray);
  });

  it("should return the first value when the booleanSelector is true", () => {
    const key1 = "buda";
    const key2 = "b00da";
    const booleanSelector = false;

    const expectedKey = "b00da";
    const result = getValSwitch(booleanSelector, key1, key2);

    expect(result).toBe(expectedKey);
  });

  it("should return the first value when the booleanSelector is false", () => {
    const key1 = "buda";
    const key2 = "b00da";
    const booleanSelector = true;

    const expectedKey = "buda";
    const result = getValSwitch(booleanSelector, key1, key2);

    expect(result).toBe(expectedKey);
  });
});
