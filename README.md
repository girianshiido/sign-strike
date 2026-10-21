# SIGN STRIKE — La guerre des signes

Jeu de mathématiques en français pour la Seconde et la Première : trouver les valeurs critiques, attribuer les signes, sélectionner les intervalles **et séparément les points**, puis déclencher une attaque électrique pour défendre une cité numérique.

## Jouer

- **Campagne** : six mondes, vingt missions conçues par monde, progression enregistrée, six boss et trois étoiles par mission.
- **Entraînement** : choix de compétence, niveaux générés de manière reproductible, sans chronomètre.
- **Arcade** : 180 secondes au départ, +20 secondes par réussite, série et record personnel ; pause et indices arrêtent le temps.
- **Signal du jour** : générateur v1 déterministe à partir de la date locale.
- **Succès et maîtrise** : onze succès, compteurs réels et statistiques par compétence.

À l’étape **Couper**, toucher une graduation pose une lame ; la saisie exacte permet les fractions et dispose d’un clavier tactile facultatif. Choisir ◆ pour un zéro et × pour une valeur interdite. Toucher une lame ou la choisir dans le menu permet de changer sa valeur exacte, sa nature, de la supprimer ou de la déplacer avec − et +. Modifier les coupures remet les signes et les sélections à zéro, car les intervalles changent.

À l’étape **Signes**, toucher une région alterne `? → + → − → ?`. Des commandes détaillées offrent des boutons agrandis pour les intervalles rapprochés. Un brouillon facultatif permet d’étudier les facteurs. Au monde 4, saisir aussi le discriminant calculé dans le scanner.

À l’étape **Sélection**, toucher les régions à activer puis les zéros à inclure. Les points interdits ne sont jamais sélectionnables. Un zéro peut être choisi seul. Laisser toutes les cellules éteintes représente l’ensemble vide.

**SIGN STRIKE** valide dans l’ordre : coupures/nature, discriminant, signes, intervalles, points. Une erreur ouvre un diagnostic ciblé, sans effacer la résolution. Les indices progressifs et la correction détaillée sont accessibles à la demande. Annuler/refaire conserve jusqu’à 60 états. Les succès et meilleures étoiles ne sont pas retirés lorsqu’on rejoue.

## Développement

Node.js ≥ 22.12 et pnpm 11 :

```sh
pnpm install
pnpm dev
pnpm typecheck
pnpm test
pnpm build
pnpm preview
```

`pnpm build` génère le site statique dans `docs/`, avec manifeste, icônes et service worker versionné par le contenu. Aucun service tiers ni backend. Aucun CDN ou police distante.

Les commandes navigateur :

```sh
pnpm exec playwright install chromium
pnpm dev --port 5198
# Dans un autre terminal :
pnpm qa
```

`CHROME_PATH` peut préciser un navigateur Chromium installé. `QA_URL` permet de viser l’aperçu de production ou l’URL publiée. Les profils de test temporaires sont isolés des données utilisateur. Le scénario parcourt les 120 missions à travers les commandes publiques et contrôle la reprise, les erreurs, les réglages et cinq dimensions d’écran.

## Architecture et exactitude

- `src/math/exact.ts` : rationnels normalisés en `BigInt`, opérations, tri et racines carrées rationnelles exactes.
- `src/math/engine.ts` : AST source, analyse indépendante du rendu, racines/multiplicités, domaine original et cellules canoniques.
- `src/levels/catalog.ts` : 120 missions éditoriales et générateur à graine stable (v1).
- `src/game/answer.ts` : état de réponse et diagnostics ordonnés.
- `src/storage/save.ts` : sauvegarde locale versionnée, progression, réglages et statistiques.
- `src/render/scene.ts` : décor Canvas, ville, ennemis et effets limités à 650 ms ; dessin à la demande, ratio de pixels plafonné à 1,5.
- `src/audio/sound.ts` : effets Web Audio facultatifs, amorcés après une action volontaire.
- `src/main.ts` : écrans, commandes HTML accessibles, machine de phases et pauses.

La v1 prend en charge produits, quotients, puissances entières de 0 à 8, opposés, facteurs affines et polynômes développés de degré au plus 2 à racines rationnelles ou sans racines réelles. Les sommes ne contenant pas de quotient sont converties en polynômes ; les sommes de fractions et les racines quadratiques irrationnelles sont **hors périmètre** et refusées explicitement. Les missions et le générateur respectent ce domaine. Les fractions du rendu sont exactes ; `Number` intervient seulement dans la projection graphique.

Le signe est calculé algébriquement depuis les coefficients dominants et la parité des multiplicités. Une traversée dédiée à l’expression source préserve les exclusions du domaine, même en cas de facteur commun ou de quotient imbriqué. Les tests évaluent indépendamment l’AST à des rationnels dans chaque cellule : cet échantillonnage vérifie le calcul symbolique et ne le remplace pas.

L’ensemble solution est une union normalisée d’intervalles et de points isolés. Les infinis restent ouverts. Les onze exemples du cahier des charges sont testés ; 120 missions et 1 200 défis générés sont contrôlés.

## Sauvegarde et confidentialité

Données conservées dans `localStorage` sous `sign-strike-save-v1` : progression, meilleurs scores, compétences, préférences, graine et réponse active. Aucune identité d’élève ni transmission analytique. Une sauvegarde invalide est récupérée avec des valeurs par défaut. Un stockage indisponible est annoncé ; la session reste jouable. La réinitialisation demande une confirmation dans le jeu.

## PWA et mises à jour

Après une première visite réussie en HTTPS, le service worker précache la totalité du petit site : campagne, moteurs, icônes et menus. Le jeu et sa sauvegarde fonctionnent hors ligne. L’installation dépend du navigateur : menu Installer sur Android/ordinateur, Partager → Sur l’écran d’accueil sur iOS.

Une nouvelle version ne force pas le rechargement d’une partie. Elle prend le relais quand les anciens onglets sont fermés. Le nom de cache dérive des fichiers de production. La pause interrompt le chronomètre et les animations ; une page masquée se met effectivement en pause. Les préférences de mouvement réduit et de contraste sont prises en charge.

## Publication GitHub Pages

Le dépôt utilise `main:/docs`, avec `.nojekyll` et chemins relatifs. Les fichiers de production sont versionnés. Après toute modification :

```sh
pnpm typecheck
pnpm test
pnpm build
git add src public scripts docs index.html package.json pnpm-lock.yaml
# Créer un commit, puis pousser sur main.
```

Dans GitHub → Settings → Pages : **Deploy from a branch**, branche **main**, dossier **/docs**. Le workflow `checks.yml` vérifie TypeScript, les tests et la reproductibilité du build. Vérifier le SHA du build Pages et les fichiers servis avant d’annoncer une publication.

## Limites connues

- Racines irrationnelles et sommes générales de quotients non proposées.
- Pas de musique de fond ni de classement mondial ; effets sonores synthétisés et records locaux.
- Les tests de navigateur simulent les formats et le toucher. Ils ne constituent pas un essai sur téléphone ou tablette physiques, ni une validation exhaustive de Safari iOS.
- Pour les graduations rapprochées, utiliser les commandes détaillées et la saisie exacte plutôt que la seule précision de l’axe.

Le cahier des charges fourni est conservé dans `SPECIFICATIONS.md`. Voir `VALIDATION.md` pour les vérifications réalisées et leurs limites.
