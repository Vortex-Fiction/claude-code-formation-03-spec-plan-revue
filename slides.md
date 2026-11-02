---
marp: true
theme: default
paginate: true
title: Phase 3 — Spec, plan, code, revue
---

# Phase 3 — Spec, plan, code, revue

Bien utiliser Claude Code en développement

Repo : `claude-code-formation-03-spec-plan-revue`

---

# Partage de réussite

- Une règle de votre `CLAUDE.md` que Claude a suivie sans qu'on la répète
- Un hook ou une permission qui vous a évité une erreur
- Un serveur MCP que vous avez gardé, ou coupé : pourquoi ?
- 10 minutes, deux ou trois personnes

---

# Le lendemain, vous saurez…

- livrer une feature complète en PR, pas juste un diff
- écrire une spec qui tranche avant le code
- découper un plan en tâches testables
- faire travailler l'agent en TDD, un commit par tâche
- relire le travail d'un agent en trois couches

---

# La rigueur se déplace

- Avant : la rigueur était dans l'écriture du code
- Maintenant : l'agent écrit le code en quelques minutes
- La rigueur va **avant** le code : la spec
- Et **après** le code : la revue
- Une spec floue donne du code propre qui fait la mauvaise chose

<!-- Idée centrale de la phase. Le code ne coûte presque plus rien. Ce qui coûte, c'est une décision mal prise, et un agent la prend à votre place si la spec ne la prend pas. -->

---

# Le cycle

1. **Brainstorm** — les questions avant les réponses
2. **Spec** — ce qu'on veut, ce qu'on ne veut pas, ce qui est tranché
3. **Plan** — des tâches, chacune avec son test et son commit
4. **TDD** — test rouge, code, test vert
5. **Vérification**, puis **revue** — des preuves, puis un regard humain

<!-- Le plugin superpowers outille chaque étape : brainstorming, writing-plans, executing-plans, test-driven-development, verification-before-completion, requesting-code-review. On l'installe pendant la pratique. -->

---

# Le brainstorm

- `superpowers:brainstorming` sur le ticket
- Claude pose **une question à la fois**, vous tranchez
- Il propose deux ou trois approches, avec leurs compromis
- Pas de code tant que la spec n'est pas validée
- Ce que vous ne voulez pas trancher : vous le dites, et c'est écrit

<!-- Le ticket du repo laisse exprès quatre questions ouvertes. Un bon brainstorm les fait toutes sortir, et au moins une de plus que le ticket ne pose pas, par exemple le fuseau horaire de la date d'échéance. S'il en manque, relisez le ticket avec Claude. -->

---

# La spec : six sections

| Section               | Ce qu'elle dit                                |
| --------------------- | --------------------------------------------- |
| `Intent`              | pourquoi, en deux phrases                     |
| `Goals`               | ce qui est vrai quand c'est fini              |
| `Non-goals`           | ce qu'on ne fait pas cette fois               |
| `Anti-goals`          | ce qui ferait échouer même si tout « marche » |
| `Decided`             | les choix tranchés, avec leur raison          |
| `Left to the builder` | ce que le constructeur tranche, et ses bornes |

<!-- Les anti-goals sont la section la plus utile et la plus oubliée : « une base existante qui ne démarre plus » est un anti-goal ; aucun test unitaire ne le verra si personne ne l'a écrit. -->

---

# La spec : l'ancre contre le momentum

- Phase 1 : au fil de la session, l'agent oublie le cadre du début
- La spec est un fichier : on la relit quand la session dérive
- « Relis la spec » remet l'agent dans le cadre
- Une nouvelle session repart de la spec, pas de la conversation
- La spec est en STE : `npm run lint:doc` la vérifie

<!-- Le momentum de la phase 1 : chaque succès rend l'agent plus sûr, il vérifie moins. La spec est le repère qui ne bouge pas. -->

---

# Le plan

- Des tâches de quelques minutes, dans l'ordre
- Pour chaque tâche : les fichiers, le test, la commande, le commit
- Les interfaces écrites : signatures, JSON des routes, types partagés
- Aucune tâche « TBD » ou « gérer les erreurs »
- `superpowers:writing-plans`, dans une session neuve

<!-- Un bon plan s'exécute sans poser de question. Si l'agent doit deviner une signature, il en invente une, et la tâche suivante en invente une autre. -->

---

# TDD avec un agent

- **Rouge** : le test d'abord, et on le voit échouer
- Il doit échouer **pour la bonne raison** (la feature manque, pas une faute de frappe)
- **Vert** : le code minimal qui le fait passer
- Un test qui n'a jamais échoué ne prouve rien
- L'agent écrit le test et le code : exigez la sortie rouge

<!-- Le piège : l'agent écrit test et code dans le même élan, le test passe du premier coup. On ne sait pas s'il teste quelque chose. Le skill test-driven-development impose l'ordre. -->

---

# Preuves avant affirmations

- « Les tests passent » = la sortie de `npm test`
- « C'est corrigé » = la commande qui le montre
- « La couverture est à 100 % » = le résumé de `npm run test:coverage`
- Pas de « devrait marcher » : on lance, on lit, on cite
- `superpowers:verification-before-completion`

<!-- Un agent affirme avec la même assurance qu'il ait vérifié ou non. La seule différence visible, c'est la sortie de la commande. -->

---

# Git : une tâche, un commit

- Un commit par tâche du plan : code **et** tests ensemble
- Format : `<type>(<scope>): <Subject>`
- Relire `git diff --staged` avant chaque commit
- Une PR = une feature = une spec
- La description de la PR renvoie à la spec et au plan

<!-- Un commit par tâche rend la revue possible : on relit une tâche à la fois, et on peut annuler une tâche sans tout défaire. -->

---

# Les worktrees

- Un dossier par branche, le même dépôt git
- `claude --worktree due-dates`, ou `git worktree add ../dossier -b branche`
- Une session par worktree : `main` reste intact
- Pièges : `npm install` dans chaque worktree, les ports fixes, la base locale
- Utile pour lancer deux agents en parallèle

<!-- Piège de base : par défaut, `claude --worktree` part de la branche par défaut du remote, pas de votre HEAD local. Une spec et un plan commités en local seraient absents. Ce repo met `"worktree": {"baseRef": "head"}` dans `.claude/settings.json`, et la branche s'appelle `worktree-due-dates`. Vérifiez avec `git log --oneline` dans le worktree. Les ports 3000 et 5173 sont fixes : une seule API à la fois. Arrêtez celle de main avant de lancer celle du worktree. -->

---

# Sous-agents : quand déléguer

- Du travail indépendant, à lancer en parallèle
- Une lecture de beaucoup de fichiers : vous gardez la conclusion
- Une revue qui ne doit pas être influencée par la vôtre
- **Pas** pour trois commandes que vous lanceriez vous-même
- Chaque délégation perd du détail et coûte des tokens

<!-- Le sous-agent ne voit que votre prompt, et vous ne voyez que son rapport. Ses erreurs reviennent avec la même assurance que ses trouvailles. -->

---

# Sous-agents : quoi leur dire

- Le but, et pourquoi
- Ce que vous avez déjà exclu
- Les fichiers à lire, le périmètre exact
- Le format du rapport attendu
- Le code à relire, pas votre conclusion à confirmer

<!-- Un sous-agent à qui on donne son hypothèse revient presque toujours avec l'hypothèse confirmée. Pour une revue indépendante, donnez le diff et la spec, pas votre avis. -->

---

# La revue en trois couches

1. **Les garde-fous automatiques** : la machine vérifie
2. **L'agent se relit** : avant de rendre la main
3. **L'humain relit l'agent** : par le risque, avec la spec

Chaque couche attrape ce que la précédente laisse passer.

<!-- L'ordre compte : la machine d'abord, parce qu'elle ne coûte rien. L'agent ensuite, pour les erreurs qu'il sait voir. L'humain en dernier, sur ce qui reste : le sens, le risque, l'écart à la spec. -->

---

# Couche 1 : les garde-fous automatiques

- Lint, build, tests : `npm run lint`, `npm test`
- Couverture à 100 % : `npm run test:coverage`
- Pas de mocks : une vraie base en mémoire
- Vulnérabilités : `npm audit --omit=dev`
- Lint de la doc : `npm run lint:doc`

<!-- Tout ce qu'une machine peut vérifier, ne le vérifiez pas à l'œil. La couverture à 100 % ne prouve pas que les tests sont bons, mais elle prouve qu'aucune ligne n'a été oubliée. -->

---

# Couche 2 : l'agent se relit

- `/code-review` avant de rendre la main
- Il cite la sortie des commandes, il n'affirme pas
- Une critique reçue : il la **vérifie** au lieu de céder
- Il peut contester une critique fausse, preuve à l'appui
- `superpowers:receiving-code-review`

<!-- Un agent qui dit « vous avez raison » à chaque remarque introduit des bugs pour faire plaisir. On veut qu'il relise le code et réponde avec un fait. -->

---

# Couche 3 : l'humain relit l'agent

- Relire par le risque : données, migration, sécurité d'abord
- La spec ouverte à côté du diff
- Des PR petites : une feature, un commit par tâche
- Lire les tests avant le code : que vérifient-ils vraiment ?
- Ce qu'on traque dans du code d'agent : diapo suivante

<!-- Votre temps de revue est limité : mettez-le là où une erreur coûte cher. Une migration ratée perd des données, un écran mal aligné se corrige en une minute. Les tests disent ce que l'agent a cru devoir prouver : lisez-les en premier. -->

---

# Ce qu'on traque (1/2)

- **Initiatives non demandées** : une option, une route, un fichier en plus
- **Fallbacks qui cachent une erreur** : `?? 0`, `catch` vide
- **`as`, `!`, `any`** : le compilateur réduit au silence
- **Abstraction de trop** : un helper générique pour un seul appel

<!-- Ce sont les défauts typiques du code d'agent : il veut que ça marche, alors il ajoute un défaut, un cast, une option « au cas où ». -->

---

# Ce qu'on traque (2/2)

- **Code mort** : une fonction que plus rien n'appelle
- **Commentaires** : qui répètent le code
- **Tests vides** : sans `expect`, ou qui vérifient la valeur qu'ils viennent d'écrire
- Chaque trouvaille : un commentaire de revue, classé

<!-- Un test qui insère une valeur puis vérifie qu'elle est là ne teste pas la feature. Lisez ce que le test prouve, pas son nom. -->

---

# La spec comme référence de revue

- Tout commentaire est un **écart à la spec** ou un **trou dans la spec**
- Écart : le code ne fait pas ce que la spec dit → on corrige le code
- Trou : la spec ne disait rien → on complète la spec, puis le code
- Ni l'un ni l'autre : c'est une préférence, discutez-la ou laissez-la

<!-- Ce classement évite les revues de goût. Il améliore aussi la spec suivante : les trous reviennent souvent aux mêmes endroits. -->

---

# La revue est le goulot

- L'agent écrit plus vite que vous ne relisez
- Relire vite s'apprend, comme coder
- Petites PR, un commit par tâche, la spec à côté
- Un risque connu se relit ligne par ligne, le reste en survol
- La revue qu'on saute devient un bug en production

<!-- Le goulot n'est plus l'écriture. Investir dans la spec et dans les garde-fous, c'est réduire ce qu'il reste à relire à la main. -->

---

# Démo : Vortex

- Une spec et un plan réels, dans `docs/superpowers/`
- L'exécution du plan en TDD, un commit par tâche
- `/code-review`, puis la relecture humaine
- La PR et sa description

---

# Pratique guidée

```bash
git clone https://github.com/Vortex-Fiction/claude-code-formation-03-spec-plan-revue.git
cd claude-code-formation-03-spec-plan-revue
npm install
claude
```

Dans Claude Code : `/plugin install superpowers@claude-plugins-official`

On fait ensemble l'exercice 1 : `exercices/01-brainstorm-spec.md`

---

# Exercices à faire chez soi

- `exercices/02-plan.md` — le plan, tâche par tâche
- `exercices/03-executer.md` — TDD dans un worktree, un commit par tâche
- `exercices/04-revue-et-pr.md` — trois couches de revue, puis la PR
- Une réponse possible : la branche `solution`

Gardez une réussite à partager en ouverture de la phase 4.

---

# La suite : Phase 4 — Investiguer, scripter, capitaliser

- Un incident : reproduire → hypothèse → vérifier → corriger → valider
- Les mutations vont à l'humain, jamais à l'agent
- Les scripts de migration : dry-run d'abord, idempotents
- Ce qu'on refait deux fois devient un skill
