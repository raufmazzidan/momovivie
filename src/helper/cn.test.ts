import cn from "./cn";

describe("cn utility", () => {
  test("merges tailwind classes properly", () => {
    const result = cn("p-2", "p-4", "bg-red-500");
    expect(result).toBe("p-4 bg-red-500");
  });

  test("handles falsy values correctly", () => {
    const result = cn("text-sm", null, undefined, false, "", "text-lg");
    expect(result).toBe("text-lg");
  });

  test("accepts conditional classes from clsx", () => {
    const isActive = true;
    const result = cn("text-sm", {
      "text-bold": isActive,
      "text-thin": !isActive,
    });
    expect(result).toBe("text-sm text-bold");
  });

  test("does not duplicate class names", () => {
    const result = cn("block", "block", "bg-red-500");
    expect(result).toBe("block bg-red-500");
  });
});
