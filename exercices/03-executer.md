# Exercice 3 — Exécuter le plan

**Objectif :** livrer la feature tâche par tâche, en TDD, avec une preuve pour chaque affirmation.

## Consignes

1. Travaillez dans un worktree, pour garder `main` intact :
   - `claude --worktree due-dates` crée le worktree dans `.claude/worktrees/due-dates` et y ouvre la session ;
   - ou `git worktree add ../library-due-dates -b feat/due-dates`, puis `claude` dans ce dossier.
2. Dans le worktree, lancez `npm install` : un worktree neuf n'a pas de `node_modules`. Arrêtez l'API et l'app de `main` : les ports 3000 et 5173 sont fixes.
3. Avant la première tâche, lancez une fois `npm run back` et `npm run front` dans le worktree, empruntez un livre, puis arrêtez les deux. Vous avez maintenant une base créée par `main`, comme celle d'un utilisateur.
4. Lancez l'exécution :

   > Exécute le plan `docs/superpowers/plans/<votre-plan>.md` avec le skill superpowers:executing-plans. Une tâche = un commit. Pour chaque test, montre-moi la sortie en échec, puis en succès.

   Variante : `superpowers:subagent-driven-development` confie chaque tâche à un sous-agent et relit entre deux tâches.

5. Relisez chaque commit avant la tâche suivante : `git show --stat`, puis le diff.
6. À la fin : `npm test`, `npm run test:coverage`, `npm run lint`, `npm run lint:doc`. Puis `npm run back` et `npm run front` sur la base de l'étape 3, et l'écran des emprunts dans le navigateur.

## Réussi si

- Il y a un commit par tâche du plan, et chaque commit contient son code et ses tests.
- Chaque « les tests passent » de Claude vient avec la sortie de la commande : citée, pas affirmée.
- `npm run test:coverage` reste à 100 %.
- L'API démarre sur la base de l'étape 3, et l'emprunt fait avant la feature est encore là.
