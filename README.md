# Projet Angular pour afficher des produits depuis l'API Fakestore

## Description
Cette application Angular récupère et affiche des données de produits depuis [Fakestore API](https://fakestoreapi.com). Elle inclut :
- Une liste de produits sous forme de cartes
- Fonctionnalités de recherche et tri
- Interface responsive en français

## Prérequis
- Node.js (version 18 ou supérieure recommandée)
- npm ou yarn
- Angular CLI (installé globalement)

## Installation

1. **Cloner le repo** :
```bash
git clone https://github.com/anasidrissi2/Angular-Poc.git
```

2. **Installer les dépendances :** :
```bash
npm install
# ou
yarn
```

3. **Démarrer l'application :** :
```bash
npm start
# ou
yarn
```
> L'application sera disponible à l'adresse : http://localhost:4200

## Fonctionnalités

### Recherche
- Filtrage dynamique des produits pendant la saisie
- Debounce délai de 500ms pour éviter les requêtes excessives

### Tri
- Par nom (ordre alphabétique)
- Par prix (croissant/décroissant)
- Combinaison possible avec la recherche


## Affichage

### Cartes produits :
- Image occupant 68% de la hauteur
- Titre du produit
- Prix en euros (format €XX.XX)

### États spéciaux :
- Indicateur de chargement
- Messages d'erreur clairs


### Technologies utilisées
- Angular 19
- Angular Material (composants UI)
- RxJS (gestion des observables et debounce)
- API REST Fakestore


### Auteur
Anas Idrissi