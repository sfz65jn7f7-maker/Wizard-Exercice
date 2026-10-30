export type House =
  | "Gryffindor"
  | "Slytherin"
  | "Ravenclaw"
  | "Hufflepuff";

export type SpellCategory = "attack" | "defense" | "healing" | "utility";

export interface Wizard {
  id: number;
  name: string;
  house: House;
  level: number;
  active: boolean;
}

export interface Spell {
  id: number;
  name: string;
  category: SpellCategory;
  power: number;
}

// Exercice 1 : le sorcier sans identifiant
export type NewWizard = Omit<Wizard, "id">;

// Exercice 3 : union discriminée + extraction
export type AcademyEvent =
  | { type: "spell-cast"; wizardId: number; spellName: string }
  | { type: "level-up"; wizardId: number; newLevel: number }
  | { type: "wizard-expelled"; wizardId: number };

export type SpellCastEvent = Extract<AcademyEvent, { type: "spell-cast" }>;