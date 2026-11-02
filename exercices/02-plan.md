# Exercice 2 — Le plan

**Objectif :** découper la spec en tâches assez petites pour qu'un agent les exécute sans deviner.

## Consignes

1. Ouvrez une session neuve (`/clear`) : le plan part de la spec, pas de la conversation du brainstorm.
2. Lancez le plan :

   > Utilise le skill superpowers:writing-plans sur `docs/superpowers/specs/<votre-spec>.md`. Écris le plan dans `docs/superpowers/plans/`, en anglais et en STE.

3. Exigez pour chaque tâche : les fichiers touchés, le test écrit d'abord (son nom et ce qu'il vérifie), la commande qui le montre en échec puis en succès, le message de commit.
4. Exigez les interfaces : la signature des fonctions, la forme du JSON de chaque route, le type partagé dans `libs/shared`.
5. Exigez une tâche pour la base existante : la migration, avec son test sur une base créée par le schéma de `main`.
6. `npm run lint:doc` doit être vert. Commitez le plan : `docs(plan): Add the due dates plan`.

## Réussi si

- Chaque tâche a son test, ses fichiers et son commit.
- Aucune tâche « TBD », « à définir » ou « gérer les erreurs » sans dire lesquelles.
- Chaque ligne de `Decided` de la spec se retrouve dans au moins une tâche.
- Un collègue peut exécuter le plan sans vous poser de question.
