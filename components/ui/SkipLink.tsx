/**
 * Gap Addressed: No skip-to-content link for accessibility
 * Allows keyboard users to bypass navigation and jump to main content
 */
"use client";

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );
}
