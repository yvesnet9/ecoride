from fpdf import FPDF

# --- Classe personnalisée du PDF ---
class PDF(FPDF):
    def header(self):
        # Ajoute ton logo Ecoride
        self.image("Ecoride_logo.png", 10, 8, 25)

        # Police Unicode compatible (DejaVuSans)
        self.set_font("DejaVu", "", 16)
        self.set_text_color(76, 175, 80)  # vert éco (#4CAF50)

        # Titre centré
        self.cell(0, 10, "🌿 Projet Ecoride – Cahier des Charges", new_x="LMARGIN", new_y="NEXT", align="C")
        self.ln(10)

    def footer(self):
        # Position à 15 mm du bas
        self.set_y(-15)
        self.set_font("DejaVu", "", 10)
        self.set_text_color(100)
        # Numérotation des pages
        page = f"Page {self.page_no()}/{{nb}}"
        self.cell(0, 10, page, align="C")

# --- Création du PDF ---
pdf = PDF()
pdf.set_auto_page_break(auto=True, margin=15)

# ➕ Ajout de la police Unicode
pdf.add_font("DejaVu", "", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", uni=True)
pdf.set_font("DejaVu", "", 14)

# Ajout d'une page
pdf.alias_nb_pages()
pdf.add_page()

# --- Contenu principal ---
contenu = """
# 🌿 Ecoride - Cahier des Charges

## Contexte
Ecoride est une plateforme visant à encourager la mobilité douce et écologique grâce à un système de points récompensant les trajets à vélo ou à pied. 
Ce projet s’inscrit dans le parcours Développeur Web & Web Mobile (Studi).

## Objectifs
- Créer une API Express.js pour la gestion des utilisateurs (CRUD).
- Développer un frontend React pour visualiser et manipuler les données.
- Utiliser MongoDB comme base de données.
- Mettre en place une interface claire et responsive.

## Fonctionnalités principales
- 👤 Gestion des utilisateurs : ajout, affichage, suppression.
- 🚴 Gestion des ecoPoints pour chaque trajet.
- 🗃️ Connexion au backend Express.js (port 3000).
- 🌍 Interface React connectée à l’API.

## Technologies
- Backend : Node.js, Express, MongoDB, Mongoose
- Frontend : React + Vite
- Autres : Postman, VS Code, Docker (optionnel)

## Auteur
**Yves Mukuna Jamesy – 2025**
"""

# Ecriture du texte
pdf.multi_cell(0, 10, contenu)

# --- Sauvegarde ---
output_path = "Ecoride_Cahier_des_Charges.pdf"
pdf.output(output_path)

print(f"✅ PDF généré avec succès : {output_path}")
