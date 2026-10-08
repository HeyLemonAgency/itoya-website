/**
 * Single source of truth for Itoya's practical information.
 *
 * Every value below was checked against the official website on 8 October 2026:
 *   - https://www.itoya.ch/          (hours, address, telephones)
 *   - https://www.itoya.ch/contact   (email, bus, parking, booking widget)
 *   - https://www.itoya.ch/buffet-midi, /buffet-soir (formula prices & rules)
 * Recheck before launch — see docs/PROJECT_NOTES.md.
 */

export const site = {
  name: "Itoya",
  businessName: "Itoya Crissier",
  descriptor: "Restaurant japonais",
  locality: "Crissier",
  /** Final production domain. The pitch preview itself is kept unindexed. */
  url: "https://www.itoya.ch",

  address: {
    street: "Chemin des Lentillières 7A",
    postalCode: "1023",
    locality: "Crissier",
    region: "VD",
    countryCode: "CH",
    country: "Suisse",
  },

  /**
   * Coordinates published by the restaurant itself (Wix business location
   * and Restaurant JSON-LD on itoya.ch). Not used for any visible claim.
   */
  geo: { latitude: 46.5516073, longitude: 6.5731262 },

  phone: {
    display: "+41 21 697 88 88",
    href: "tel:+41216978888",
  },
  mobile: {
    display: "+41 76 501 18 89",
    href: "tel:+41765011889",
  },
  email: "info@itoya.ch",

  /** Same hours every day (Lundi–Vendredi and Samedi–Dimanche on itoya.ch). */
  hours: {
    summary: "Tous les jours",
    services: [
      { label: "Midi", open: "11:30", close: "15:00" },
      { label: "Soir", open: "18:00", close: "23:00" },
    ],
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    note: "Horaires des jours fériés : renseignez-vous par téléphone.",
  },

  access: {
    bus: "Bus 36, arrêt Lentillières",
    parking: "Parking public Oassis, zone 1e",
    /**
     * itoya.ch mentions "4h de parking gratuit". Kept hidden until the owners
     * confirm the current conditions (brief: do not promise free parking).
     */
    parkingFreeHours: 4,
    showParkingConditions: false,
  },

  maps: {
    /** Google Maps universal URLs (no API key, no embed, no tracking script). */
    place:
      "https://www.google.com/maps/search/?api=1&query=Itoya%2C%20Chemin%20des%20Lentilli%C3%A8res%207A%2C%201023%20Crissier",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Chemin%20des%20Lentilli%C3%A8res%207A%2C%201023%20Crissier%2C%20Suisse",
    apple:
      "https://maps.apple.com/?q=Itoya&address=Chemin%20des%20Lentilli%C3%A8res%207A%2C%201023%20Crissier%2C%20Suisse",
  },

  /**
   * Booking channel. The current site uses Wix Table Reservations, which only
   * works inside Wix. Until the owners choose a provider, the verified channel
   * is the telephone, with email as a secondary option.
   */
  booking: {
    method: "telephone" as const,
    /** e.g. a TheFork / Zenchef / Resy widget URL once chosen and verified. */
    providerUrl: null as string | null,
    emailSubject: "Demande de réservation",
    emailBody:
      "Bonjour,\n\nJe souhaiterais réserver une table chez Itoya.\n\nDate :\nHeure :\nNombre de personnes :\nNom :\nTéléphone :\n\nMerci et à bientôt.",
  },

  social: [
    { label: "Instagram", href: "https://www.instagram.com/itoya.crissier/" },
    { label: "Facebook", href: "https://www.facebook.com/Itoya.Crissier" },
    { label: "TikTok", href: "https://www.tiktok.com/@itoya.crissier" },
  ],

  /** Shown discreetly in the footer only if requested by the agency. */
  agencyCredit: null as { label: string; href: string } | null,
} as const;

export const mailtoBooking = `mailto:${site.email}?subject=${encodeURIComponent(
  site.booking.emailSubject,
)}&body=${encodeURIComponent(site.booking.emailBody)}`;

export const mailtoContact = `mailto:${site.email}`;

export const fullAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.locality}`;

export const navigation = [
  { label: "La carte", href: "/la-carte" },
  { label: "Nos formules", href: "/formules" },
  { label: "Le lieu", href: "/le-lieu" },
  { label: "Nous trouver", href: "/contact" },
] as const;
