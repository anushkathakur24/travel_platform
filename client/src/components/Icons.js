/**
 * TravelConnect Icon Library
 * Clean Lucide-style SVG icons as React components.
 * Usage: <Icon name="plane" size={20} color="#fff" />
 * Or individually: <PlaneIcon size={24} />
 */

const defaults = { size: 20, color: "currentColor", strokeWidth: 1.8 };

function Svg({ size, color, strokeWidth, children }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      {children}
    </svg>
  );
}

export function PlaneIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2a1 1 0 0 0-.5 1.7l2.5 2.5-1 3.5 3.5-1 2.5 2.5a1 1 0 0 0 1.7-.5z"/>
    </Svg>
  );
}

export function BuildingIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
      <path d="M9 22v-4h6v4"/>
      <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01M12 14h.01"/>
    </Svg>
  );
}

export function UtensilsIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
      <path d="M7 2v20"/>
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
    </Svg>
  );
}

export function UsersIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </Svg>
  );
}

export function BotIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <path d="M12 8V4H8"/>
      <rect width="16" height="12" x="4" y="8" rx="2"/>
      <path d="M2 14h2M20 14h2M9 13v2M15 13v2"/>
    </Svg>
  );
}

export function MapPinIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </Svg>
  );
}

export function CalendarIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
    </Svg>
  );
}

export function StarIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth, filled = false }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <polygon
        fill={filled ? color : "none"}
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      />
    </Svg>
  );
}

export function MoonIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </Svg>
  );
}

export function UserIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </Svg>
  );
}

export function LogOutIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" x2="9" y1="12" y2="12"/>
    </Svg>
  );
}

export function SearchIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.3-4.3"/>
    </Svg>
  );
}

export function XIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <path d="M18 6 6 18M6 6l12 12"/>
    </Svg>
  );
}

export function SendIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <path d="m22 2-7 20-4-9-9-4Z"/>
      <path d="M22 2 11 13"/>
    </Svg>
  );
}

export function GlobeIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
      <path d="M2 12h20"/>
    </Svg>
  );
}

export function SparklesIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4M19 17v4M3 5h4M17 19h4"/>
    </Svg>
  );
}

export function ArrowRightIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </Svg>
  );
}

export function HomeIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </Svg>
  );
}

export function HeartIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </Svg>
  );
}

export function CheckCircleIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <path d="m9 11 3 3L22 4"/>
    </Svg>
  );
}

export function UserPlusIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <line x1="19" x2="19" y1="8" y2="14"/>
      <line x1="22" x2="16" y1="11" y2="11"/>
    </Svg>
  );
}

export function CompassIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </Svg>
  );
}

export function ShieldCheckIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </Svg>
  );
}

export function TagIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.41 0l7.29-7.29a1 1 0 0 0 0-1.41L12 2z"/>
      <path d="M7 7h.01"/>
    </Svg>
  );
}

export function DollarSignIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <line x1="12" x2="12" y1="2" y2="22"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </Svg>
  );
}

export function DatabaseIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
    </Svg>
  );
}

export function ServerIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/>
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
      <line x1="6" x2="6.01" y1="6" y2="6"/>
      <line x1="6" x2="6.01" y1="18" y2="18"/>
    </Svg>
  );
}

export function CodeIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </Svg>
  );
}

export function CalendarDaysIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>
    </Svg>
  );
}

export function MailIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </Svg>
  );
}

export function CheckIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }) {
  return (
    <Svg size={size} color={color} strokeWidth={strokeWidth}>
      <path d="M20 6 9 17l-5-5"/>
    </Svg>
  );
}
