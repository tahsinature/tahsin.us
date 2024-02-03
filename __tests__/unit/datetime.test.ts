import { sortArrayByDate } from "@/lib/datetime";
import { describe, expect, it } from "vitest";

describe("sortArrayByDate", () => {
  it("should work for empty array", async () => {
    const reuslt = sortArrayByDate([], "date");
    expect(reuslt).toEqual([]);
  });

  it("should work for array with one element", async () => {
    const date = "2021-08";
    const result = sortArrayByDate([{ date }], "date");
    expect(result).toEqual([{ date }]);
  });

  it("should sort the items by start date", async () => {
    const date1 = "2021-08";
    const date2 = "2019-09";
    const date3 = "2024-10";
    const result = sortArrayByDate([{ Start: date1 }, { Start: date2 }, { Start: date3 }], "Start");
    expect(result).toEqual([{ Start: date3 }, { Start: date1 }, { Start: date2 }]);
  });
});
