# Mods Claude Code — HHSA

Cinq mods construits à partir du guide « The Mods Playbook » (TAHSHR.AI). Le guide ne fournit aucun mod prêt à l'emploi : ce sont ses idées et ses prompts, implémentés ici.

Écrits et testés avec Claude Code 2.1.322. L'API des mods est en accès anticipé et peut changer d'une version à l'autre.

| Mod | Ce qu'il fait | Commande |
|-----|---------------|----------|
| `change-preview` | Demande une confirmation explicite avant une suppression (`rm`, `git clean`, `git reset --hard`, `find -delete`…) ou un remplacement massif (`sed -i`, Edit « toutes les occurrences »). Sans réponse « Exécuter », la commande est refusée. | — |
| `second-brain-lens` | Panneau qui indexe les Markdown de `intel`, `live`, `blueprints` : recherche, date de modification, aperçu d'un extrait, puis ajout à la demande sur appui. | `/lens` |
| `finish-signal` | Signal dans l'interface quand une tâche se termine, s'arrête sur une erreur ou attend une décision. Un seul signal par tâche. | `/finish-signal quiet \| on \| status` |
| `workflow-meter` | Compte les appels d'outils, les durées et les échecs de la session. Ne garde ni le texte des demandes ni le contenu des fichiers. | `/meter`, `/meter clear`, `/meter export` |
| `easy-task-router` | Repère les demandes simples (mise en forme, classement court) et propose un modèle moins coûteux. En aperçu par défaut : rien ne change tant que tu n'actives pas. | `/router`, `/router preview \| on \| off` |

## Installer

Dans un terminal, à l'invite de Claude Code :

```
/plugin install change-preview --marketplace ezzouhir2122-wq/HHSA_ASSISTANT_EXECUTIF
```

Même ligne pour chaque mod, en changeant le nom. Depuis un shell : `claude plugin install <mod> --marketplace ezzouhir2122-wq/HHSA_ASSISTANT_EXECUTIF`.

Dans l'app desktop : « + » à côté de la zone de saisie, Plugins, Add marketplace avec `ezzouhir2122-wq/HHSA_ASSISTANT_EXECUTIF`, puis Add plugin.

Pour essayer sans installer, depuis la racine du repo :

```
claude --plugin-dir ./mods/change-preview
```

## Désactiver

`/plugin` puis désactiver le mod. Pour un diagnostic, `claude --safe-mode` démarre sans aucune personnalisation.

## Réglages

Chaque mod expose ses options dans `/config` : délai de réponse (`change-preview`), dossiers et longueur d'extrait (`second-brain-lens`), durée minimale et affichage du nom de tâche (`finish-signal`), fichier d'export (`workflow-meter`), mode, modèle et seuils (`easy-task-router`).

## Limites

- `change-preview` est une aide, pas une garantie de sécurité. Il lit le texte de la commande : une suppression faite par un script appelé, une variable ou une redirection `>` lui échappe. Dans une exécution sans personne pour répondre (`claude -p`), toute commande repérée est refusée.
- `easy-task-router` classe par règles de mots-clés, en français et en anglais. Il ne route pas au-delà de 30 messages de contexte, car changer de modèle fait retraiter tout le contexte. Aucune économie n'est mesurée ni promise : `/router` donne les durées et tokens des requêtes routées, à comparer avec les mêmes tâches sans routage. Le modèle `haiku` doit être disponible sur le compte. Dérogations dans la demande : `#fort` garde le modèle courant, `#simple` force le routage.
- `second-brain-lens` ne lit que les dossiers configurés, ignore les fichiers cachés, les liens symboliques et les noms qui annoncent un secret, et s'arrête à 400 fichiers.
- `finish-signal` n'envoie rien hors de l'interface et n'appelle aucun modèle.
- Les panneaux et les signaux dépendent de la surface : terminal et desktop les dessinent, une exécution non interactive non.

## Vérifier

```
claude plugin validate ./mods/<mod>
claude plugin test ./mods/<mod>
```

Les tests couvrent la logique des mods contre le moteur de test de Claude Code (15 tests). L'usage réel dans une session interactive reste à essayer par toi : rendu des panneaux, question de confirmation, routage vers `haiku`.
