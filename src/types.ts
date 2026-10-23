
export type House =
  | "Gryffindor"
  | "Slytherin"
  | "Ravenclaw"
  | "Hufflepuff";

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
  power: number;
}

export type AcademyEvent =
  | {
      type: "spell-cast";
      wizardId: number;
      spellName: string;
    }
  | {
      type: "wizard-registered";
      wizardId: number;
    };

export type NewWizard = Omit<Wizard, "id">;

export type SpellCastEvent = Extract<
  AcademyEvent,
  { type: "spell-cast" }
>;
