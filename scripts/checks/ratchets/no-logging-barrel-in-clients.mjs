export const message =
  "Mobile and web app code may not import the @moonlight/logging root: it pulls in Node-only modules that Metro and the browser cannot bundle. Import the subpath you need, such as @moonlight/logging/best-effort or @moonlight/logging/monitoring.";

export const include = [
  "apps/mobile/**/*.{ts,tsx}",
  "apps/web/src/**/*.{ts,tsx}",
  // Both are compiled into a client bundle by the web app and Metro, so a root import breaks
  // the bundle exactly as it does in the app that imports them.
  "packages/chat-ui/src/**/*.{ts,tsx}",
  "packages/ui-web/src/**/*.{ts,tsx}",
];

export const pattern = /(?:from|import\s*\(?)\s*["']@moonlight\/logging["']/g;
