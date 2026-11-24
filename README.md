# Les Architectes de la Réussite : site (Jekyll / GitHub Pages)

Site statique construit avec **Jekyll**, prêt pour l'hébergement gratuit **GitHub Pages**.
Design, en-tête, pied de page et feuille de style sont **mutualisés** : une modification se fait à un seul endroit.

## Structure

```
_config.yml                → réglages du site + coordonnées de l'association
_layouts/                  → gabarits (default, post)
_includes/                 → en-tête et pied de page partagés
assets/css/style.css       → TOUTE la mise en forme (un seul fichier)
assets/img/                → logo + favicon
index.html                 → accueil
qui-sommes-nous.html
programmes.html            → hub
academie.html              → /programmes/academie/
actions-humanitaires.html  → /programmes/actions-humanitaires/
solidarite-numerique.html  → /programmes/solidarite-numerique/
soutenir.html · contact.html · actualites.html
mentions-legales.html · politique-confidentialite.html
_posts/                    → articles d'actualité (1 fichier = 1 article)
```

## Mettre en ligne (GitHub Pages)

1. Poussez ce dossier sur votre dépôt GitHub (branche `main`).
2. Dépôt → **Settings → Pages** → Source : *Deploy from a branch* → branche `main`, dossier `/ (root)`.
3. Le site sera publié sous `https://VOTRE-COMPTE.github.io/architectes-reussite-site/`.
4. Quand votre **nom de domaine** (~12 €/an) sera prêt : ajoutez-le dans *Settings → Pages*, puis dans `_config.yml` mettez `url` à votre domaine et `baseurl: ""`.

## À configurer (Phase 0) : tout est centralisé dans `_config.yml`

| Champ | Rôle |
|---|---|
| `org.email` | e-mail officiel (footer, contact, RGPD) |
| `org.helloasso` | URL de la campagne HelloAsso → active le bouton de don |
| `org.formspree` | ex. `https://formspree.io/f/xxxxxx` → active le formulaire de contact **et** la newsletter |
| `org.linkedin` | lien LinkedIn |
| `org.rna` | numéro RNA (mentions légales) |

Tant qu'un champ est vide, le site affiche un état honnête (« à venir », bouton désactivé, formulaire prêt mais inactif).

## Publier une action (page « Le terrain »)

Chaque action a sa propre page, référencée par Google, et apparaît automatiquement dans la galerie filtrable.

1. Dupliquez `_activites/exemple-modele.md` et renommez la copie avec des mots simples, sans accent ni espace
   (ex. `rentree-scolaire-2027.md` → page `/actualites/rentree-scolaire-2027/`).
2. Remplissez les champs : titre, date, pilier, pays, résumé (`excerpt`), et si possible une vraie photo
   (déposée dans `assets/img/activites/`) avec sa description (`image_alt`).
3. Écrivez le récit sous les tirets (300 mots ou plus, avec des chiffres).
4. Remplacez `published: false` par `published: true`, puis poussez.

`featured: true` place l'action en tête, dans « À la une ». Sans action publiée, la page affiche « Nos premières actions arrivent ».

## À relire avant publication

- **Solidarité numérique** : première version rédactionnelle, à valider.
- **Mentions légales** et **Politique de confidentialité** : modèles à compléter/valider.
- **Logo** : version détourée fournie ; prévoir un logo vectoriel (SVG) pour une netteté parfaite à terme.
- **Photos** : aucune photo fictive. Les vrais visuels de terrain viendront enrichir le site après les premières actions.

## Développer en local (facultatif)

```
bundle install
bundle exec jekyll serve
```
Puis ouvrez `http://localhost:4000/architectes-reussite-site/`.
