# Données requises – Projet BibliSmart

Ce document décrit les données essentielles nécessaires au fonctionnement de l’application BibliSmart.

---

## 1. Utilisateurs

### Bibliothécaire
- ID
- Nom
- Prénom
- Adresse courriel
- Mot de passe (hashé)

### Membre
- ID
- Nom
- Prénom
- Adresse
- Numéro de téléphone
- Adresse courriel
- Date d’inscription
- Mot de passe (hashé)
- Solde d’amende

### Préposé
- ID
- Nom
- Prénom
- Adresse courriel
- Mot de passe (hashé)

### Gérant
- ID
- Nom
- Prénom
- Adresse courriel
- Mot de passe (hashé)

---

## 2. Documents

- ID
- Titre
- Auteur
- Type (livre, article, vidéo, etc.)
- Date de publication
- ISBN
- Nombre d’exemplaires
- Catégorie
- Description

---

## 3. Réservations

- ID réservation
- ID membre
- ID document
- Date de réservation
- Statut (active, annulée, expirée)

---

## 4. Emprunts

- ID emprunt
- ID membre
- ID document
- Date d’emprunt
- Date de retour prévue
- Date de retour réelle
- Statut (en cours, retourné, en retard)

---

## 5. Paiements et Amendes

- ID paiement
- ID membre
- Montant
- Date de paiement
- Mode de paiement (carte, PayPal)
- Description

---

## 6. Journaux d’activité (Logs)

- ID log
- ID utilisateur
- Action effectuée
- Date et heure
- Résultat (succès, échec)

---

## 7. Chatbot

- ID session
- ID utilisateur
- Requête utilisateur
- Réponse générée
- Timestamp

---

## 8. Notifications

- ID notification
- ID membre
- Type (retour, amende, rappel)
- Contenu
- Statut (envoyé, lu)
- Date d’envoi
