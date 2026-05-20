# Routine : Bilan Semaine

**Cron (UTC) :** `0 16 * * 5`
**Heure locale :** Vendredi 17h00 Casablanca (UTC+1)
**Description :** Résumé de fin de semaine + priorités semaine suivante en draft Gmail.

## Prompt

Génère un bilan de semaine pour HHSA Agency :
1. Résumé des tâches accomplies cette semaine (consulter git log --oneline --since="7 days ago")
2. Liste des points ouverts restants
3. Top 3 priorités pour la semaine prochaine
4. Une action concrète à faire lundi matin

Crée un brouillon Gmail à ezzouhir2122@gmail.com avec l'objet :
"Bilan semaine [DD/MM] -- HHSA Agency"
et le bilan complet dans le corps.
Note : Ne pas envoyer -- brouillon seulement.
