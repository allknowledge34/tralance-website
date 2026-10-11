/**
 * Client & server safe HTML sanitizer for email campaigns.
 * Strips active scripts, event handlers (onload, onerror, onclick), iframe, object, and javascript: protocols.
 */
export function sanitizeEmailHtml(rawHtml: string): string {
  if (!rawHtml) return "";

  let sanitized = rawHtml;

  // 1. Remove <script> tags and contents
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  // 2. Remove <iframe>, <object>, <embed>, <applet>, <form>, <input>
  sanitized = sanitized.replace(/<\/?(?:iframe|object|embed|applet|form|input|textarea|button)\b[^>]*>/gi, "");

  // 3. Remove inline event handlers (on\w+=...)
  sanitized = sanitized.replace(/\s+on\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, "");

  // 4. Remove javascript: and vbscript: URLs
  sanitized = sanitized.replace(/(href|src)\s*=\s*['"]\s*(?:javascript|vbscript|data(?!\s*:\s*image)):[^'"]*['"]/gi, '$1="#"');

  return sanitized;
}

/**
 * Validates external image URL
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    return true;
  } catch {
    return false;
  }
}
