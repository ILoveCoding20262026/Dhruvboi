// Witness display metadata (must mirror backend sultans.WITNESSES keys). Cadence: every 3rd round.
export const WITNESS_CADENCE = 5;
export const WITNESS_ORDER = ["clerk", "guard", "merchant"];

export const WITNESSES = {
  clerk: {
    name: "Yusuf the Clerk", role: "a fellow treasury clerk", icon: "🖋",
    blurb: "Farrukh's colleague at the vault. Nervous, precise, loyal to the truth but afraid of powerful men.",
  },
  guard: {
    name: "Basir the Guard", role: "the treasury night guard", icon: "🛡",
    blurb: "Stood watch the night of the theft. Blunt, observant — reveals little unless pressed.",
  },
  merchant: {
    name: "Salim the Merchant", role: "a bazaar spice merchant", icon: "⚖",
    blurb: "Sells saffron near the great mosque. Cheerful, talkative, remembers his customers.",
  },
};

export const isWitnessRound = (round) => round % WITNESS_CADENCE === 0;
export const witnessKeyForRound = (round) =>
  WITNESS_ORDER[(Math.floor(round / WITNESS_CADENCE) - 1) % WITNESS_ORDER.length];
