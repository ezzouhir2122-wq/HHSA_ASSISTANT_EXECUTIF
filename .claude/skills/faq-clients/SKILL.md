---
name: faq-clients
description: Répond aux questions fréquentes des clients et prospects (services, tarifs, délais, processus) avec des réponses calibrées prêtes à envoyer. Aucun outil externe requis — Architect natif.
allowed-tools:
---

Génère une réponse calibrée à une question client fréquente. Adapte le ton et le format au canal (email, chat, appel).
Rien n'est envoyé. Le résultat est une réponse prête à copier ou à transmettre au skill `client-communication` pour mise en forme email.

## Déclencheurs

"Comment répondre à [question] ?"
"Que dire si un client demande [sujet] ?"
"Prépare une réponse pour [question fréquente]"

## Séquence

**Étape 1 — Identifier la question et le canal**
- Canal : email / chat / appel
- Profil : prospect ou client actif
- Catégorie : services / tarifs / délais / processus / autre

**Étape 2 — Sélectionner la réponse de base**

### Services et Périmètre

**"Qu'est-ce que vous faites exactement ?"**
> HHSA Agency conçoit des workflows agentiques pour PME — des systèmes qui automatisent les tâches répétitives (prospection, onboarding clients, communication, reporting) pour que vos équipes se concentrent sur ce qui crée de la valeur. Concrètement : vous décrivez un processus, nous le construisons en système automatisé.

**"Quelle différence avec un développeur classique ?"**
> Un développeur construit du logiciel. Nous construisons des workflows — des enchaînements d'actions automatisées qui utilisent l'IA pour prendre des décisions simples. Résultat : plus rapide à déployer, plus facile à ajuster, et conçu pour être maintenu sans équipe technique.

**"Vous travaillez avec quelle taille d'entreprise ?"**
> PME de 5 à 200 personnes. Secteurs : services B2B, conseil, immobilier, retail — tout secteur avec des processus répétitifs et un volume de communication important.

### Tarifs et Devis

**"Combien ça coûte ?"**
> Les tarifs dépendent du périmètre. La plupart de nos projets démarrent avec un audit de 2h pour cadrer exactement ce dont vous avez besoin. Préférez-vous qu'on planifie ça ?

**"Avez-vous des packages ?"**
> Oui — nous avons des packages standards. Je vous prépare un résumé adapté à votre secteur. Vous préférez un appel de 20 minutes ou je vous envoie ça par email ?

**"Quelles sont vos conditions de paiement ?"**
> Standard : 50% à la signature, 50% à la livraison. Pour les projets longs (>3 mois) : mensuel. NET 30 possible pour les entreprises établies.

### Délais et Processus

**"Combien de temps pour livrer ?"**
> Dépend du workflow. Un workflow standard : 1 à 3 semaines. Un système complet (multi-workflows) : 4 à 8 semaines. On cadre les délais exactement lors du discovery.

**"Comment se passe votre processus ?"**
> 1. Discovery (30-60 min) — on cartographie vos processus actuels.
> 2. Blueprint — on rédige le SOP du workflow à construire.
> 3. Build — on construit et on teste avec vos données.
> 4. Livraison — vous recevez le workflow, la documentation, et la formation.
> 5. Suivi — 30 jours d'assistance post-livraison.

**Étape 3 — Adapter au contexte**
- Email → 3 phrases max, terminer par une action claire
- Chat → 2-3 phrases directes
- Appel → 4-5 points clés, pas de texte rédigé

**Étape 4 — Présenter la réponse**
Afficher la réponse prête à utiliser.
Si email → proposer de la passer dans le skill `client-communication` pour mise en forme complète.

## Gestion des Erreurs

| Situation | Action |
|-----------|--------|
| Question hors catégorie | Rédiger une réponse prudente, sans promettre. Ajouter à la FAQ. |
| Question sur un tarif précis | Rediriger vers un devis. "Je vous prépare un devis personnalisé." |
| Question technique complexe | Répondre avec précaution — cadrer en discovery, ne pas sur-promettre |

## Mise à Jour de la FAQ

Chaque fois qu'une question revient deux fois → l'ajouter dans `blueprints/faq-clients.md`.
