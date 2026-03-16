export interface GeoData {
  ip: string;
  city: string | null;
  region: string | null;
  country: string | null;
  countryCode: string | null;
  latitude: number | null;
  longitude: number | null;
}

const EMPTY_GEO: GeoData = { ip: "unknown", city: null, region: null, country: null, countryCode: null, latitude: null, longitude: null };

const isLocal = (ip: string) => ip === "unknown" || ip === "127.0.0.1" || ip === "::1";

/** Try ipapi.co */
const tryIpapi = async (ip: string): Promise<GeoData> => {
  const url = isLocal(ip) ? "https://ipapi.co/json/" : `https://ipapi.co/${ip}/json/`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`ipapi.co ${res.status}`);
  const d = (await res.json()) as Record<string, unknown>;
  return {
    ip: (d.ip as string) ?? ip,
    city: (d.city as string) ?? null,
    region: (d.region as string) ?? null,
    country: (d.country_name as string) ?? null,
    countryCode: (d.country_code as string) ?? null,
    latitude: (d.latitude as number) ?? null,
    longitude: (d.longitude as number) ?? null,
  };
};

/** Try ip-api.com */
const tryIpApi = async (ip: string): Promise<GeoData> => {
  const query = isLocal(ip) ? "" : `/${ip}`;
  const res = await fetch(`http://ip-api.com/json${query}?fields=query,city,regionName,country,countryCode,lat,lon`);
  if (!res.ok) throw new Error(`ip-api.com ${res.status}`);
  const d = (await res.json()) as Record<string, unknown>;
  if (d.status === "fail") throw new Error("ip-api.com failed");
  return {
    ip: (d.query as string) ?? ip,
    city: (d.city as string) ?? null,
    region: (d.regionName as string) ?? null,
    country: (d.country as string) ?? null,
    countryCode: (d.countryCode as string) ?? null,
    latitude: (d.lat as number) ?? null,
    longitude: (d.lon as number) ?? null,
  };
};

/** Try ipwho.is */
const tryIpwhois = async (ip: string): Promise<GeoData> => {
  const query = isLocal(ip) ? "" : `/${ip}`;
  const res = await fetch(`https://ipwho.is${query}`);
  if (!res.ok) throw new Error(`ipwho.is ${res.status}`);
  const d = (await res.json()) as Record<string, unknown>;
  if (d.success === false) throw new Error("ipwho.is failed");
  return {
    ip: (d.ip as string) ?? ip,
    city: (d.city as string) ?? null,
    region: (d.region as string) ?? null,
    country: (d.country as string) ?? null,
    countryCode: (d.country_code as string) ?? null,
    latitude: (d.latitude as number) ?? null,
    longitude: (d.longitude as number) ?? null,
  };
};

const providers = [tryIpapi, tryIpApi, tryIpwhois];

const TIMEOUT_MS = 3000;

/** Race a promise against a timeout */
const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> =>
  Promise.race([
    promise,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);

/** Lookup geo data with cascading fallbacks. Each provider gets 3s before moving to the next. Returns empty geo on total failure. */
export const lookupGeo = async (ip: string): Promise<GeoData> => {
  for (const provider of providers) {
    try {
      return await withTimeout(provider(ip), TIMEOUT_MS);
    } catch {
      // try next
    }
  }
  return { ...EMPTY_GEO, ip };
};
