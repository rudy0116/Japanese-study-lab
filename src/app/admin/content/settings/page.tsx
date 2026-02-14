import { getSiteContent } from "@/lib/queries/site-content";
import {
  CONTENT_KEYS,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_FLOATING_BENEFITS,
  type SiteSettings,
  type FloatingBenefit,
} from "@/lib/site-defaults";
import { SettingsContentClient } from "./client";

export default async function SettingsContentPage() {
  const [siteSettings, floatingBenefits] = await Promise.all([
    getSiteContent<SiteSettings>(CONTENT_KEYS.SITE_SETTINGS, DEFAULT_SITE_SETTINGS),
    getSiteContent<FloatingBenefit[]>(CONTENT_KEYS.FLOATING_BENEFITS, DEFAULT_FLOATING_BENEFITS),
  ]);

  return (
    <SettingsContentClient
      siteSettings={siteSettings}
      floatingBenefits={floatingBenefits}
    />
  );
}
