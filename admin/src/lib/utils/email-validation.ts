export const BroadcastRecipientType = {
  ALL_REGISTERED: "ALL_REGISTERED",
  PRO_REGISTERED: "PRO_REGISTERED",
  FREE_REGISTERED: "FREE_REGISTERED",
  SELECTED_USERS: "SELECTED_USERS",
  CUSTOM: "CUSTOM",
} as const;

export type BroadcastRecipientType =
  (typeof BroadcastRecipientType)[keyof typeof BroadcastRecipientType];

export interface EmailValidationResult {
  validEmails: string[];
  invalidEmails: string[];
  duplicateCount: number;
  totalParsed: number;
}

export function parseAndValidateCustomEmails(rawInput: string): EmailValidationResult {
  if (!rawInput || typeof rawInput !== "string") {
    return { validEmails: [], invalidEmails: [], duplicateCount: 0, totalParsed: 0 };
  }

  const tokens = rawInput
    .split(/[\r\n,;\s]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  const validSet = new Set<string>();
  const invalidSet = new Set<string>();
  let duplicateCount = 0;

  for (const token of tokens) {
    const normalized = token.toLowerCase();
    if (emailRegex.test(normalized)) {
      if (validSet.has(normalized)) {
        duplicateCount++;
      } else {
        validSet.add(normalized);
      }
    } else {
      invalidSet.add(token);
    }
  }

  return {
    validEmails: Array.from(validSet),
    invalidEmails: Array.from(invalidSet),
    duplicateCount,
    totalParsed: tokens.length,
  };
}
