import { describe, test, expect, beforeEach } from "bun:test";
import { Cache } from "@server/lib/cache";

describe("Cache", () => {
  let cache: Cache;

  beforeEach(() => {
    cache = new Cache();
  });

  test("get returns null for missing key", async () => {
    expect(await cache.get("nope")).toBeNull();
  });

  test("set and get a value", async () => {
    await cache.set("key", "value");
    expect(await cache.get("key")).toBe("value");
  });

  test("set and get an object", async () => {
    const obj = { foo: "bar", n: 42 };
    await cache.set("obj", obj);
    expect(await cache.get("obj")).toEqual(obj);
  });

  test("has returns false for missing, true for existing", async () => {
    expect(await cache.has("x")).toBe(false);
    await cache.set("x", 1);
    expect(await cache.has("x")).toBe(true);
  });

  test("del removes a key", async () => {
    await cache.set("k", "v");
    await cache.del("k");
    expect(await cache.get("k")).toBeNull();
  });

  test("clear removes all keys", async () => {
    await cache.set("a", 1);
    await cache.set("b", 2);
    await cache.clear();
    expect(await cache.get("a")).toBeNull();
    expect(await cache.get("b")).toBeNull();
  });
});
