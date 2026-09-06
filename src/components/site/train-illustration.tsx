import { cn } from "@/lib/utils";

/**
 * Brand-styled placeholder illustration for rail/train freight - used
 * anywhere we need a "just like the truck photos" visual moment for the
 * rail side of the business, without depending on a licensed stock photo.
 * Swap for a real photo of the fleet's rail partner wagons when available.
 */
export function TrainIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 450"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Illustration of a freight train hauling branded cargo wagons"
    >
      <defs>
        <linearGradient id="ti-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2422" />
          <stop offset="100%" stopColor="#1c1c1c" />
        </linearGradient>
        <linearGradient id="ti-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#302a27" />
          <stop offset="100%" stopColor="#1c1c1c" />
        </linearGradient>
      </defs>

      <rect width="800" height="450" fill="url(#ti-sky)" />

      {/* Distant skyline, muted */}
      <g opacity="0.35" fill="#82817f">
        <rect x="40" y="230" width="26" height="90" />
        <rect x="80" y="200" width="20" height="120" />
        <rect x="640" y="215" width="24" height="105" />
        <rect x="690" y="245" width="30" height="75" />
        <rect x="730" y="195" width="18" height="125" />
      </g>

      {/* Ground */}
      <rect x="0" y="320" width="800" height="130" fill="url(#ti-ground)" />

      {/* Electrification poles + catenary wire, evoking Indian Railways freight corridors */}
      <g stroke="#4a4a49" strokeWidth="3">
        <line x1="70" y1="150" x2="70" y2="322" />
        <line x1="70" y1="160" x2="120" y2="150" />
        <line x1="330" y1="150" x2="330" y2="322" />
        <line x1="330" y1="160" x2="380" y2="150" />
        <line x1="740" y1="150" x2="740" y2="322" />
        <line x1="740" y1="160" x2="690" y2="150" />
      </g>
      <path d="M70 160 Q 400 190 740 160" stroke="#82817f" strokeWidth="1.5" fill="none" opacity="0.5" />

      {/* Track */}
      <g>
        {Array.from({ length: 24 }).map((_, i) => (
          <rect key={i} x={10 + i * 34} y="336" width="20" height="6" rx="1" fill="#4a4a49" />
        ))}
        <rect x="0" y="330" width="800" height="4" fill="#82817f" />
        <rect x="0" y="346" width="800" height="4" fill="#82817f" />
      </g>

      {/* Speed lines */}
      <g stroke="#db2319" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round">
        <line x1="0" y1="220" x2="55" y2="220" />
        <line x1="0" y1="250" x2="40" y2="250" />
        <line x1="0" y1="280" x2="65" y2="280" />
      </g>

      {/* Wagon 2 (rearmost, white/red container) */}
      <g>
        <rect x="560" y="235" width="150" height="95" rx="6" fill="#f4f1ee" stroke="#1c1c1c" strokeOpacity="0.15" />
        <rect x="560" y="235" width="150" height="26" rx="6" fill="#db2319" />
        <g stroke="#1c1c1c" strokeOpacity="0.12">
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1={572 + i * 18} y1="261" x2={572 + i * 18} y2="330" />
          ))}
        </g>
        <circle cx="590" cy="342" r="14" fill="#1c1c1c" />
        <circle cx="680" cy="342" r="14" fill="#1c1c1c" />
        <circle cx="590" cy="342" r="5" fill="#82817f" />
        <circle cx="680" cy="342" r="5" fill="#82817f" />
      </g>

      {/* Wagon 1 (red/white container) */}
      <g>
        <rect x="410" y="228" width="150" height="102" rx="6" fill="#db2319" />
        <rect x="410" y="228" width="150" height="30" rx="6" fill="#1c1c1c" />
        <rect x="426" y="266" width="118" height="46" rx="3" fill="#f4f1ee" />
        <text x="485" y="296" textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontSize="15" fontWeight="700" fill="#db2319" letterSpacing="0.5">
          SAIBABA
        </text>
        <circle cx="440" cy="342" r="14" fill="#1c1c1c" />
        <circle cx="530" cy="342" r="14" fill="#1c1c1c" />
        <circle cx="440" cy="342" r="5" fill="#82817f" />
        <circle cx="530" cy="342" r="5" fill="#82817f" />
      </g>

      {/* Locomotive */}
      <g>
        {/* body */}
        <rect x="230" y="205" width="165" height="125" rx="10" fill="#1c1c1c" />
        <rect x="230" y="205" width="165" height="34" rx="10" fill="#db2319" />
        {/* pantograph */}
        <path d="M300 205 L300 178 L330 160 L330 178 L360 160 L360 178 L390 205" stroke="#82817f" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* windscreen */}
        <rect x="345" y="222" width="38" height="30" rx="4" fill="#a9c6d8" opacity="0.85" />
        {/* headlight */}
        <circle cx="378" cy="284" r="7" fill="#fbbf24" />
        {/* front stripe / chevron, echoing the truck bumper chevrons */}
        <path d="M240 300 L280 280 L320 300 Z" fill="#db2319" opacity="0.9" />
        <text x="310" y="275" fontFamily="ui-sans-serif, system-ui" fontSize="12" fontWeight="700" fill="#f4f1ee" opacity="0.8">
          WDG
        </text>
        {/* wheels / bogies */}
        <rect x="248" y="325" width="130" height="14" rx="3" fill="#0f0f0f" />
        <circle cx="266" cy="342" r="14" fill="#1c1c1c" stroke="#4a4a49" strokeWidth="2" />
        <circle cx="310" cy="342" r="14" fill="#1c1c1c" stroke="#4a4a49" strokeWidth="2" />
        <circle cx="354" cy="342" r="14" fill="#1c1c1c" stroke="#4a4a49" strokeWidth="2" />
        <circle cx="266" cy="342" r="5" fill="#82817f" />
        <circle cx="310" cy="342" r="5" fill="#82817f" />
        <circle cx="354" cy="342" r="5" fill="#82817f" />
      </g>

      {/* Ground shadow line */}
      <rect x="0" y="356" width="800" height="1.5" fill="#000000" opacity="0.25" />
    </svg>
  );
}
