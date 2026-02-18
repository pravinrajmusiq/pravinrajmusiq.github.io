/**
 * Returns the correct path for static assets (images, videos, etc.)
 * Required for GitHub Pages where the site is served from /Portupolio/
 */
export function assetPath(path: string): string {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
