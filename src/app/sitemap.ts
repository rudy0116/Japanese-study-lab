import type { MetadataRoute } from "next";
import { getAllPublishedSchoolsForSitemap } from "@/lib/queries/schools";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/zh-CN`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/zh-CN/schools`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/zh-CN/schools/compare`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/zh-CN/calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/zh-CN/consultation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/zh-CN/process`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/zh-CN/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const publishedSchools = await getAllPublishedSchoolsForSitemap();

  const schoolPages: MetadataRoute.Sitemap = publishedSchools.map((school) => ({
    url: `${baseUrl}/zh-CN/schools/${school.slug}`,
    lastModified: school.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...schoolPages];
}
