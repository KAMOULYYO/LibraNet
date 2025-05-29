# Architecture du système - BibliSmart

## 1. Architecture générale

Le système BibliSmart suit une architecture en couches, modulaire et évolutive.

### a. Couche Présentation (Frontend)
- **Technologie** : React.js avec Vite
- **Rôle** : Affichage de l’interface utilisateur (UI), interactions avec les utilisateurs (formulaires, navigation, visualisation des résultats).
- **Responsabilités** :
  - Authentification des utilisateurs
  - Affichage des documents
  - Interface de paiement
  - Interface de réservation et d’emprunt

### b. Couche Application (Backend)
- **Technologie** : FastAPI (Python)
- **Rôle** : Logique métier, traitement des requêtes, gestion des sessions et utilisateurs.
- **Modules** :
  - Authentification JWT
  - Gestion des utilisateurs (membre, bibliothécaire, préposé, gérant)
  - Gestion des documents
  - Paiements en ligne (Stripe/PayPal)
  - Intégration du chatbot IA

### c. Couche Données (Base de données)
- **Technologie** : MongoDB
- **Rôle** : Stockage persistant des utilisateurs, documents, réservations, historiques, amendes.
- **Collections principales** :
  - users
  - documents
  - reservations
  - transactions
  - logs

### d. Intégrations externes
- **Stripe / PayPal** : pour le paiement des amendes
- **OCR / Lecteur code-barres** : pour la lecture automatique des cartes et livres
- **Chatbot IA** : NLP + recommandations personnalisées

## 2. Diagramme d’architecture (vue simplifiée)

```
Utilisateur
   |
[Frontend React]
   |
[FastAPI Backend]
   |------> MongoDB
   |------> Stripe / PayPal
   |------> Chatbot IA
```

## 3. Déploiement
- Serveur cloud (type Heroku / Render / Railway)
- Stockage sécurisé des clés API (via .env)
- CI/CD via GitHub Actions