# Exercice 4 — La revue et la PR

**Objectif :** relire le travail de l'agent en trois couches, puis ouvrir une PR qu'un collègue relit vite.

## Consignes

### Couche 1 — les garde-fous automatiques

Dans le worktree, tout doit être vert avant la couche 2 :

```bash
npm test
npm run test:coverage
npm run lint
npm run lint:doc
npm audit --omit=dev
```

`npm audit --omit=dev` vérifie les dépendances livrées. Sans `--omit=dev`, l'outillage ESLint remonte des alertes « moderate » connues, sans correctif compatible.

### Couche 2 — l'agent se relit

1. Dans la session, lancez `/code-review main...HEAD` : la revue couvre tous les commits de la branche, pas seulement les changements non commités.
2. Pour chaque point trouvé, demandez à Claude de le vérifier (relire le code, écrire un test qui le montre) avant de corriger. Il a le droit de contester un point, avec une preuve.

### Couche 3 — vous relisez l'agent

1. Ouvrez la spec à côté du diff : `git diff main...HEAD`.
2. Relisez par le risque : la migration et les règles de dates d'abord, l'écran ensuite.
3. Traquez ce que l'agent ajoute souvent :
   - une initiative non demandée (une option, une route, un fichier que la spec ne demande pas) ;
   - un fallback qui cache une erreur (`?? 0`, un `catch` vide, une valeur par défaut sur une donnée obligatoire) ;
   - `as`, `!`, `any` ;
   - une abstraction de trop (un helper générique pour un seul appel) ;
   - du code mort ;
   - des commentaires ;
   - un test vide, ou qui ne vérifie rien.
4. Classez chaque commentaire :
   - « écart à la spec » : le code ne fait pas ce que la spec dit → corrigez le code ;
   - « trou dans la spec » : la spec ne disait rien → complétez d'abord la spec, puis le code ;
   - « préférence » : ni l'un ni l'autre → discutez-la ou laissez-la, sans commit.
5. Une correction = un commit. Relancez la couche 1 après.

### La PR

1. Une seule fois : `gh repo fork --remote`. Votre fork devient `origin`, ce repo devient `upstream`.
2. `git push -u origin HEAD`
3. `gh pr create --repo <votre-compte>/claude-code-formation-03-spec-plan-revue`
4. Dans la description : le lien vers la spec et le plan, ce qui change, comment vérifier (les commandes et leur sortie), et les commentaires de revue classés.

## Réussi si

- La PR existe sur votre fork.
- Sa description renvoie à la spec.
- Chaque commentaire de revue est classé « écart à la spec », « trou dans la spec » ou « préférence ». Chaque écart et chaque trou a sa correction dans un commit.
- Les cinq commandes de la couche 1 sont vertes sur la branche de la PR.
