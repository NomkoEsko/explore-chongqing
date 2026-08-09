export const WEBSITE_PUBLIC_URL = import.meta.env.VITE_WEBSITE_PUBLIC_URL || "";
export const PDF_PUBLIC_URL = import.meta.env.VITE_PDF_PUBLIC_URL || "";

export const PDF_LOCAL_PATH = "/downloads/ulaanbaatar-brochure.pdf";

function normalizeUrl(url) {
  return url.trim();
}

function getBrowserOrigin() {
  if (typeof window === "undefined" || !window.location?.origin) {
    return "";
  }
  return window.location.origin;
}

function isLocalOrigin(origin) {
  return /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i.test(
    origin,
  );
}

export function getQrTargets() {
  const origin = getBrowserOrigin();
  const deployedOrigin = origin && !isLocalOrigin(origin) ? origin : "";
  const configuredWebsiteUrl = normalizeUrl(WEBSITE_PUBLIC_URL);
  const configuredPdfUrl = normalizeUrl(PDF_PUBLIC_URL);

  const deployedWebsiteUrl = deployedOrigin ? `${deployedOrigin}/` : "";
  const deployedPdfUrl = deployedOrigin ? `${deployedOrigin}${PDF_LOCAL_PATH}` : "";

  return {
    website: {
      configured: Boolean(configuredWebsiteUrl),
      autoResolved: !configuredWebsiteUrl && Boolean(deployedWebsiteUrl),
      url: configuredWebsiteUrl || deployedWebsiteUrl,
    },
    pdf: {
      configured: Boolean(configuredPdfUrl),
      autoResolved: !configuredPdfUrl && Boolean(deployedPdfUrl),
      url: configuredPdfUrl || deployedPdfUrl,
    },
  };
}
