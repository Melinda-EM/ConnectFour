Puissance 4 en JavaScript

Ce dépôt contient une implémentation du jeu de Puissance 4 en JavaScript. Le jeu permet à deux joueurs de s'affronter en plaçant des jetons dans une grille et vérifie si l'un des joueurs a gagné ou si le jeu s'est terminé par une égalité.

Utilisation
Clonez ce dépôt sur votre machine locale :
bash ==> git clone <lien du dépôt>

Ouvrez le fichier index.html dans votre navigateur web.

Les joueurs se relaient pour placer leurs jetons en cliquant sur les colonnes de la grille.

Le jeu vérifiera automatiquement si l'un des joueurs a gagné ou si le jeu s'est terminé par une égalité. Un message s'affichera à l'écran pour indiquer le résultat de la partie.

Vous pouvez actualiser la page pour recommencer une nouvelle partie.

Structure du Code
Le code est conçu de manière simple et comprend les éléments suivants :

Le tableau pieces est utilisé pour représenter la grille de jeu. Chaque élément du tableau contient une valeur : 0 pour une case vide, 1 pour le joueur 1 (rouge) et 2 pour le joueur 2 (jaune).

Lorsqu'un joueur clique sur une colonne de la grille, la fonction onColumnClicked est appelée. Elle vérifie si un jeton peut être placé dans la colonne sélectionnée et met à jour la grille en conséquence.

La fonction checkGame est appelée après chaque coup pour vérifier si un joueur a gagné ou si le jeu s'est terminé par une égalité. Elle affiche un message correspondant à l'état de la partie.

La fonction hasPlayerWon parcourt la grille pour vérifier si un joueur a aligné quatre jetons horizontalement, verticalement ou en diagonale. Elle renvoie true si un joueur a gagné et false sinon.

Personnalisation
Ce jeu de Puissance 4 simple peut être personnalisé selon vos préférences. Vous pouvez modifier les styles CSS dans le fichier style.css pour changer l'apparence du jeu. Vous pouvez également ajouter des fonctionnalités supplémentaires, telles que l'affichage du nombre de victoires pour chaque joueur ou des effets sonores lors du placement des jetons.

N'hésitez pas à explorer le code et à l'adapter pour créer votre propre version personnalisée du jeu de Puissance 4.

Contribuer
Les contributions à ce projet sont les bienvenues ! Si vous souhaitez apporter des améliorations, des corrections de bugs ou ajouter de nouvelles fonctionnalités, n'hésitez pas à ouvrir une issue ou à proposer une demande de fusion (pull request).


Profitez du jeu de Puissance 4 et amusez-vous bien ! Si vous avez des questions ou des commentaires, n'hésitez pas à les partager.
