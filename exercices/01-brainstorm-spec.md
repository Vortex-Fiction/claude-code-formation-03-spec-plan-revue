# Exercice 1 — Du ticket à la spec

**Objectif :** transformer `tickets/feature.md` en une spec qui répond à chaque question ouverte, avant d'écrire une ligne de code.

## Consignes

1. Installez le plugin si ce n'est pas fait : `/plugin install superpowers@claude-plugins-official`, puis relancez `claude` à la racine du repo.
2. Lancez le brainstorm :

   > Utilise le skill superpowers:brainstorming sur `tickets/feature.md`. Pose-moi une question à la fois. Ne propose pas de code.

3. Répondez aux questions de Claude une par une. Tranchez quand vous savez. Quand vous ne voulez pas trancher, dites-le : la question part dans « Left to the builder », avec la contrainte que le constructeur doit respecter.
4. Demandez la spec dans `docs/superpowers/specs/`, en anglais et en STE, avec ces sections : `Intent`, `Goals`, `Non-goals`, `Anti-goals`, `Decided`, `Left to the builder`.
5. Arrêtez-vous à la spec. Quand Claude propose de passer au plan, refusez : le plan, c'est l'exercice 2, dans une session neuve.
6. `npm run lint:doc` doit être vert : il vérifie aussi `docs/superpowers/`.
7. Relisez la spec vous-même, puis commitez-la : `docs(spec): Add the due dates design`.

## Réussi si

- Chaque question ouverte du ticket a une réponse dans la spec, marquée « Decided » ou « Left to the builder ».
- `Non-goals` reprend la section « Not in this ticket » du ticket.
- `Anti-goals` dit au moins une chose qui ferait échouer la feature même si les tests passent (par exemple : une base existante qui ne démarre plus).
- `npm run lint:doc` est vert.
- Vous pouvez justifier chaque ligne de `Decided` sans relire la conversation.
