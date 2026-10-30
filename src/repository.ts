import type { NewWizard, Spell, Wizard } from "./types";
import { ValidateSpellPower } from "./decorators";

// Référentiel générique réutilisable (sorciers, sorts, ...)
export class Repository<T extends { id: number }> {
  protected items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return [...this.items];
  }

  findById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }
}

export class WizardRepository extends Repository<Wizard> {
  private nextId = 1;

  // Exercice 1 : l'appelant ne fournit pas d'id, le repository l'attribue
  addWizard(newWizard: NewWizard): Wizard {
    const wizard: Wizard = { id: this.nextId++, ...newWizard };
    this.add(wizard);
    return wizard;
  }

  // Exercice 2 : filtrer par maison
  findByHouse(house: Wizard["house"]): Wizard[] {
    return this.getAll().filter((wizard) => wizard.house === house);
  }
}

// Exercice 4 : le décorateur est appliqué à add()
export class SpellRepository extends Repository<Spell> {
  @ValidateSpellPower
  override add(spell: Spell): void {
    super.add(spell);
  }
}