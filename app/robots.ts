import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://nantano.ai";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Special rules for Google bot to prioritize API pages
      {
        userAgent: "Googlebot",
        allow: [
          "/",
          "/services/",
          "/services/investors-leads-api",
          "/services/nike-api",
          "/services/cookpad-api",
          "/services/doctors-api",
        ],
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
