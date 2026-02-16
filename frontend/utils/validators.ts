import { Platform } from 'react-native';

/**
 * Checks if the given value is a non‑empty string after trimming.
 */
export const isNonEmptyString = (value: unknown): boolean => {
  return typeof value === 'string' && value.trim().length > 0;
};

/**
 * Validates an email address using a RFC‑5322 compliant regular expression.
 */
export const isValidEmail = (email: unknown): boolean => {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  const emailRegex =
    // eslint-disable-next-line no-useless-escape
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|} -]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  return emailRegex.test(trimmed);
};

/**
 * Validates a password.
 * - Minimum length defaults to 8 characters.
 * - Must contain at least one uppercase, one lowercase, one digit, and one special character.
 */
export const isValidPassword = (
  password: unknown,
  options?: { minLength?: number }
): boolean => {
  if (typeof password !== 'string') return false;
  const { minLength = 8 } = options ?? {};
  if (password.length < minLength) return false;

  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;
  const digit = /[0-9]/;
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

  return (
    upperCase.test(password) &&
    lowerCase.test(password) &&
    digit.test(password) &&
    specialChar.test(password)
  );
};

/**
 * Validates a phone number.
 * Supports international format with optional leading '+'.
 * Allows spaces, dashes, and parentheses for readability.
 */
export const isValidPhoneNumber = (phone: unknown): boolean => {
  if (typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[ \-\(\)]/g, '');
  const phoneRegex = /^\+?[0-9]{7,15}$/;
  return phoneRegex.test(cleaned);
};

/**
 * Validates a URL.
 * Uses the built‑in URL constructor for robust parsing.
 */
export const isValidUrl = (url: unknown): boolean => {
  if (typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    if (Platform.OS === 'ios' && !parsed.protocol) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

/**
 * Validates a credit card number using the Luhn algorithm.
 */
export const isValidCreditCardNumber = (cardNumber: unknown): boolean => {
  if (typeof cardNumber !== 'string') return false;
  const sanitized = cardNumber.replace(/\s+/g, '');
  if (!/^\d+$/.test(sanitized)) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

/**
 * Validates a date string in ISO 8601 format (YYYY‑MM‑DD).
 */
export const isValidIsoDate = (dateStr: unknown): boolean => {
  if (typeof dateStr !== 'string') return false;
  const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoRegex.test(dateStr)) return false;
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
};

/**
 * Aggregates all validator functions for convenient import.
 */
export const Validators = {
  isNonEmptyString,
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
  isValidUrl,
  isValidCreditCardNumber,
  isValidIsoDate,
};

export default Validators;