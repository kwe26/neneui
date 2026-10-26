export interface SeoProps {
    // Basic SEO
    title?: string;
    desc?: string;
    image?: string;
    canonical?: string;
    keywords?: string[];

    // Robots / indexing
    robots?: string;
    noindex?: boolean;
    nofollow?: boolean;

    // Open Graph (Facebook, Discord, WhatsApp, etc.)
    type?: "website" | "article" | "profile" | "product";
    siteName?: string;
    locale?: string;
    imageAlt?: string;
    imageWidth?: number;
    imageHeight?: number;

    // Twitter / X cards
    twitterCard?: "summary" | "summary_large_image";
    twitterSite?: string;
    twitterCreator?: string;

    // Additional metadata
    author?: string;
    themeColor?: string;
    publishedTime?: string;
    modifiedTime?: string;

    // Structured data
    jsonLd?: Record<string, unknown>;
}

export function Seo({
    title = "NeneUI",
    desc = "NeneUI",
    image = "",
    canonical,
    keywords = [],
    robots,
    noindex = false,
    nofollow = false,
    type = "website",
    siteName = "NeneUI",
    locale = "en_US",
    imageAlt,
    imageWidth,
    imageHeight,
    twitterCard = "summary_large_image",
    twitterSite,
    twitterCreator,
    author,
    themeColor,
    publishedTime,
    modifiedTime,
    jsonLd,
}: SeoProps) {
    return {
        title,
        desc,
        image,
        canonical,
        keywords,
        robots: robots ?? [
            noindex ? "noindex" : "index",
            nofollow ? "nofollow" : "follow",
        ].join(", "),
        type,
        siteName,
        locale,
        imageAlt,
        imageWidth,
        imageHeight,
        twitterCard,
        twitterSite,
        twitterCreator,
        author,
        themeColor,
        publishedTime,
        modifiedTime,
        jsonLd,
    };
}