
import {
  AcademyEvent,
  House,
  SpellCastEvent,
  Wizard,
} from "./types";
import { WizardRepository, SpellRepository } from "./repository";
import { Cache } from "./decorators";

// Exercice 1 et 2 : ajouter et rechercher des sorciers
const wizardRepository = new WizardRepository();

const harry = wizardRepository.add({
  name: "Harry Potter",
  level: 17,
  house: "Gryffindor",
  active: true,
});

// Test : un nouvel ajout ne nécessite pas d'id.
const testWizard = wizardRepository.add({
  name: "Hermione Granger",
  level: 7,
  house: "Gryffindor",
  active: true,
});

console.log("Test nouvel identifiant :", testWizard.id);

const draco = wizardRepository.add({
  name: "Draco Malfoy",
  level: 17,
  house: "Slytherin",
  active: true,
});

console.log(
  "Sorciers de Slytherin :",
  wizardRepository.findByHouse("Slytherin")
);


console.log("Sorcier ajouté :", harry);
console.log(
  "Sorciers de Gryffindor :",
  wizardRepository.findByHouse("Gryffindor")
);

// Exercice 3 : gérer un événement de lancement de sort
function handleSpellCast(event: SpellCastEvent): void {
  console.log(
    `${event.spellName} a été lancé par le sorcier ${event.wizardId}.`
  );
}

const event: SpellCastEvent = {
  type: "spell-cast",
  wizardId: harry.id,
  spellName: "Expelliarmus",
};

handleSpellCast(event);

const spellRepository = new SpellRepository();

console.log(
  "Sort ajouté :",
  spellRepository.add({ name: "Lumos", power: 10 })
);

try {
  spellRepository.add({ name: "Sort interdit", power: -5 });
} catch (error) {
  console.log(
    "Erreur attendue :",
    error instanceof Error ? error.message : error
  );
}

// Exercice 5 : tester le cache
class SpellService {
  calculatePower(power: number): number {
    console.log("Calcul effectué...");
    return power * 2;
  }
}

const cacheDescriptor = Object.getOwnPropertyDescriptor(
  SpellService.prototype,
  "calculatePower"
);

if (cacheDescriptor) {
  Cache(SpellService.prototype, "calculatePower", cacheDescriptor);

  Object.defineProperty(
    SpellService.prototype,
    "calculatePower",
    cacheDescriptor
  );
}

const service = new SpellService();

console.log("Résultat 1 :", service.calculatePower(10));
console.log("Résultat 2 :", service.calculatePower(10));

const service2 = new SpellService();

console.log("Résultat 3 :", service2.calculatePower(10));

// Exercice 6 : renforcer la validation de la maison
function isHouse(value: unknown): value is House {
  return (
    value === "Gryffindor" ||
    value === "Slytherin" ||
    value === "Ravenclaw" ||
    value === "Hufflepuff"
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
    typeof candidate.level === "number" &&
    typeof candidate.active === "boolean" &&
    isHouse(candidate.house)
  );
}

console.log(
  "Maison valide :",
  isHouse("Gryffindor")
);

console.log(
  "Maison invalide :",
  isHouse("Durmstrang")
);

console.log(
  "Harry est un sorcier valide :",
  isWizard(harry)
);

console.log(
  "Un objet invalide est-il un sorcier ?",
  isWizard({
    id: 99,
    name: "Inconnu",
    level: 5,
    active: true,
    house: "Durmstrang",
  })
);