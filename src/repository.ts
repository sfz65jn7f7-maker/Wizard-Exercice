
import { NewWizard, Wizard, House, Spell } from "./types";
import { ValidateSpellPower } from "./decorators";

export class WizardRepository {
  private wizards: Wizard[] = [];
  private nextId = 1;

  add(wizard: NewWizard): Wizard {
    const newWizard: Wizard = {
      ...wizard,
      id: this.nextId++,
    };

    this.wizards.push(newWizard);
    return newWizard;
  }

  findByHouse(house: House): Wizard[] {
    return this.wizards.filter(
      (wizard) => wizard.house === house
    );
  }

  findAll(): Wizard[] {
    return [...this.wizards];
  }
}

export class SpellRepository {
  private spells: Spell[] = [];
  private nextId = 1;

  @ValidateSpellPower
  add(spell: Omit<Spell, "id">): Spell {
    const newSpell: Spell = {
      ...spell,
      id: this.nextId++,
    };

    this.spells.push(newSpell);
    return newSpell;
  }

  findAll(): Spell[] {
    return [...this.spells];
  }
}
