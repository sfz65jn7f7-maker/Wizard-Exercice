import type { House, SpellCastEvent, Wizard } from "./types";
import { SpellRepository, WizardRepository } from "./repository";
import { Cache } from "./decorators";

// ---------- Exercice 1 : ajouter un nouveau sorcier ----------
const wizards = new WizardRepository();

const harry = wizards.addWizard({
  name: "Harry Potter",
  house: "Gryffindor",
  level: 5,
  active: true,
});
console.log("Sorcier ajouté :", harry);

wizards.addWizard({
  name: "Draco Malfoy",
  house: "Slytherin",
  level: 5,
  active: true,
});
wizards.addWizard({
  name: "Hermione Granger",
  house: "Gryffindor",
  level: 6,
  active: true,
});

// ---------- Exercice 2 : filtrer par maison ----------
console.log("Gryffindor :", wizards.findByHouse("Gryffindor"));
console.log("Slytherin :", wizards.findByHouse("Slytherin"));

// ---------- Exercice 3 : Extract et événements de sort ----------
function handleSpellCast(event: SpellCastEvent): void {
  console.log(`Wizard ${event.wizardId} cast ${event.spellName}`);
}

handleSpellCast({
  type: "spell-cast",
  wizardId: 1,
  spellName: "Expelliarmus",
});

// ---------- Exercice 4 : valider la puissance d'un sort ----------
const spells = new SpellRepository();

spells.add({
  id: 102,
  name: "Protego",
  category: "defense",
  power: 50,
});
console.log("Sorts enregistrés :", spells.getAll());

try {
  spells.add({
    id: 103,
    name: "Invalid Spell",
    category: "attack",
    power: -10,
  });
} catch (error) {
  console.log("Erreur :", error instanceof Error ? error.message : error);
}

// ---------- Exercice 5 : méthode mise en cache ----------
class SpellCalculator {
  @Cache
  calculatePower(basePower: number, multiplier: number): number {
    console.log("Calculating...");

    return basePower * multiplier;
  }
}

const calculator = new SpellCalculator();

console.log(calculator.calculatePower(10, 3));
console.log(calculator.calculatePower(10, 3));
console.log(calculator.calculatePower(5, 2));

// ---------- Exercice 6 : Type Guard plus strict ----------
const validHouses: readonly House[] = [
  "Gryffindor",
  "Slytherin",
  "Ravenclaw",
  "Hufflepuff",
];

function isHouse(value: unknown): value is House {
  return (
    typeof value === "string" &&
    validHouses.some((house) => house === value)
  );
}

function isWizard(value: unknown): value is Wizard {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "number" &&
    typeof candidate.name === "string" &&
    isHouse(candidate.house) &&
    typeof candidate.level === "number" &&
    typeof candidate.active === "boolean"
  );
}

const validData: unknown = {
  id: 1,
  name: "Harry Potter",
  house: "Gryffindor",
  level: 5,
  active: true,
};

const invalidData: unknown = {
  id: 2,
  name: "Viktor",
  house: "Durmstrang",
  level: 5,
  active: true,
};

console.log(isWizard(validData)); // true
console.log(isWizard(invalidData)); // false