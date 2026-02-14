import { getSiteContent } from "@/lib/queries/site-content";
import {
  CONTENT_KEYS,
  DEFAULT_FEATURE_TAGS,
  DEFAULT_STATS,
  DEFAULT_STEPS,
  DEFAULT_BONUSES,
  type FeatureTag,
  type StatItem,
  type StepItem,
  type BonusItem,
} from "@/lib/site-defaults";
import { HomepageContentClient } from "./client";

export default async function HomepageContentPage() {
  const [featureTags, stats, steps, bonuses] = await Promise.all([
    getSiteContent<FeatureTag[]>(CONTENT_KEYS.FEATURE_TAGS, DEFAULT_FEATURE_TAGS),
    getSiteContent<StatItem[]>(CONTENT_KEYS.STATS, DEFAULT_STATS),
    getSiteContent<StepItem[]>(CONTENT_KEYS.STEPS, DEFAULT_STEPS),
    getSiteContent<BonusItem[]>(CONTENT_KEYS.BONUSES, DEFAULT_BONUSES),
  ]);

  return (
    <HomepageContentClient
      featureTags={featureTags}
      stats={stats}
      steps={steps}
      bonuses={bonuses}
    />
  );
}
