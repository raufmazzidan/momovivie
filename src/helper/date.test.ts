import { describe, expect, test } from "vitest";
import { dateFormat, dateFormatFromNow } from "./date";

describe("date", () => {
  test("dateFormatFromNow - should return '-' when date is falsy", () => {
    expect(dateFormatFromNow("")).toBe("-");
  });

  test("dateFormatFromNow - should return a relative time when a valid date is provided", () => {
    const mockDate = new Date();
    mockDate.setDate(mockDate.getDate() - 2);
    const formattedDate = dateFormatFromNow(mockDate.toString());
    expect(formattedDate).toMatch(/ago$/);
  });

  test("dateFormat - should return emptyMessage when date is falsy", () => {
    const emptyMessage = "-";
    expect(dateFormat({ date: null, format: "dd MMMM yyyy" })).toBe(
      emptyMessage
    );
    expect(dateFormat({ date: undefined, format: "dd MMMM yyyy" })).toBe(
      emptyMessage
    );
    expect(dateFormat({ date: "", format: "dd MMMM yyyy" })).toBe(emptyMessage);
  });

  test("dateFormat - should return emptyMessage if invalid date is provided", () => {
    const invalidDate = "invalid-date-string";
    const emptyMessage = "-";
    const result = dateFormat({ date: invalidDate, format: "dd MMMM yyyy" });
    expect(result).toBe(emptyMessage);
  });

  test("dateFormat - should format date according to the pattern", () => {
    const validDate = "2025-03-31T00:00:00Z";
    const pattern = "dd MMMM yyyy";

    const formattedDate = dateFormat({
      date: validDate,
      format: pattern,
    });

    expect(formattedDate).toBe("31 March 2025");
  });
});
