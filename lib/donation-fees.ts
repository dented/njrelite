// Estimated card pricing: 3.7% + $0.30 CAD, without tax.
// Includes the international card uplift and matches the observed Stripe fees.
// Gross up the charge so the fee on the entire payment is covered.
export function calculateDonationTotal(donationCents: number) {
  const totalCents = Math.ceil(((donationCents + 30) * 1000) / 963);
  return { totalCents, feeCents: totalCents - donationCents };
}
