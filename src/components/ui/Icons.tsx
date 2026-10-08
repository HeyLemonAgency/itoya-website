import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 18, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
    ...props,
  };
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5.2 3.8h3l1.6 4.1-2 1.3a11.4 11.4 0 0 0 7 7l1.3-2 4.1 1.6v3a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 3.2 6a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="m3.8 6.5 8.2 6.3 8.2-6.3" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 6.5v11M15 6.5v11" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 6.2v11.6L17.5 12 8 6.2Z" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14.5 6 8.5 12l6 6" />
    </svg>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m9.5 6 6 6-6 6" />
    </svg>
  );
}

export function BusIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="5" y="3.5" width="14" height="14" rx="2" />
      <path d="M5 11h14M8 17.5V20M16 17.5V20" />
      <circle cx="8.5" cy="14.2" r=".6" fill="currentColor" />
      <circle cx="15.5" cy="14.2" r=".6" fill="currentColor" />
    </svg>
  );
}

export function ParkingIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M10 16.5v-9h3a2.6 2.6 0 0 1 0 5.2h-3" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.1" cy="6.9" r=".7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14.5 8H17V4.5h-2.5A3.5 3.5 0 0 0 11 8v2.5H8.5V14H11v6.5h3.5V14H17l.5-3.5h-3V8.5a.5.5 0 0 1 .5-.5Z" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14 4v10.2a3.3 3.3 0 1 1-3.3-3.3M14 4c.4 2.6 2.2 4.3 5 4.5" />
    </svg>
  );
}

export const socialIcons = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  TikTok: TikTokIcon,
} as const;
