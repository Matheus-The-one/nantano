import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nantano.ai";
  
  // Get current date for lastModified
  const currentDate = new Date();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // API Services Pages - High Priority for SEO
    {
      url: `${baseUrl}/services/investors-leads-api`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/services/nike-api`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/services/cookpad-api`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/services/doctors-api`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/services/ai-image-generation`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/background-removal`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/rotten-tomato`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}

