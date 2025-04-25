import { describe, test, expect, vi, beforeEach } from "vitest";
import fetcher, { FetcherConfig, token } from "./fetcher";

describe("fetcher function", () => {
  const mockUrl = "https://api/example.com/data";

  beforeEach(() => {});

  test("should return data when response is successful", async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ data: "some data" }),
    };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockResponse));

    const config: FetcherConfig = { url: mockUrl };
    const data = await fetcher(config);

    expect(data).toEqual({ data: "some data" });
    expect(fetch).toHaveBeenCalledWith(mockUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  });

  test("should throw error when response is not ok", async () => {
    // Mock an error response from fetch
    const mockResponse = { ok: false, statusText: "Not Found" };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockResponse));

    const config: FetcherConfig = { url: mockUrl };

    await expect(fetcher(config)).rejects.toThrow(
      "Error fetching data: Not Found"
    );
  });

  test("should handle fetch failure", async () => {
    // Mock fetch throwing an error
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network Error"))
    );

    const config: FetcherConfig = { url: mockUrl };

    await expect(fetcher(config)).rejects.toThrow("Network Error");
  });
});
