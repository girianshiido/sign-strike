# SIGN STRIKE — Cahier des charges intégral pour développement dans ChatGPT Work

**Version :** 1.0 — 22 octobre 2026  
**Nature du document :** spécifications produit, pédagogiques, mathématiques, ergonomiques et techniques.  
**Destinataire :** agent de développement en mode Work.  
**Objectif :** créer une application web **jouable, complète, esthétique et réellement formatrice**, et non une maquette, un QCM déguisé ou une simple visualisation de tableaux de signes.

---

## 0. Instruction principale à l'agent Work

Tu es chargé de **concevoir, coder, tester et livrer SIGN STRIKE**, jeu de mathématiques de lycée, en **TypeScript**, responsive, installable comme application web progressive (PWA), jouable à la souris comme au doigt, optimisé pour les téléphones et tablettes peu puissants et déployable sur **GitHub Pages**.

**N'attends pas qu'un détail mineur soit précisé pour avancer :** prends des décisions de conception raisonnables, explicite-les et implémente-les. Conserve les principes non négociables de ce cahier des charges. Si l'accès au dépôt GitHub ou la publication nécessitent une autorisation, prépare l'application et les instructions de déploiement, sans prétendre qu'elle est publiée tant que ce n'est pas vérifié.

**Ordre de priorité impératif :**

1. **Exactitude mathématique** des solutions, signes, racines, pôles, multiplicités, ensembles et bornes.
2. **Jouabilité et qualité de l'interaction tactile** : compréhension immédiate, actions directes, retour visuel satisfaisant.
3. **Apprentissage effectif**, avec progression, feedback explicatif et activité mathématique non triviale.
4. **Fluidité et robustesse** sur équipements mobiles modestes.
5. **Polissage audiovisuel**, variété des niveaux, succès et persistance.

N'implémente pas seulement un menu et quelques niveaux fictifs. Le **premier livrable doit permettre de jouer une boucle complète** : lire une inéquation, trouver les valeurs critiques, découper l'axe, identifier les signes, choisir l'ensemble des solutions, lancer l'attaque, recevoir un diagnostic, obtenir une récompense et passer au niveau suivant. Ensuite, enrichis le jeu par étapes jusqu'aux six mondes prévus.

---

## 1. Vision du jeu

### 1.1. Pitch

**SIGN STRIKE — La guerre des signes** est un **jeu d'arcade tactique mathématique**. Une cité numérique est menacée par des créatures apparaissant le long d'un axe réel. Le joueur manipule directement cet axe : il **pose des coupures aux valeurs critiques**, reconstitue les signes d'une expression, puis **électrifie les portions de l'axe qui constituent l'ensemble des solutions** d'une inéquation.

Un placement correct produit une explosion visuelle, des chaînes d'éclairs, des combos et des récompenses. Une erreur déclenche une contre-attaque, mais donne surtout une **explication mathématique précise**.

La notion enseignée n'est pas un prétexte : le joueur doit effectivement apprendre à **résoudre des inéquations, étudier le signe des expressions et construire des tableaux de signes**.

### 1.2. Promesse au joueur

- Comprendre le principe en moins de 30 secondes.
- Jouer une mission en **15 à 45 secondes** au début, sans longs écrans de texte.
- Réaliser des actions **directement sur l'axe** : toucher, faire glisser, sélectionner, frapper.
- Ressentir un progrès : ce qui exigeait une aide devient spontané.
- Recommencer pour améliorer son score, gagner trois étoiles ou compléter des défis.

### 1.3. Public et programme

- Principalement **Seconde et Première** ; contenu d'approfondissement utilisable en Terminale.
- Départ accessible à un élève connaissant le calcul littéral et les équations affines.
- Parcours complet : expressions affines, produits, polynômes du second degré, produits à facteurs multiples, quotients, valeurs interdites, racines multiples, cas particuliers.
- Parcours de pratique différenciée : apprentissage guidé, entraînement autonome, arcade chronométré, défi infini.

### 1.4. Ce que SIGN STRIKE n'est pas

- Pas un QCM permanent : le joueur **construit** son ensemble solution.
- Pas un simulateur affichant d'avance les racines et les signes.
- Pas un jeu de vitesse pure où le joueur n'a pas le temps de réfléchir.
- Pas une application dans laquelle il suffit de cliquer partout jusqu'à réussir.
- Pas un simple exercice sur fond spatial : il faut **une mise en scène de jeu arcade cohérente**.

---

## 2. Boucle de jeu fondamentale

Une mission standard comporte cinq phases. Les deux premières deviennent plus exigeantes au fil de la progression.

### Phase A — Observer

L'écran présente une **inéquation** en haut et un axe gradué au centre, avec des ennemis visuellement similaires répartis de part et d'autre des valeurs critiques. **Leur emplacement ne doit jamais révéler la solution**.

Exemple :

\[
(x+2)(x-1)\leq 0.
\]

Le joueur aperçoit l'axe, une jauge de combo, un compteur de coups, un bouton d'aide et un bouton « Attaque » initialement inactif.

### Phase B — Couper l'axe

Le joueur doit découvrir les **valeurs critiques** : racines des facteurs et, plus tard, zéros du dénominateur. Il touche l'axe pour planter une « lame de coupure ».

Exemple : placer des lames en \(-2\) et \(1\).

- Les coupures s'aimantent sur les graduations accessibles au niveau considéré.
- Une **saisie exacte de fraction ou de radical** est proposée si le placement direct manque de précision ; ce n'est pas une liste de bonnes réponses.
- Le système distingue les types de marqueurs : **zéro de l'expression** / **valeur interdite** ; leurs styles diffèrent.
- Dans les niveaux de découverte, une construction guidée montre comment trouver une racine ; ensuite, cette aide est masquée.
- Le moteur mathématique conserve les valeurs exactes : le placement graphique n'est qu'une représentation.

Le jeu ne doit pas attribuer un point pour une réponse « assez proche » mathématiquement erronée ; l'aimantation s'applique à des valeurs explicitement disponibles ou à une valeur calculée et saisie exactement.

### Phase C — Déterminer les signes

L'axe est découpé en intervalles ouverts. Le joueur attribue à chacun un **signe positif ou négatif** de l'expression. Selon le monde, il peut aussi construire les **lignes des signes des facteurs** avant d'obtenir celle du produit ou du quotient.

Interactions privilégiées :

- Toucher un intervalle pour alterner `? → + → − → ?` ; ou toucher un outil « + » / « − » puis peindre les intervalles correspondants.
- Les deux commandes doivent être adaptées au tactile et fonctionner sans glissement imposé.
- Appui sur un facteur pour afficher **son influence** (aide progressive seulement).
- Passage d'une racine de multiplicité impaire : inversion du signe ; multiplicité paire : conservation. Le moteur doit le respecter même dans les cas atypiques.

**Important :** la phase C doit exiger une décision du joueur et ne jamais être entièrement résolue automatiquement dans les mondes avancés.

### Phase D — Désigner les solutions

Une fois le signe établi, le joueur sélectionne les intervalles qui vérifient l'inéquation (`<`, `≤`, `>`, `≥`) et **inclut/exclut séparément les points critiques**.

Exemples :

- Un zéro peut appartenir aux solutions si l'inégalité est large.
- Une valeur interdite n'appartient **jamais** aux solutions.
- Une racine de multiplicité paire peut être **une solution isolée** : le joueur doit pouvoir la sélectionner sans sélectionner les intervalles voisins.
- Les solutions peuvent être : un intervalle, plusieurs intervalles, un singleton, \(\varnothing\) ou \(\mathbb R\) (hors éventuels points exclus du domaine).

**L'interface doit représenter les intervalles ouverts et les points frontières comme des objets distincts.** C'est indispensable à la rigueur mathématique.

### Phase E — Frapper et apprendre

Le joueur appuie sur **« SIGN STRIKE ! »** :

1. Le jeu valide séparément les coupures, les signes et l'ensemble sélectionné.
2. Les zones correctes se chargent d'énergie et une attaque électrique se déclenche.
3. Si tout est correct : élimination des ennemis concernés, combo, étoiles, expérience et accès au défi suivant.
4. Si une erreur existe : animation courte de contre-attaque, puis **diagnostic localisé** : racine erronée, signe incorrect sur un intervalle, racine double, valeur interdite incluse, mauvaise borne, etc.
5. L'élève peut **corriger sans recommencer toute la mission**, avec réduction éventuelle du score.

Pour ne pas confondre vitesse et acquisition des connaissances, le chronomètre est **facultatif en mode Apprentissage** et activé pour le mode Arcade.

---

## 3. Commandes et « game feel »

### 3.1. Interactions dominantes

| Action du joueur | Effet visuel | Rôle mathématique |
|---|---|---|
| Toucher une graduation | Plante une lame d'énergie | Marquer une racine ou valeur interdite |
| Toucher une région | Change sa polarité visuelle | Établir le signe de l'expression |
| Toucher une région en mode sélection | Installe un champ électrique | Sélectionner un intervalle solution |
| Toucher un point critique | Active/désactive un petit bouclier | Inclure/exclure une borne ou un singleton |
| Toucher « STRIKE » | Décharge électrique et combo | Soumettre une résolution complète |
| Toucher un élément fautif après résultat | Explication focalisée | Comprendre/corriger l'erreur |

### 3.2. Règles d'ergonomie essentielles

- **Le toucher simple suffit** pour toutes les opérations ; le balayage est une commodité, jamais le seul moyen de jouer.
- Un mode « déplacer une lame » permet de corriger la position avec boutons `−` et `+`, et saisie exacte.
- Cibles tactiles d'environ **44 × 44 px CSS au minimum** quand cela est possible ; pour axes denses, utiliser zones agrandies, loupe, zoom ou panneau de contrôle accessible.
- Un geste erroné doit être **annulable** (`Annuler`, `Refaire`).
- Afficher clairement le **mode actif** : « Couper », « Signes », « Sélection », « Attaquer » ; éviter les outils à état caché.
- Pas de manipulation par glissade nécessitant une grande précision sur écran de petite taille.
- Accessible à la souris, au clavier et aux technologies d'assistance par des contrôles alternatifs explicites.
- Ne jamais mettre l'enjeu mathématique sous une surcouche d'effets visuels.

### 3.3. Animation et sensations

- Placement d'une lame : petit impact lumineux, onde brève, son discret.
- Changement de signe : bascule de polarité et impulsion circulant sur l'intervalle.
- Enchaînement de régions correctement sélectionnées : arcs électriques en cascade.
- Réussite : explosion contenue, score qui monte, étoiles révélées progressivement.
- Échec : effet court, **sans flash agressif**, puis indication calme et exacte.
- Les animations ne doivent pas empêcher de voir l'énoncé ni ralentir le rythme ; option pour les réduire ou les désactiver.

---

## 4. Direction artistique

### 4.1. Univers

**Arcade néon / défense d'une cité numérique** : arrière-plan bleu nuit, axes lumineux, petits adversaires expressifs, lames énergétiques, barrières de polarité, ciel technique discret.

La qualité graphique doit évoquer un **vrai jeu mobile soigné**, non un formulaire éducatif. Éviter néanmoins une surcharge façon machine à sous.

### 4.2. Hiérarchie visuelle

1. Énoncé et objectif mathématique clairement lisibles.
2. Axe large, graduations, lames, intervalles et bornes identifiables.
3. Commandes d'action courtes, placées près du pouce sur mobile.
4. Ressources de jeu et combo en périphérie.
5. Les ennemis enrichissent la scène, mais ne masquent jamais les symboles, graduations ou ensembles.

### 4.3. Palette et accessibilité

- Fond : bleu nuit / anthracite.
- Positive : turquoise **avec symbole `+` affiché**.
- Négative : rose/corail **avec symbole `−` affiché**.
- Racine : jaune/or **et marqueur distinctif**.
- Valeur interdite : violet ou rouge barré **et symbole `×` ou trou**.
- Sélection de solution : halo électrique **plus motif**.

**Ne jamais transmettre une distinction uniquement par la couleur.** Contraste élevé, polices lisibles et option de réduction des animations.

### 4.4. Sons

Effets brefs pour l'impact, le changement de polarité, le combo et la réussite ; musique optionnelle et désactivable. Démarrer le son seulement après une action volontaire. Tout le jeu doit être compréhensible sans audio.

---

## 5. Contenu pédagogique : six mondes

Chaque monde comporte idéalement **20 missions préparées et vérifiées**, soit 120 missions conçues, puis des variantes procédurales et des défis récurrents. Les 20 missions comprennent découverte guidée, pratique autonome, mélanges, puis **boss**. La numérotation exacte peut évoluer après tests.

### Monde 1 — Première coupure

**Notions :** signe de \(ax+b\), racine \(-b/a\), inéquations affines, sens d'une inégalité, bornes strictes/larges.

**Nouveauté :** une lame et deux intervalles.

**Compétences attendues :**

- Résoudre \(ax+b=0\) (avec \(a\neq0\)).
- Reconnaître que le signe dépend de \(a\) et de la position par rapport à la racine.
- Sélectionner correctement l'intervalle, avec inclusion/exclusion du zéro.
- Traiter un coefficient directeur négatif sans erreur de signe.

**Exemple :** \(3x+6>0\), solution \(]-2;+\infty[\).

### Monde 2 — Double impact

**Notions :** produit de deux facteurs affines, deux racines, tableaux de signes à deux lignes, règle des signes, intersection d'informations.

**Nouveauté :** deux coupures et trois régions, propagation visuelle du signe.

**Exemple :** \((x+2)(x-1)\le0\), solution \([-2;1]\).

**Important :** la position graphique des racines peut être simple, mais les facteurs doivent varier : coefficients négatifs, ordre inversé, expressions non moniques.

### Monde 3 — Pièges de signes

**Notions :** racines multiples, puissances paires/impaires, signe des facteurs du type \(a(x-r)^m\), cas \(f(x)\ge0\) et \(f(x)<0\).

**Nouveauté :** certaines coupures **n'inversent pas le signe**, et certains points constituent des solutions isolées.

**Exemples :**

- \(-(x-1)^2<0\) : \(\mathbb R\setminus\{1\}\).
- \(-(x-1)^2\ge0\) : \(\{1\}\).

**Important :** cette mécanique doit être particulièrement soignée : un changement de signe automatique à chaque racine serait mathématiquement faux.

### Monde 4 — L'assaut du second degré

**Notions :** trinôme \(ax^2+bx+c\), forme factorisée, discriminant, \(\Delta>0\), \(\Delta=0\), \(\Delta<0\), signe de \(a\).

**Nouveauté :** « scanner algébrique » utilisé pour **calculer** les racines et non simplement les deviner sur le graphique. Des sous-interactions demandent de déterminer \(\Delta\), puis les racines quand elles existent.

**Exemples :**

- \(x^2-5x+6>0\) : \(]-\infty;2[\cup]3;+\infty[\).
- \(x^2+1\le0\) : \(\varnothing\).
- \(-(x-3)^2\ge0\) : \(\{3\}\).

**Important :** traiter explicitement le cas **sans racines réelles** : l'axe ne reçoit aucune coupure et peut être intégralement positif ou négatif selon le coefficient dominant.

### Monde 5 — Zones interdites

**Notions :** quotient, racines du numérateur, zéros du dénominateur, ensemble de définition, signes d'un quotient, exclusions.

**Nouveauté :** trous/portails interdits sur l'axe ; impossible d'activer un pôle comme point solution.

**Exemples :**

- \(\dfrac{x-2}{x+1}\le0\) : \(]-1;2]\).
- \(\dfrac{x-1}{x-1}>0\) : \(\mathbb R\setminus\{1\}\), **même si l'expression se simplifie formellement en 1 pour \(x\neq1\)**.

**Important :** les restrictions du domaine doivent être **préservées avant toute simplification**. Les facteurs communs numérateur/dénominateur créent éventuellement des trous supprimables, mais ces points demeurent interdits dans l'expression initiale.

### Monde 6 — Chaos algébrique

**Notions :** produits/quotients à plusieurs facteurs, multiplicités, quadratiques factorisables, signes en cascade, solutions disjointes ou isolées.

**Nouveauté :** choix stratégique de l'ordre d'étude des facteurs ; défis limitant les erreurs ou nécessitant une suite de décisions correctes.

**Boss d'exemple :**

\[
\frac{(x+2)(x-1)^2}{x-3}\ge0.
\]

**Solution exacte :**

\[
\boxed{]-\infty;-2]\ \cup\ \{1\}\ \cup\ ]3;+\infty[}.
\]

Cette solution suppose que \(x=3\) demeure strictement exclu, que la racine double \(x=1\) soit sélectionnable **seule** et qu'il n'y ait pas d'inversion du signe au passage de \(1\).

### Défis et niveaux spéciaux

- **Défi « Sans coupure » :** \(x^2+1>0\), \(\mathbb R\).
- **Défi « Aucune solution » :** \(x^2+1<0\), \(\varnothing\).
- **Défi « Point solitaire » :** expression négative ou nulle uniquement en une racine double.
- **Défi « Domaine piégé » :** quotient présentant un facteur simplifiable mais un point toujours exclu.
- **Défi « Racines inversées » :** facteurs écrits sous la forme \(r-x\), forçant à tenir compte du coefficient négatif.

---

## 6. Progression pédagogique, aides et vérification de l'apprentissage

### 6.1. Échafaudage pédagogique

- **Premières missions d'un nouveau mécanisme :** démonstration interactive, courte, jouable.
- **Missions intermédiaires :** aide disponible sur demande, avec pénalité d'étoiles limitée.
- **Missions de maîtrise :** autonomie réelle, sans indices affichés automatiquement.
- **Boss :** combinaison des compétences précédentes, avec explication détaillée en cas d'erreur.

### 6.2. Aides à plusieurs niveaux

1. **Indice conceptuel**, sans valeur numérique : « Cherche d'abord où chaque facteur s'annule. »
2. **Indice opératoire :** « Résous \(x+2=0\) pour ce facteur. »
3. **Explication guidée :** montre le calcul et la règle du changement de signe.

En mode Arcade, les indices peuvent interrompre le chronomètre ou désactiver le record ; ne pas en faire un piège pénalisant les élèves en apprentissage.

### 6.3. Diagnostic explicatif différencié

Exemples de messages attendus :

- « Tu as placé une coupure en \(2\), alors que \(x+2=0\) donne \(x=-2\). »
- « Ici, \((x-1)^2\) reste positif de part et d'autre de \(1\) ; le signe ne change donc pas. »
- « \(x=3\) annule le dénominateur : cette valeur ne peut pas appartenir à l'ensemble solution. »
- « Tu as choisi un intervalle où l'expression est positive, alors que l'inéquation demande un résultat négatif ou nul. »
- « Les valeurs où le produit est nul doivent être incluses pour \(\le\), sauf si l'expression n'est pas définie. »

Ne pas révéler toute la solution avant que le joueur ait pu essayer et corriger, sauf s'il demande explicitement une correction détaillée.

### 6.4. Indicateurs de maîtrise locaux

Conserver localement, par compétence : nombre de tentatives, bonnes réponses autonomes, erreurs récurrentes, vitesse facultative en Arcade, utilisation des indices, dernier entraînement. Présenter un récapitulatif simple : « Racines simples : maîtrisé », « Valeurs interdites : à retravailler ».

Ne pas confondre **temps de résolution** et maîtrise. Les réussites exactes sans aide et les capacités transférables entre expressions sont prioritaires.

---

## 7. Structure des niveaux et génération procédurale

### 7.1. Deux familles

1. **Niveaux éditoriaux** : entièrement conçus, commentés et testés ; ils apprennent une notion dans un ordre intentionnel.
2. **Niveaux procéduraux** : générés à partir de gabarits rigoureusement contraints et vérifiés, pour rejouabilité, survie et entraînement ciblé.

### 7.2. Contraintes de génération

- Générer d'abord une **structure mathématique résoluble et validable**, puis son affichage.
- Définir des gammes de racines et coefficients adaptées à chaque monde.
- Éviter les expressions inutilement énormes, les graduations illisibles et les cas hors programme avant leur introduction.
- Pour les premiers mondes : coefficients entiers modestes et racines entières, puis rationnelles simples.
- Pour les niveaux avancés : rationalité exacte ; radicaux uniquement après prise en charge rigoureuse de leur comparaison et de leur affichage.
- Écarter les niveaux répétitifs, dégénérés involontaires ou présentant une difficulté accidentelle.
- Garantir que tous les niveaux ont une réponse exacte calculable par le moteur et vérifiée par des tests.
- Sauvegarder la graine aléatoire pour **rejouer à l'identique** un défi, reproduire les erreurs et comparer les scores.
- **Ne jamais attribuer la solution d'un défi au seul résultat d'un échantillonnage numérique approximatif.**

### 7.3. Échelle de difficulté

La difficulté augmente sur plusieurs dimensions, indépendamment : nombre de racines, nombre de facteurs, signe des coefficients, multiplicité, valeurs interdites, notation développée/factorisée, dénominateurs, nature des solutions, exigence d'autonomie et présence de distracteurs algébriques.

Éviter l'augmentation artificielle fondée uniquement sur un chronomètre plus court.

### 7.4. Données d'un niveau

Chaque niveau doit stocker au minimum :

- identifiant et monde ;
- expression mathématique **structurée**, pas seulement une chaîne LaTeX ;
- opérateur relationnel ;
- domaine d'origine ;
- racines, valeurs interdites et multiplicités ;
- découpage canonique de la droite réelle ;
- signe exact de l'expression sur chaque intervalle ;
- appartenance de chaque point critique à l'ensemble solution ;
- ensemble solution exact ;
- graine de génération ;
- objectifs pédagogiques, aides et diagnostics ;
- paramètres de difficulté et score maximal théorique.

---

## 8. Moteur mathématique : exigences non négociables

### 8.1. Représentation symbolique

Créer une représentation en arbre (AST) pour les constantes rationnelles, variable \(x\), additions, produits, puissances entières non négatives, opposés et quotients. On peut limiter le domaine initial à une **classe clairement définie d'expressions rationnelles à coefficients rationnels** dont les zéros et pôles sont calculables exactement.

Séparer trois couches :

1. **Expression source** (dont dépend le domaine de définition).
2. **Analyse algébrique exacte** (zéros, pôles, signes, conditions).
3. **Affichage** (LaTeX/MathML/texte accessible, positions sur l'axe).

Un affichage arrondi ne doit **jamais** devenir la valeur calculée dans le modèle.

### 8.2. Arithmétique exacte

- Favoriser des **rationnels normalisés** utilisant `BigInt` (numérateur et dénominateur premiers entre eux ; dénominateur strictement positif).
- Calculer les racines rationnelles sans flottants quand le gabarit les garantit.
- Pour les racines quadratiques irrationnelles, soit implémenter une représentation exacte de type \((p+q\sqrt d)/r\) avec comparaisons sûres, soit **ne pas en générer** avant la livraison de cette fonctionnalité.
- `Number` est acceptable pour l'animation et la projection sur l'axe, pas comme source unique de vérité algébrique.
- Contrôler les limites de taille pour éviter calculs coûteux et dépassements de capacités UI.

### 8.3. Invariants des signes

Pour des facteurs \((x-r)^m\), le signe change au passage de \(r\) **si et seulement si la multiplicité totale pertinente est impaire**, en tenant compte des facteurs du numérateur et du dénominateur. Pour un quotient, les zéros du dénominateur restent **exclus**, même si une simplification algébrique ferait disparaître le facteur à l'affichage.

Cas à vérifier :

- racine simple : changement de signe ;
- racine double : pas de changement ;
- racine triple : changement ;
- zéro du dénominateur d'ordre pair : valeur interdite sans changement de signe ;
- zéro du dénominateur d'ordre impair : valeur interdite avec changement de signe ;
- zéro commun numérateur/dénominateur : déterminer les signes des intervalles, mais **conserver l'interdiction au point** ;
- absence de zéros : signe constant sur chaque composante connexe du domaine ;
- produit dont le facteur constant est négatif : inversion globale des signes.

### 8.4. Ensemble solution exact

Représenter les solutions comme **union normalisée d'intervalles avec bornes ouvertes/fermées et de points isolés**, ou mieux comme une sélection canonique de cellules : intervalles ouverts et points critiques. Une valeur interdite ne peut jamais être cochée.

Préserver explicitement :

- \(\varnothing\) ;
- \(\mathbb R\) ;
- intervalles non bornés ;
- bornes strictes/larges ;
- singletons ;
- unions disjointes ;
- trous issus du domaine original.

Lors de l'affichage final, produire une écriture usuelle correcte, par exemple \(]-\infty;1[\cup]3;+\infty[\). **Les symboles \(\pm\infty\) ne sont jamais inclus.**

### 8.5. Validation de la réponse du joueur

Évaluer indépendamment :

1. Ensemble des valeurs critiques trouvées (avec leur nature).
2. Signe annoncé sur chaque intervalle.
3. Sélection des cellules appartenant à l'ensemble solution.

Le diagnostic doit pointer la **première erreur mathématiquement pertinente**, sans attribuer à tort une faute à un choix rendu impossible par un découpage initial incorrect.

La validation ne doit jamais déduire la justesse d'une réponse de la position apparente d'un sprite ou d'un arrondi en pixels.

### 8.6. Jeu et rigueur

Les effets visuels peuvent représenter une « propagation » des signes, mais les lois ne doivent pas être inventées pour améliorer le spectacle. **La métaphore est au service de la mathématique, pas l'inverse.**

---

## 9. Exemples mathématiques de référence pour les tests

Ces cas doivent servir à alimenter des **tests unitaires automatisés** du moteur et, pour plusieurs d'entre eux, des niveaux éditoriaux.

| Inéquation | Ensemble solution exact | Point essentiel |
|---|---|---|
| \(3x+6>0\) | \(]-2;+\infty[\) | affine, borne exclue |
| \(-2x+4\ge0\) | \(]-\infty;2]\) | coefficient négatif |
| \((x+2)(x-1)\le0\) | \([-2;1]\) | produit, bornes incluses |
| \(-(x-1)^2<0\) | \(\mathbb R\setminus\{1\}\) | racine double, exclue |
| \(-(x-1)^2\ge0\) | \(\{1\}\) | singleton |
| \(x^2+1>0\) | \(\mathbb R\) | aucun zéro réel |
| \(x^2+1\le0\) | \(\varnothing\) | ensemble vide |
| \(x^2-5x+6>0\) | \(]-\infty;2[\cup]3;+\infty[\) | trinôme, deux racines |
| \((x-2)/(x+1)\le0\) | \(]-1;2]\) | dénominateur interdit |
| \((x-1)/(x-1)>0\) | \(\mathbb R\setminus\{1\}\) | trou malgré simplification |
| \((x+2)(x-1)^2/(x-3)\ge0\) | \(]-\infty;-2]\cup\{1\}\cup]3;+\infty[\) | boss combiné |

Ajouter des tests portant sur les coefficients négatifs, les valeurs interdites d'ordre pair, les puissances impaires, les doubles zéros communs et toutes les comparaisons `<`, `≤`, `>` et `≥`.

---

## 10. Modes de jeu

### A. Campagne — mode principal

- Six mondes avec missions débloquées progressivement.
- Chaque monde introduit une notion avec une brève séquence jouable.
- Boss final et badges de maîtrise.
- Possibilité de **rejouer librement** tout niveau déjà débloqué.

### B. Entraînement libre

- Choix d'une compétence (racines affines, signe d'un produit, trinôme, quotient, etc.).
- Pas de chronomètre obligatoire.
- Feedback pédagogique développé.
- Génération de nouveaux niveaux de difficulté ciblée.

### C. Survie / Arcade

- Séries de niveaux courts.
- Combos, multiplicateurs et effets énergétiques.
- Chronomètre **uniquement ici** ou activé volontairement.
- Les ennemis ne doivent pas menacer le joueur pendant une pause pédagogique involontaire ; prévoir une pause effective.

### D. Défi quotidien (facultatif après MVP)

- Niveau déterministe fondé sur la date locale et une version stable du générateur ; rejouable à l'identique.
- Pas de dépendance serveur.
- Pas de classement mondial fictif.

---

## 11. Scoring, étoiles, progression et succès

### 11.1. Principes

Récompenser d'abord **la justesse autonome**, puis l'efficacité. La vitesse est un bonus de mode arcade, pas une condition nécessaire à la progression pédagogique.

Proposition :

- **3 étoiles** : solution correcte, aucune erreur validée, aucune aide de niveau 3.
- **2 étoiles** : réussite après correction ou avec aide substantielle.
- **1 étoile** : réussite accompagnée de plusieurs erreurs/corrections.
- Le jeu ne retire jamais les étoiles déjà gagnées lorsqu'un niveau est rejoué moins bien.
- Bonus facultatif pour maîtrise régulière, sous condition de réussite exacte.

Ne pas imposer un nombre « optimal » de clics si plusieurs démarches mathématiquement valides existent.

### 11.2. Succès proposés

| Succès | Condition vérifiable |
|---|---|
| **Premier impact** | Réussir le premier niveau |
| **Équilibriste** | Résoudre 20 inéquations affines sans erreur |
| **Double frappe** | Résoudre 20 produits à deux facteurs |
| **Zéro fantôme** | Réussir 10 niveaux à racine double |
| **Roi du discriminant** | Résoudre correctement 20 trinômes |
| **Chasseur de pôles** | Réussir 20 quotients sans inclure de valeur interdite |
| **Le point solitaire** | Réussir 5 niveaux dont la solution est un singleton |
| **Vide absolu** | Trouver correctement 5 ensembles vides |
| **Perfectionniste** | Obtenir 3 étoiles sur 50 missions |
| **Inarrêtable** | Réussir 10 missions Arcade consécutives |
| **Souverain des signes** | Terminer tous les boss de la campagne |

Les succès doivent être **persistants**, non attribués artificiellement et consultables dans une vraie galerie avec état verrouillé/déverrouillé et progression.

### 11.3. Ressources de jeu

Privilégier : étoiles, expérience, titres, effets cosmétiques déverrouillables et records personnels.

Pas de publicités, pas d'achats intégrés, pas de monnaie réelle, pas de mécanique de hasard monétisé, pas de notifications intrusives.

---

## 12. Écrans et parcours UX

### 12.1. Écran d'accueil

- Logo **SIGN STRIKE** avec identité visuelle forte.
- Boutons : **Jouer**, **Entraînement**, **Arcade**, **Succès**, **Réglages**.
- Progression lisible, dernier monde joué, accès « Reprendre ».

### 12.2. Carte des mondes

Six univers visuels distincts mais cohérents ; niveaux en nœuds, état verrouillé/ouvert/terminé, étoiles, boss final. Navigation sans longs défilements inutiles.

### 12.3. Écran de jeu

Disposition de principe :

1. Bandeau : inéquation, niveau, mode, progression.
2. Zone centrale : axe interactif et ennemis.
3. Sous-zone : éventuellement lignes de facteurs ou affichage synthétique des signes.
4. Bas : actions « Couper / Signes / Sélection », « Annuler », « Indice », « STRIKE ».
5. Panneau de résultat : étoiles, erreur précise, « Corriger », « Rejouer », « Suivant ».

**Portrait mobile prioritaire**, mais paysage tablette/ordinateur confortable. Aucun texte tronqué sur écrans de 320 px de largeur.

### 12.4. Tutoriels

Tutoriels courts, interactifs, intégrés aux premières missions. Éviter les pages de consignes avant toute action ; apprendre par l'action.

### 12.5. Historique et statistiques

Page sobre indiquant mondes parcourus, étoiles obtenues, succès, compétences à retravailler, records et bouton de réinitialisation confirmé.

### 12.6. Réglages

Volume / effets sonores, animations réduites, contraste, niveau de guidage, affichage des fractions, confirmation de réinitialisation. Les préférences sont sauvegardées localement.

---

## 13. Architecture technique recommandée

### 13.1. Pile

- **TypeScript strict**.
- **Vite** pour développement et build.
- **Canvas 2D** pour axe, ennemis, particules et effets animés ; HTML/CSS/SVG ou MathML/KaTeX selon besoin pour contrôles et expressions lisibles.
- Un moteur mathématique **indépendant du rendu**.
- Tests unitaires (par exemple **Vitest**) et tests de parcours navigateur (par exemple **Playwright**).
- Gestion PWA et service worker pour fonctionnement hors ligne.
- Pas de backend nécessaire au jeu de base.

Éviter un moteur 3D, une physique lourde et des bibliothèques excessives. Si un framework UI est retenu, justifier son coût en performances et le garder découplé du Canvas.

### 13.2. Modules logiques

```text
src/
  app/              # bootstrap, routes/écrans, état applicatif
  math/             # rationnels exacts, AST, racines, signes, solutions
  levels/           # niveaux éditoriaux, gabarits, générateur, validateurs
  game/             # machine à états, interactions, score, progression
  render/           # axe, sprites, particules, effets, animations
  ui/               # boutons, panneaux, saisie exacte, tutoriels
  audio/            # effets audio et réglages
  storage/          # sauvegardes locales, migrations de schéma
  accessibility/    # navigation clavier, textes alternatifs, annonces
  tests/            # unitaires, propriété, intégration, E2E
public/             # assets statiques légers et manifeste PWA
```

### 13.3. Machine à états

Prévoir des états explicites, au minimum : `menu`, `levelIntro`, `cutting`, `signAssignment`, `solutionSelection`, `attackAnimating`, `feedback`, `paused`, `victory`.

Transitions déterministes ; empêcher les actions d'une phase de modifier silencieusement les données d'une autre phase. Prévoir retour et modification volontaire avant validation.

### 13.4. Gestion des événements tactiles

Utiliser Pointer Events quand approprié, gérer souris/stylet/doigt, empêcher les doubles déclenchements, nettoyer les abonnements, conserver le scroll normal hors aire interactive, prendre en charge boutons système/retour et passage d'orientation sans perdre le niveau.

### 13.5. Persistance

Sauvegarde locale versionnée (par exemple `localStorage` pour progression et réglages, IndexedDB seulement si nécessaire). Sauvegarder les accomplissements, records, graine du défi actif, partie en cours si faisable, préférences et historique pédagogique limité. Prévoir migration et récupération en cas de données invalides.

Pas de données personnelles d'élèves, pas de compte obligatoire, pas de serveur ou de suivi statistique externe par défaut.

---

## 14. Performances, robustesse et installation

### 14.1. Appareils cibles

Fonctionnement satisfaisant sur iPhone de petite taille, Android et tablettes d'entrée de gamme, Safari iOS, Chrome Android et navigateurs de bureau récents.

### 14.2. Objectifs

- Viser une interface **fluide à 60 images/s sur matériel courant**, avec dégradation gracieuse vers 30 images/s sur appareils modestes.
- Aucun calcul symbolique répété à chaque image : **préparer les données des niveaux**.
- Limiter particules et sprites ; couper les animations inutiles hors écran.
- Éviter les re-rendus complets du DOM à chaque interaction sur l'axe.
- Dessiner de façon adaptative selon résolution et ratio de pixels : éviter un Canvas à résolution excessive.
- Suspendre l'animation quand la page est masquée ou le jeu en pause.
- Précharger les ressources légères du niveau suivant, sans geler l'interface.
- Respecter `prefers-reduced-motion` et les réglages du jeu.
- Éviter les erreurs console, pertes de progression et écouteurs/timers non nettoyés.

### 14.3. Hors ligne / GitHub Pages

- Application installable comme PWA si le navigateur le permet.
- Après une première visite réussie, menus, campagne, moteurs, ressources essentielles et sauvegardes fonctionnent **hors ligne**.
- Configurer correctement le **`base` Vite** pour un dépôt GitHub Pages du type `https://<compte>.github.io/<depot>/`.
- Fournir scripts `dev`, `build`, `preview`, `test` et vérifications nécessaires.
- Ajouter README et workflow de déploiement GitHub Actions si permis.
- S'assurer qu'un rechargement de page ou une mise à jour de service worker ne casse pas les chemins des ressources.

---

## 15. Accessibilité et sécurité pédagogique

- Contraste élevé, symboles et motifs en plus des couleurs.
- Taille de texte lisible et adaptable ; formules mathématiques accessibles via rendu approprié ou description textuelle.
- Focus clavier visible et navigation logique, commandes équivalentes au touché.
- Compatible réduction des animations ; éviter flashs intenses et scintillements rapides.
- Sons entièrement facultatifs ; pas d'échec fondé sur une information seulement sonore.
- Échec non humiliant : feedback descriptif, correction possible, récompense de la persévérance sans maquiller le résultat mathématique.
- Mode calme sans chronomètre.
- Ne jamais mélanger chiffres, signes et éléments décoratifs d'une manière qui rende une expression équivoque.
- Paramètres d'accessibilité persistants.

---

## 16. Stratégie de réalisation : livrables successifs

**Construire par tranches entièrement jouables, sans sacrifier la justesse.** Après chaque tranche : lancer les tests et vérifier visuellement les états principaux en mobile et bureau.

### Lot 1 — Prototype vertical jouable (indispensable)

- Accueil minimal mais soigné, entrée dans le jeu.
- **12 niveaux éditoriaux** couvrant affine, produit de deux facteurs et racine double.
- Axe tactile, découpage, signes, sélection des intervalles et des points, attaque, résultats.
- Moteur exact pour ces cas, diagnostics, annuler/refaire, tutoriel intégré.
- Son/effets de base avec réglage, étoiles, progression sauvegardée.
- Tests mathématiques de tous les niveaux.

**Critère de sortie :** une personne peut terminer les 12 niveaux sur téléphone **sans clavier physique ni aide extérieure**, et les résultats sont mathématiquement exacts.

### Lot 2 — Campagne et second degré

- Mondes 1 à 4, y compris \(\Delta<0\), \(\Delta=0\), \(\Delta>0\).
- Sous-interactions pédagogiques pour calculer les racines des trinômes.
- Galerie des succès, tutoriels supplémentaires et statistiques de compétence.
- Générateur de niveaux rationnels vérifié par tests.

### Lot 3 — Quotients, valeurs interdites et boss

- Mondes 5 et 6.
- Domaine original préservé même en présence de simplifications.
- Racines/pôles de multiplicité paire, singletons, ensembles vides, unions.
- Boss complet fourni dans les exemples de référence.

### Lot 4 — Polissage et publication

- Modes entraînement et Arcade, records, effets audiovisuels finaux.
- Optimisations appareil modeste, adaptation de l'écran, accessibilité.
- PWA hors ligne, README complet, build de production, tests E2E.
- Publication GitHub Pages **si les droits et le dépôt sont disponibles** ; sinon livrer un projet prêt à publier et les instructions exactes.

**La qualité du lot 1 prime sur la simple présence de fonctionnalités promises dans les lots ultérieurs.** Ne pas annoncer comme « terminé » un lot non implémenté ou non testé.

---

## 17. Critères d'acceptation de l'application complète

### 17.1. Mathématiques

- [ ] Les onze exemples du §9 sont résolus exactement et correctement affichés.
- [ ] Chaque zéro simple inverse le signe, chaque zéro double ne l'inverse pas.
- [ ] Les zéros du dénominateur sont exclus, y compris après simplification.
- [ ] Un singleton peut être sélectionné sans intervalle adjacent.
- [ ] Les cas \(\varnothing\), \(\mathbb R\), unions et bornes strictes/larges fonctionnent.
- [ ] Les fractions sont traitées exactement ; les décimales du rendu ne servent pas de preuve.
- [ ] Les niveaux procéduraux passent une validation indépendante et reproductible.

### 17.2. Jeu

- [ ] Le cœur de jeu est **jouable du début à la fin** sans opération arithmétique faite automatiquement à la place du joueur en mode autonome.
- [ ] Les contrôles essentiels sont des **interactions tactiles directes** ; il ne s'agit pas d'un quiz avec trois réponses.
- [ ] Les erreurs donnent des indications mathématiques pertinentes.
- [ ] Annulation, correction, pause, reprise, replay et niveau suivant fonctionnent.
- [ ] Les scores et succès correspondent à de véritables conditions vérifiées.
- [ ] Les animations rendent la victoire plaisante sans gêner les mathématiques.

### 17.3. Technique

- [ ] Application utilisable au doigt sur mobile étroit et à la souris sur ordinateur.
- [ ] Pas de ralentissement majeur lors des rafales d'effets ni de gel de l'interface.
- [ ] Build de production et tests automatisés passent.
- [ ] Sauvegarde stable après fermeture et réouverture.
- [ ] Jeu de base utilisable hors ligne après installation/chargement initial.
- [ ] Aucun faux lien, bouton inerte ou écran simplement décoratif présenté comme terminé.
- [ ] README, commandes et procédure GitHub Pages fournis.

### 17.4. Pédagogie

- [ ] L'élève doit effectivement identifier des racines, déterminer des signes et construire des ensembles solutions.
- [ ] Les tutoriels retirent progressivement les aides.
- [ ] Le temps de réaction n'est pas confondu avec l'exactitude mathématique.
- [ ] Le mode Entraînement propose de retravailler une compétence précise.
- [ ] Les explications distinguent clairement zéro, valeur interdite, signe et appartenance à l'ensemble solution.

---

## 18. Batterie de tests recommandée

### Tests unitaires mathématiques

- Normalisation des rationnels (négatifs, zéro, dénominateur négatif, divisions interdites).
- Calcul des valeurs critiques et tri exact ; fusion des événements de même abscisse.
- Signe sur toutes les cellules, multiplicité paire/impaire.
- Réduction algébrique et maintien du domaine d'origine.
- Toutes les inégalités strictes/larges.
- Conversion des cellules en ensembles d'intervalles, y compris singletons et trous.
- Vérification de la valeur logique de l'inéquation sur un ensemble de points tests **en complément** du calcul exact, jamais en remplacement.
- Tests propriété sur expressions générées : cohérence signe ↔ ensemble de solutions ↔ évaluation à des points rationnels admissibles.

### Tests d'intégration

- Placement, suppression, déplacement et undo/redo d'une coupure.
- Alternance de signes sans perte de saisie après changement de phase.
- Sélection/désélection d'une borne sans sélectionner involontairement un intervalle.
- Soumission, correction après erreur, réessai, victoire.
- Tutoriel, indice, score, succès et sauvegarde.

### Tests navigateur / mobile

- Portrait étroit (320 px), téléphone courant, tablette paysage, ordinateur.
- Toucher et souris, zoom/orientation, `prefers-reduced-motion`.
- Recharge en cours de niveau, reprise après fermeture.
- Mode hors ligne avec ressources déjà mises en cache.
- Aucun écran verrouillé ni bouton d'action hors champ.

---

## 19. Décisions de design à arbitrer avec pragmatisme

Work peut ajuster les points suivants sur la base de tests et de faisabilité, sans remettre en cause la promesse centrale :

- Emplacement des commandes et libellés exacts.
- Esthétique des adversaires et nombre de particules.
- Durée et contenu des tutoriels.
- Répartition finale des missions par monde.
- Présentation de la mini-saisie de fraction ou du calcul de discriminant.
- Détails de la formule de score tant qu'elle récompense d'abord la justesse.

En revanche, **ne pas modifier** :

- la construction active des racines, des signes et de l'ensemble solution ;
- la distinction entre intervalles et points isolés ;
- l'exclusion des valeurs interdites ;
- le principe « mathématique exacte, rendu graphique approximatif seulement » ;
- la compatibilité tactile et les performances sur appareils modestes ;
- la boucle de jeu arcade, immédiatement amusante et pédagogique.

---

## 20. Livrables attendus de Work

1. **Dépôt/projet TypeScript complet**, exécutable et correctement structuré.
2. **Jeu fonctionnel** avec toutes les fonctionnalités du lot effectivement livré.
3. **Tests automatisés** du moteur de signes et scénarios de jeu.
4. **README** : installation, commandes, architecture, procédures de vérification, déploiement.
5. **PWA** prête à être utilisée hors ligne après première installation, dans la mesure des capacités du navigateur.
6. **Publication GitHub Pages** si accès autorisé ; URL vérifiée uniquement après publication réelle.
7. **Compte rendu final factuel** distinguant : terminé et testé / implémenté mais non testé / non réalisé.

### Commande à exécuter dans Work

> **Développe SIGN STRIKE à partir de ce cahier des charges.** Commence par une tranche verticale pleinement jouable et mathématiquement rigoureuse, puis poursuis jusqu'à la version complète dans les limites du temps et des accès disponibles. Privilégie l'expérience tactile arcade et la progression mathématique réelle ; ne remplace jamais une manipulation par un QCM. Utilise TypeScript/Vite, optimise pour téléphones et tablettes modestes, ajoute des tests du moteur de signes, une sauvegarde locale, le mode hors ligne et le déploiement GitHub Pages. Ne te contente pas d'une maquette : écris le code, exécute les tests, vérifie l'application et livre les fichiers et instructions permettant sa publication. Signale sans ambiguïté toute partie non terminée.

---

## 21. Synthèse : le critère décisif de réussite

SIGN STRIKE sera réussi si **le plaisir de jouer et le raisonnement mathématique sont inséparables**. Le joueur doit ressentir qu'il « gagne » parce qu'il comprend pourquoi le signe change ou ne change pas, pourquoi une borne est incluse ou exclue, et pourquoi une valeur interdite reste interdite même après simplification.

**Formule directrice :** *Trouver les valeurs critiques → maîtriser les signes → frapper les bonnes zones → comprendre ses erreurs → progresser.*
