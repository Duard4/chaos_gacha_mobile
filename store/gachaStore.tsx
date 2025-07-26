import { Category, Item, Levels } from "@/constants/types";
import { create } from "zustand";

export interface RollLogEntry {
  id: string;
  item: Item;
  timestamp: Date;
  rarity: number;
  color?: string; // Optional color for UI purposes
}

interface GachaState {
  // Current state
  currentItem: Item;
  levels: Levels;
  category: Category;
  ticket: string;

  // Roll history
  rollHistory: RollLogEntry[];

  // Actions
  setCurrentItem: (item: Item) => void;
  setLevels: (levels: Levels) => void;
  setCategory: (category: Category) => void;
  setTicket: (ticket: string) => void;
  addRollToHistory: (item: Item, rarity: number) => void;
  clearHistory: () => void;
}

export const useGachaStore = create<GachaState>((set, get) => ({
  currentItem: {
    title: "",
    rarity: "",
    description: "",
    tier: "",
    category: "random",
    color: "#888",
  },
  levels: { min: 0.1, ave: 5, max: 10 },
  category: "random",
  ticket: "",
  rollHistory: [],

  // Actions
  setCurrentItem: (item) => set({ currentItem: item }),

  setLevels: (levels) => set({ levels }),

  setCategory: (category) => set({ category }),

  setTicket: (ticket) => set({ ticket }),

  addRollToHistory: (item, rarity) => {
    const newEntry: RollLogEntry = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      item: { ...item },
      timestamp: new Date(),
      rarity,
    };

    set((state) => ({
      rollHistory: [newEntry, ...state.rollHistory].slice(0, 100), // Keep last 100 rolls
    }));
  },

  clearHistory: () => set({ rollHistory: [] }),
}));
