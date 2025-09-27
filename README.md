# Résa Livres
L'idée c'est de pouvoir réserver des livres, sans trop se casser la tête, faut juste que ça marche.

Normalement, un utilisateur doit juste arriver devant l'armoire, et pouvoir réserver le livre.

Pour réserver le livre, il faudrait qu'il :
- Aille sur le site (lien sur le groupe de classe, mais il peut aussi scanner un QR code affiché sur l'armoire qui redirige vers le site (sauf s'il l'a installé sur son tél, vu que je compte en faire une PWA (je sais plus iOS supporte bien ceci vu qu'ils vont et viennent, ils sont chiants apple))
- scanne sa carte étudiante s'il ne l'a pas fait au préalable
- scanne le code barre à l'arrière du livre

Done. En vrai simple, non ?

## Features
### Essentielles
- [ ] Pouvoir se connecter en scannant sa carte scolaire
- [ ] Pouvoir ajouter un livre à la liste grâce au code-barre
    - les données des livres sont récupérées grâce à l'ISBN sur le code-barre depuis une API gratuite
- [ ] Pouvoir ajouter un livre à la liste en entrant manuellement les données
- [ ] Pouvoir voir la liste des livres
- [ ] Pouvoir réserver le dit livre
- [ ] Pouvoir voir les livres déjà réservés

### Non essentielles mais sympa

## Détails de l'implémentation
### Client
#### Connexion `/`
La page `/login` permet de se connecter en scannant sa carte scolaire. Elle redirige vers `/app` si l'utilisateur est connecté.

#### Racine `/`
La racine `/` redirige vers `/login` si l'utilisateur n'est pas connecté. S'il est connecté, c'est un écran d'accueil contenant (de haut en bas) :
- une barre de recherche
- la liste des livres (un livre est représenté par une carte affichant des informations basiques), avec une option pour afficher seulement les livres réservés ou non réservés
- un bouton réserver par qr code en float en bas à droite
- un autre bouton ajouter en float en bas à droite

##### Recherche
La barre de recherche est un formulaire redirigeant vers une page `/search?`, et qui traite les paramètres de recherche (***implémentation à détailler, pour l'instant ça semble superflux***)

##### Filtrage
Deux boutons qui s'excluent mutuellement et qui changent un URL param optionnel `?borrowed`. En fonction du bouton on a :
- `?borrowed=true`
- `?borrowed=false`

##### Liste des livres
La carte d'un livre doit afficher (on s'inspire de Paperless-ngx sur lequel j'ai déjà mis les documents de la MP2I) :

- une cover du livre sur le dessus
- les informations suivantes sur le corps de la carte :
  - titre
  - auteur
  - date

Elle change de couleur et affiche une icône avec un prénom si le livre a été emprunté

