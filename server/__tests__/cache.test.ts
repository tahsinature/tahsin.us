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
    expect(await cache.get<string>("key")).toBe("value");
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

  test("get returns null after TTL expires", async () => {
    await cache.set("short", "data", 1); // 1 second TTL
    expect(await cache.get<string>("short")).toBe("data");
    await new Promise((r) => setTimeout(r, 1100));
    expect(await cache.get("short")).toBeNull();
  });

  test("has returns false after TTL expires", async () => {
    await cache.set("temp", "val", 1);
    expect(await cache.has("temp")).toBe(true);
    await new Promise((r) => setTimeout(r, 1100));
    expect(await cache.has("temp")).toBe(false);
  });

  test("get returns value before TTL expires", async () => {
    await cache.set("fresh", "alive", 10);
    expect(await cache.get<string>("fresh")).toBe("alive");
  });

  test("overwriting a key resets TTL", async () => {
    await cache.set("k", "v1", 1);
    await new Promise((r) => setTimeout(r, 800));
    await cache.set("k", "v2", 10); // reset with longer TTL
    await new Promise((r) => setTimeout(r, 500));
    expect(await cache.get<string>("k")).toBe("v2"); // still alive
  });

  test("default TTL is used when none provided", async () => {
    await cache.set("default", "val");
    expect(await cache.get<string>("default")).toBe("val");
  });
});
