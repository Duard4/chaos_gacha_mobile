export interface Item {
  title: string;
  rarity: number | string;
  description: string;
  tier: string;
  category?: Category;
  color?: string;
}

export interface Levels {
  min: number;
  ave: number;
  max: number;
}

export const categories = [
  "abilities",
  "items",
  "traits",
  "skills",
  "familiars",
  "random",
] as const;

export type Category = (typeof categories)[number];

export const rarityTicketColors: Record<string, string> = {
  bronze: "#8D5524",
  silver: "#c2bfb8",
  golden: "#FFD700",
  platinum: "#77cfbc",
  diamond: "#73e4fe",
  legendary: "#e36131",
  mythical: "#9400D3",
  divine: "#ff0019",
};

export const rarityDropColors: Record<string, string> = {
  common: "#8D5524",
  uncommon: "#C0C0C0",
  rare: "#FFD700",
  elite: "#E5E4E2",
  epic: "#B9F2FF",
  legendary: "#e36131cf",
  mythical: "#9400D3",
  divine: "#ff0019ff",
};

export const tickets: Record<string, [number, number, number]> = {
  bronze: [0.1, 1.3, 3.3],
  silver: [0.5, 2.3, 4.3],
  golden: [1.5, 3.3, 5.3],
  platinum: [2.5, 4.3, 6.3],
  diamond: [3.5, 5.3, 7.3],
  legendary: [4.5, 6.3, 8.3],
  mythical: [5.5, 7.3, 9.3],
  divine: [6.5, 8.3, 10],
};
