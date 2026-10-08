import { site } from "@/content/site";
import { media } from "@/content/media";

/**
 * Restaurant structured data built only from verified, visible facts:
 * name, address, telephone, email, opening hours, cuisine, booking.
 * No ratings, no price range claims. Geo coordinates come from the
 * restaurant's own published data on itoya.ch.
 */
export function RestaurantJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.businessName,
    url: site.url,
    image: new URL(media.share.src, site.url).toString(),
    servesCuisine: ["Japonaise", "Sushi", "Teppanyaki"],
    telephone: site.phone.display.replace(/\s/g, ""),
    email: site.email,
    acceptsReservations: true,
    menu: new URL("/la-carte", site.url).toString(),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: site.hours.services.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: site.hours.days.map((d) => `https://schema.org/${d}`),
      opens: s.open,
      closes: s.close,
    })),
    sameAs: site.social.map((s) => s.href),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
