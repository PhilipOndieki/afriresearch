import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

type SeoProps = {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
};

export function buildMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
  canonical,
}: SeoProps = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: canonical ? { canonical } : undefined,
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: pageTitle,
      description,
      url: canonical ?? siteConfig.url,
      siteName: siteConfig.name,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: pageTitle }],
      type: 'website',
      locale: 'en_KE',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [imageUrl],
    },
  };
}
