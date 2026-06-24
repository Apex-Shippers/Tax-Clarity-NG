/**
 * Tax Clarity NG — 2026 Nigeria Tax Act (NTA) PAYE Engine
 *
 * Pure TypeScript utility with zero side-effects.
 * All monetary values are in Naira (₦).
 */

//  Types
export interface TaxInput {
  grossIncome: number;
  rentPaid: number;
  includePension: boolean;
}

export interface TaxBandBreakdown {
  label: string;
  lowerBound: number;
  upperBound: number | null;
  rate: number;
  taxableInBand: number;
  taxOnBand: number;
}

export interface TaxOutput {
  grossIncome: number;

  // Deductions
  pensionDeduction: number;
  rentRelief: number;
  totalDeductions: number;

  // Chargeable income
  chargeableIncome: number;

  // Tax
  totalTax: number;
  effectiveRate: number; // percentage of gross

  // Net
  netIncome: number;

  // Per-band detail
  bands: TaxBandBreakdown[];
}

//  Constants

/** 8% of gross income */
const PENSION_RATE = 0.08;

/** 20% of annual rent paid */
const RENT_RELIEF_RATE = 0.2;

/** Maximum rent relief cap (₦500,000) */
const RENT_RELIEF_CAP = 500_000;

/**
 * Progressive PAYE bands under the 2026 NTA.
 * Each band is [lower, upper, rate].
 * `upper = Infinity` means "and above".
 */
const TAX_BANDS: Array<[number, number, number]> = [
  [0, 800_000, 0.0], // First ₦800k tax-free
  [800_000, 3_000_000, 0.15], // ₦800k – ₦3M  → 15%
  [3_000_000, 12_000_000, 0.18], // ₦3M  – ₦12M  → 18%
  [12_000_000, 25_000_000, 0.21], // ₦12M – ₦25M  → 21%
  [25_000_000, 50_000_000, 0.23], // ₦25M – ₦50M  → 23%
  [50_000_000, Infinity, 0.25], // Above ₦50M   → 25%
];

//  Engine

export function calculatePAYE(input: TaxInput): TaxOutput {
  const { grossIncome, rentPaid, includePension } = input;

  // Guard: negative inputs clamped to zero
  const gross = Math.max(0, grossIncome);
  const rent = Math.max(0, rentPaid);

  // Deductions
  const pensionDeduction = includePension
    ? Math.round(gross * PENSION_RATE)
    : 0;

  const rawRentRelief = rent * RENT_RELIEF_RATE;
  const rentRelief = Math.min(rawRentRelief, RENT_RELIEF_CAP);

  const totalDeductions = pensionDeduction + rentRelief;

  // Chargeable Income
  const chargeableIncome = Math.max(0, gross - totalDeductions);

  // Progressive Tax Calculationz
  let remainingIncome = chargeableIncome;
  let totalTax = 0;
  const bands: TaxBandBreakdown[] = [];

  for (const [lower, upper, rate] of TAX_BANDS) {
    const bandWidth = upper === Infinity ? Infinity : upper - lower;

    const taxableInBand = Math.max(
      0,
      Math.min(remainingIncome - lower, bandWidth),
    );

    // Only start taxing once we've reached the band
    const actualTaxable =
      remainingIncome > lower
        ? Math.min(remainingIncome - lower, bandWidth)
        : 0;

    const taxOnBand = Math.round(actualTaxable * rate);
    totalTax += taxOnBand;

    bands.push({
      label:
        upper === Infinity
          ? `Above ₦${formatCompact(lower)}`
          : `₦${formatCompact(lower)} – ₦${formatCompact(upper)}`,
      lowerBound: lower,
      upperBound: upper === Infinity ? null : upper,
      rate,
      taxableInBand: actualTaxable,
      taxOnBand,
    });

    // Stop early if income doesn't reach the next band
    if (remainingIncome <= upper) break;
  }

  // Effective Rate
  const effectiveRate =
    gross > 0 ? parseFloat(((totalTax / gross) * 100).toFixed(2)) : 0;

  // Net Income
  const netIncome = gross - totalTax - pensionDeduction;

  return {
    grossIncome: gross,
    pensionDeduction,
    rentRelief,
    totalDeductions,
    chargeableIncome,
    totalTax,
    effectiveRate,
    netIncome,
    bands,
  };
}

//  Helpersz

/** Compact number format: 800000 → "800k", 3000000 → "3M" */
function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${n / 1_000_000}M`;
  if (n >= 1_000) return `${n / 1_000}k`;
  return n.toString();
}

/** Format a number as Naira with commas: 1234567 → "₦1,234,567" */
export function formatNaira(amount: number): string {
  return "₦" + Math.round(amount).toLocaleString("en-NG");
}
