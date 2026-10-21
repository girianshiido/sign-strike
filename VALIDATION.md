# Validation de Sign Strike 1.0

## Contrôles mathématiques et sauvegarde

- TypeScript strict : compilation sans erreur.
- **169 tests automatisés** : les onze exemples de référence, 120 missions éditoriales, normalisation des rationnels, comparaisons exactes, multiplicités simples/doubles/triples, pôles pairs/impairs, facteurs communs, quotients imbriqués, puissances nulles et préservation du domaine original.
- **1 200 défis procéduraux** (200 graines par monde) : reproductibilité et vérification indépendante de chaque cellule par évaluation rationnelle de l’AST source. Le calcul des signes du jeu reste symbolique.
- Sauvegarde : données corrompues, version inconnue, fraction invalide, incohérence des cellules, meilleurs scores et refus de stockage.

## Parcours du navigateur

Le script `scripts/browser-qa.mjs` utilise un profil temporaire isolé et les véritables boutons du jeu.

- 120 missions résolues à travers les phases Couper → Signes → Sélection → Attaque, déblocage progressif jusqu’au dernier boss.
- Vérification de l’ensemble affiché et de trois étoiles pour chaque résolution exacte.
- Erreur de coupure diagnostiquée avant les erreurs de signes ; correction possible sans effacement des autres données.
- Annuler/refaire, modification d’une coupure, reprise après rechargement, recommencer, écran des succès, persistance des 120 meilleures notes.
- Entraînement, pauses d’Arcade, indices et reproductibilité du signal quotidien.
- Formats 320 × 568, 390 × 844, 768 × 1024, 1024 × 768 et 1280 × 850 ; absence de débordement horizontal sur les écrans secondaires.
- Commandes essentielles de la première mission visibles dans le format 320 × 568.
- Réglages de contraste et de mouvement réduit persistants.

## Production, PWA et réactivité

Le script `scripts/pwa-qa.mjs` vérifie la version statique de production, indépendamment du serveur de développement.

- Manifeste et icônes détectés ; aucune erreur d’installabilité signalée par Chromium.
- Huit adresses précachées, dont la page d’entrée, le JavaScript, la feuille de style et les icônes.
- Rechargement sans réseau, reprise d’une mission et victoire exacte entièrement hors ligne.
- Pause effective et sauvegarde conservée.
- 24 interactions consécutives sous ralentissement CPU ×6 : environ **54 ms de médiane**, **84 ms au maximum**, temps incluant la commande du navigateur. Ce contrôle mesure la réponse aux commandes ; ce n’est pas une mesure de fréquence d’affichage ni un résultat obtenu sur un téléphone physique.
- Pas d’exception JavaScript lors des scénarios vérifiés.

## Publication

Dépôt indépendant `girianshiido/sign-strike`, contenu de production dans `main:/docs`. La procédure vérifie le SHA du build GitHub Pages, l’état du workflow, l’égalité des fichiers publics et les fonctions PWA sur l’adresse HTTPS.

Les rapports détaillés et captures sont produits localement dans `test-results/`, dossier volontairement exclu du dépôt. Les scénarios sont fournis dans `scripts/` et les tests unitaires dans `src/tests/`.

## Limites et fonctionnalités volontairement non proposées

- Les racines irrationnelles et les sommes générales de quotients sont exclues de cette première version, conformément à l’option de périmètre exact prévue au cahier des charges. Aucun niveau ne les demande.
- Pas de musique de fond, d’achat, de publicité, de serveur, de synchronisation de progression ou de classement mondial. Les sons sont de courts effets synthétisés.
- Pas de test sur un téléphone/tablette physique ; pas de certification exhaustive Safari iOS ou lecteur d’écran. Les commandes HTML sont navigables au clavier et le jeu respecte la réduction de mouvement.
- Les calculs, fractions, phases et modes sont implémentés ; les performances et l’installation varient selon l’appareil et le navigateur.
