# Script voix off — Pub « Créez votre premier agent IA » (~38 s)

**Voix :** féminine, française, chaleureuse et dynamique (ElevenLabs « Elisa — Dynamic French Commercial », id `rPVufKNutioPFV4by3r0`, modèle `eleven_v4`).
**Format :** vertical 1080×1920, 30 i/s. Sous-titres incrustés.

| Temps | Scène | Texte voix off |
|-------|-------|----------------|
| 0,0 – 5,6 s | 90 % | Vous utilisez déjà l'IA… mais c'est encore vous qui faites quatre-vingt-dix pour cent du travail ? |
| 5,6 – 10,4 s | Agent pour vous | Et si un agent IA travaillait pour vous, pendant que vous gérez votre entreprise ? |
| 10,4 – 15,8 s | Formation | Avec notre formation, vous créez votre premier agent IA avec Claude. Sans coder. |
| 15,8 – 23,4 s | 4 étapes | En une journée : le contexte, la mission, les outils, les règles… et une tâche qui tourne toute seule, chaque lundi matin. |
| 23,4 – 30,6 s | Cas d'usage | Veille concurrentielle, relances clients, tri des candidatures : vous repartez avec votre agent, prêt à travailler. |
| 30,6 – 38,0 s | Appel à l'action | Les places sont limitées. Réservez dès maintenant sur easydigia point com. |

## Ajouter la voix

1. Générer l'audio (ElevenLabs — environ 576 crédits) ou l'enregistrer soi-même → `voix.mp3`.
2. Si la durée diffère, ajuster les temps `a`/`b` du tableau `TL` dans `src/video.html` et relancer :
   `node src/render_video.js <dossier_frames> 30`, puis
   `ffmpeg -framerate 30 -i <dossier_frames>/f%05d.jpg -c:v libx264 -pix_fmt yuv420p -crf 20 sans_voix.mp4`
3. Assembler :
   `ffmpeg -i video/Pub_Agent_IA_sans_voix.mp4 -i voix.mp3 -c:v copy -c:a aac -b:a 192k -shortest video/Pub_Agent_IA.mp4`
