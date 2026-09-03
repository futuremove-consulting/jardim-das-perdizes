/**
 * Icon - SVG icon system for Jardim das Perdizes.
 * Inline SVGs for zero-latency rendering and full CSS control.
 * Mobile-first: 20px default (touch-friendly), scales up on larger screens.
 *
 * Path data sourced from the Lucide icon set (ISC license): https://lucide.dev
 */

export type IconName =
  | "home" | "building" | "tree" | "car" | "ruler" | "bed" | "bath"
  | "dumbbell" | "flame" | "waves" | "users" | "gamepad" | "sparkles"
  | "map" | "train" | "shopping" | "school" | "hospital" | "heart"
  | "shield" | "check" | "arrow-right" | "phone" | "mail" | "whatsapp"
  | "instagram" | "facebook" | "youtube" | "star" | "trending-up"
  | "calendar" | "key" | "banknote" | "pencil" | "eye" | "layers"
  | "compass" | "sun" | "moon" | "menu" | "x" | "chevron-down"
  | "chevron-right" | "play" | "download" | "search" | "filter"
  | "grid" | "list" | "info" | "alert";

interface IconProps {
  name: IconName;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  ariaLabel?: string;
}

const SIZE_MAP: Record<NonNullable<IconProps["size"]>, string> = {
  xs: "w-4 h-4",
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-10 h-10",
  "2xl": "w-12 h-12",
};

/**
 * String SVG fragments injected into <svg> (fill none / stroke currentColor
 * are inherited from the parent). Unimplemented names render a decor circle.
 */
const ICON_PATHS: Record<string, string> = {
  home: "<path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/><polyline points='9 22 9 12 15 12 15 22'/>",
  building: "<rect x='4' y='2' width='16' height='20' rx='2'/><path d='M9 22v-4h6v4'/><path d='M8 6h.01'/><path d='M16 6h.01'/><path d='M12 6h.01'/><path d='M8 10h.01'/><path d='M16 10h.01'/><path d='M12 10h.01'/><path d='M8 14h.01'/><path d='M16 14h.01'/><path d='M12 14h.01'/>",
  tree: "<path d='M12 22v-8'/><path d='M11.37 12A4 4 0 0 1 6 8a4.16 4.16 0 0 1 .07-.86'/><path d='M12.86 8A4 4 0 0 1 18 12.07'/><path d='M12 16l-3-3'/><path d='M12 13l3-3'/>",
  car: "<path d='M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2'/><circle cx='6.5' cy='16.5' r='2.5'/><circle cx='16.5' cy='16.5' r='2.5'/>",
  train: "<path d='M8 3.1V7a4 4 0 0 0 8 0V3.1'/><path d='m9 15-1-1'/><path d='m15 15 1-1'/><path d='M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z'/><path d='m8 19-2 3'/><path d='m16 19 2 3'/>",
  map: "<path d='M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z'/><path d='M15 5.764v15'/><path d='M9 3.236v15'/>",
  school: "<path d='M14 21v-3a2 2 0 0 0-4 0v3'/><path d='M18 4.933V21'/><path d='m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6'/><path d='m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11'/><path d='M6 4.933V21'/><circle cx='12' cy='9' r='2'/>",
  hospital: "<path d='M12 7v4'/><path d='M14 21v-3a2 2 0 0 0-4 0v3'/><path d='M14 9h-4'/><path d='M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2'/><path d='M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16'/>",
  shopping: "<path d='M16 10a4 4 0 0 1-8 0'/><path d='M3.103 6.034h17.794'/><path d='M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z'/>",
  ruler: "<path d='M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z'/><path d='m14.5 12.5 2-2'/><path d='m11.5 9.5 2-2'/><path d='m8.5 6.5 2-2'/><path d='m17.5 15.5 2-2'/>",
  bed: "<path d='M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8'/><path d='M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4'/><path d='M12 4v6'/><path d='M2 18h20'/>",
  bath: "<path d='M10 4 8 6'/><path d='M17 19v2'/><path d='M2 12h20'/><path d='M7 19v2'/><path d='M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5'/>",
  check: "<polyline points='20 6 9 17 4 12'/>",
  star: "<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/>",
  phone: "<path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'/>",
  mail: "<path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'/><polyline points='22,6 12,13 2,6'/>",
  whatsapp: "<path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'/>",
};

export default function Icon({
  name,
  size = "md",
  className = "",
  ariaLabel,
}: IconProps) {
  const paths = ICON_PATHS[name] || "<circle cx='12' cy='12' r='10'/>";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : "presentation"}
      focusable="false"
      className={`${SIZE_MAP[size]} ${className}`}
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  );
}
