import { getSiteContent } from "@/lib/queries/site-content";
import {
  CONTENT_KEYS,
  DEFAULT_CITIES,
  type CityItem,
} from "@/lib/site-defaults";
import { CitiesContentClient } from "./client";

export default async function CitiesContentPage() {
  const cities = await getSiteContent<CityItem[]>(
    CONTENT_KEYS.CITIES,
    DEFAULT_CITIES
  );

  return <CitiesContentClient cities={cities} />;
}
