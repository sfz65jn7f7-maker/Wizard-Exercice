# Poudlard Academy

TP TypeScript : types utilitaires, repository générique, décorateurs et type guards.

## Lancer

```bash
npm install
npx tsc
node dist/main.js
```

## Exercices

1. Ajouter un sorcier avec `NewWizard` (`Omit<Wizard, "id">`)
2. Filtrer les sorciers par maison (`findByHouse`)
3. Gérer les événements de sort avec `Extract`
4. Valider la puissance d'un sort avec un décorateur
5. Mettre en cache les résultats d'une méthode avec un décorateur
6. Renforcer la validation avec le type guard `isHouse`

## Structure

```text
src/
├── types.ts
├── decorators.ts
├── repository.ts
└── main.ts
```