
import {excelToJSON } from "../excelManager";
import assert from "node:assert";

describe("Excel manager happy path", () => {
  test("should convert an Excel file into JSON", async () => {
    const jsonResult = await excelToJSON("./src/modules/__tests__/items.xlsx");

    const expectedJson = [
      { name: "Shawarma Sisig", price: 79, availableUnits: 40},
      { name: "Sweet Tooth", price: 15, availableUnits: 35 },
      { name: "Drinks", price: 35, availableUnits: 50 },
    ];

    const rows = jsonResult;

    const res = rows;

    assert.deepStrictEqual(
      res,
      expectedJson,
      "Conversion result should match expected JSON",
    );

 
  });
});
