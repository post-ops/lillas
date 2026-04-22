'use client';

const AnimatedGrid = ({ opacity = 0.3 }) => (
  <div
    className="pointer-events-none absolute inset-0 overflow-hidden"
    style={{ opacity }}
    aria-hidden
  >
    <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(249,132,12,0.12)" strokeWidth="0.5" />
        </pattern>
        <radialGradient id="fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="grid-mask">
          <rect width="100%" height="100%" fill="url(#fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" mask="url(#grid-mask)" />
    </svg>
  </div>
);

export default AnimatedGrid;
