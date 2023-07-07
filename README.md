# Projet Vue : Dashboard Coworking Metz

Le projet Dashboard Coworking Metz est une application web développée avec le framework Vue.js. Elle sert de portail de gestion pour les adhérents du coworking, permettant aux utilisateurs de se connecter, d'accéder à différents services et d'interagir avec l'espace.

Le projet est structuré en plusieurs composants Vue, chacun correspondant à une fonctionnalité spécifique de l'application. Voici une description de chaque composant :

## 1. Composant Login.vue

Le composant `Login.vue` gère le processus d'authentification des utilisateurs. Il affiche un formulaire où les utilisateurs peuvent entrer leur identifiant et mot de passe coworker pour se connecter.

## 2. Composant Portail.vue

`Portail.vue` fournit une interface pour interagir avec le portail piéton de Bliiida. Les utilisateurs peuvent déclencher le déverrouillage du portail via un bouton. Il affiche également une photo du portail pour aider les gens à comprendre de quel portail il s'agit, et une option pour consulter l'historique des accès pour les administrateurs.

## 3. Composant Presence.vue

Le composant `Presence.vue` est conçu pour afficher l'occupation actuelle de l'espace de coworking. Il indique le nombre de postes occupés par rapport au total disponible, et affiche cette information sous forme de pourcentage et de diagramme circulaire.

## 4. Composant Signal.vue

`Signal.vue` invite les utilisateurs à rejoindre un groupe Signal pour rester informés des actualités et informations pratiques concernant le lieu et l'association. Un lien direct pour rejoindre le groupe est fourni.

## Installation et utilisation

Pour utiliser ce projet, vous devez avoir Node.js et npm installés sur votre machine. Suivez ces étapes :

1. Clonez ce dépôt sur votre machine locale.
2. Exécutez `npm install` dans le répertoire du projet pour installer les dépendances.
3. Exécutez `npm run dev` pour démarrer le serveur de développement. 
4. Ouvrez votre navigateur à l'adresse `http://localhost:5000`.

## Historique des accès

Dans cette application, une fonction appelée `logOuverture` est utilisée pour enregistrer chaque ouverture du portail dans une base de données hébergée sur Appwrite. Appwrite est une plateforme de développement backend qui permet aux développeurs de créer des applications web ou mobiles plus rapidement. Les accès à AppWrite sont stockés dans la base des login/mot de passe de l'association.

Voici comment la fonction `logOuverture` fonctionne :

1. Elle crée un nouveau client Appwrite et configure l'endpoint et le projet à utiliser. L'endpoint est l'URL de l'API Appwrite et le projet est un identifiant unique représentant votre projet Appwrite.

2. Ensuite, elle crée une session e-mail en utilisant le compte `contact@coworking-metz.fr`. Pour cela, elle utilise le mot de passe qui est stocké dans une variable d'environnement `VITE_APPWRITE_PASSWORD`.

3. Une fois que la session est créée, la fonction crée un nouveau document dans la base de données Appwrite. Le document contient trois informations : l'identifiant de l'utilisateur qui a ouvert le portail, l'identifiant de l'ouverture du portail, et la date et l'heure de l'ouverture.

4. Enfin, la fonction affiche le résultat de l'opération dans la console. Si la création du document est réussie, elle affiche la réponse de l'API Appwrite. Si quelque chose se passe mal, elle affiche l'erreur.

Pour accéder au log des ouvertures de portail, vous devez aller à l'adresse de votre API Appwrite, qui est `https://cloud.appwrite.io/v1` dans ce cas, et naviguer jusqu'à la base de données et la collection correspondantes. Dans ce cas, la base de données est `649e813690066fa29250` et la collection est `649e8141b7c115fc1fd6`. Vous devriez alors voir tous les documents (c'est-à-dire chaque ouverture de portail) qui ont été créés.

## Structure du projet

Le projet est basé sur Vite.js pour un développement rapide et une expérience optimale en termes de performances. Il utilise la bibliothèque Appwrite pour l'authentification et le stockage des données, et Pinia comme bibliothèque de gestion d'état. Pour la manipulation des dates, il utilise date-fns. Le projet suit les normes d'ESLint et Prettier pour assurer une qualité de code cohérente.

## Déploiement

Ce projet utilise Netlify pour le déploiement continu. Chaque commit sur la branche `master` déclenche automatiquement un nouveau déploiement. L'application est ensuite accessible à l'adresse [app.coworking-metz.fr](http://app.coworking-metz.fr). Cela permet de garantir que la version en production de l'application est toujours à jour avec les dernières modifications apportées au code. Veuillez noter qu'un certain temps peut être nécessaire entre le commit et le déploiement complet sur Netlify (5 minutes). Les accès à Netlify sont stockés dans la base des login/mot de passe de l'association.

## Contribution

Les contributions à ce projet sont les bienvenues. N'hésitez pas à ouvrir une issue ou à soumettre une pull request.


## API
### Documentation des Routes API Personnalisées dans WordPress

Ce document explique les routes API personnalisées définies pour un site WordPress en PHP. 

### Route : /app-auth

**Point d'accès** : `cowo/v1/app-auth`

**Méthode** : `POST`

#### Paramètres :

- **email** (chaîne) : L'adresse e-mail de l'utilisateur, utilisée pour la connexion.
- **password** (chaîne) : Le mot de passe de l'utilisateur.

Ce point d'accès authentifie les informations d'identification de l'utilisateur. L'utilisateur est authentifié à l'aide de la méthode `wp_authenticate` intégrée à WordPress qui a besoin du `user_email`et du `user_password`.

En cas d'authentification réussie, le point d'accès vérifie si l'utilisateur a un rôle d' 'administrateur' ou de 'client'. Si c'est le cas, il génère un identifiant de session utilisateur et renvoie les détails de l'utilisateur ainsi que leurs droits d'accès.

En cas d'erreur lors du processus d'authentification, une `WP_Error` est renvoyée avec un code de statut HTTP 401.

### Route : /app-droits

**Point d'accès** : `cowo/v1/app-droits`

**Méthode** : `POST`

#### Paramètres :

- **user_id** (entier) : L'ID de l'utilisateur.

Ce point d'accès récupère les droits de l'utilisateur à l'aide de la méthode `coworking_app_droits`. Si l'utilisateur a des droits, il les renvoie. Si l'utilisateur n'existe pas ou si une erreur se produit, une `WP_Error` est renvoyée avec un code de statut HTTP 404.

### Route : /app-session

**Point d'accès** : `cowo/v1/app-session`

**Méthode** : `POST`

Ce point d'accès vérifie une session utilisateur à l'aide de la méthode `coworking_app_check`. Si la session est valide, il renvoie l'identifiant de session. En cas de session invalide, une `WP_Error` est renvoyée avec un code de statut HTTP 401.

### Fonctions supplémentaires

#### coworking_app_settings
Cette fonction récupère les utilisateurs actuels à partir d'une API distante et met en cache les données pendant 5 minutes en utilisant les transitoires WordPress.

#### coworking_app_session_id
Cette fonction gère les identifiants de session utilisateur. Si un nouvel ID est demandé, il génère une chaîne aléatoire et met à jour les métadonnées de l'utilisateur. Sinon, il récupère l'ID existant à partir des métadonnées de l'utilisateur.

#### coworking_app_droits
Cette fonction récupère les droits de l'utilisateur en fonction de l'ID de l'utilisateur. Si l'utilisateur est un administrateur, il dispose de droits supplémentaires. Elle récupère également les paramètres de l'application et les droits spécifiques à l'utilisateur à partir du champ ACF (Advanced Custom Fields) 'bloquer_ouvrir_portail'.

#### coworking_app_origins
Cette fonction renvoie une liste des origines autorisées à accéder à l'API.

#### coworking_app_check
Cette fonction vérifie l'origine et les en-têtes de la requête. Si la requête ne provient pas d'une source de confiance, elle renvoie une erreur 403. Pour les requêtes `OPTIONS`, elle répond avec les en-têtes autorisés. Elle vérifie également l'en-tête 'Autorisation' par rapport à la valeur attendue et vérifie l'ID de session fourni si disponible. Si l'ID de session correspond à celui stocké, elle renvoie l'ID de session.


## Licence

Ce projet est sous licence MIT.
