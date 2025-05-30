# 📊 Rapport de Suivi – Sprint 2

## 🏷️ Nom de l'équipe : Biblio_Teccart  
## 🔢 Numéro d’itération : Sprint 2

---

### 🎯 But de l’itération
Permettre à l’utilisateur de consulter les documents, retourner les emprunts et payer les amendes.

---

### 🎯 Estimation en Points Utilisateur (UP)
Total estimé : 22 UP

---

### 📌 Diagrammes UML
- Diagramme de classes : `docs/uml/uml_class Diagramme.png`
- Diagramme de cas d’utilisation : `docs/uml/uml_use_case.png`

---

### ✅ TDD / Tests unitaires
Prévu au Sprint 3.

---

### 📋 Engagement de l’équipe

| Fonctionnalité              | Taille Engagée | Taille Réalisée | Statut        |
|----------------------------|----------------|------------------|---------------|
| Consultation document      | 6 UP           | 6 UP             | Terminé       |
| Retour de document         | 6 UP           | 4 UP             | En cours      |
| Paiement amende            | 6 UP           | 6 UP             | Terminé       |
| Génération de rapport      | 4 UP           | 0 UP             | Pas commencé  |
| **Total**                  | **22 UP**      | **16 UP**        |               |

---

### ⭐ Faits saillants
- Bonne intégration du paiement.
- Retard sur la fonctionnalité de retour à cause d’un conflit API.
- Génération rapport repoussée à Sprint 3.

---

### 📈 Sunset Graph
(À insérer dans `/docs/suivi/sunset_sprint2.png`)

---

### 🕒 État de l’effort et des coûts

| État                   | Effort (hres) | Coûts ($) |
|------------------------|---------------|-----------|
| Au début de l’itération | 30,00         | 3300,00   |
| Cette itération         | 12,00         | 1320,00   |
| Cumulatif à date        | 42,00         | 4620,00   |
| Estimation pour terminer| 10,00         | 1100,00   |
| **Total prévu**         | **52,00**     | **5720,00** |
| Budget initial          | 50,00         | 5500,00   |
| **Écart**               | +2,00         | +220,00   |

📌 *Légère dérive (+4%) due à des ajustements non planifiés.*

---

### 🐞 État de la qualité
- Bugs critiques : 0
- Bugs mineurs : 2 (retour non rafraîchi + doublon de paiement)

---

### ⚠️ État des risques et obstacles
- ❌ Accès API restreint (corrigé)
- ⚠️ Retard sur lecture code-barres (encore en attente)

---

### 🔧 Plan d’amélioration
- Ajouter tests unitaires au Sprint 3
- Mieux répartir les tâches lourdes
- Valider les endpoints backend plus tôt