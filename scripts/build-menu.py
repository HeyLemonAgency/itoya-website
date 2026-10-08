#!/usr/bin/env python3
"""Generate src/content/menu.ts from the official menu snapshot.

The snapshot (docs/sources/official-menu-snapshot-*.json) was extracted from the
Wix Restaurants data embedded in https://www.itoya.ch/la-carte on 2026-10-08.

Run once when re-importing the official menu:
    python3 scripts/build-menu.py docs/sources/official-menu-snapshot-2026-10-08.json

Day-to-day edits (a price, a new dish) should be made directly in
src/content/menu.ts — this script is only for a full re-import.

Every editorial change to a source name is listed in CORRECTIONS so the owners
can review it (see docs/PROJECT_NOTES.md).
"""
import json
import re
import sys
import unicodedata

# Source name -> display fields. Only typos, grammar, spacing, piece counts and
# capitalisation are touched; the dish itself is never changed.
CORRECTIONS = {
    "N°31 Gunkan Thon Cuit": {"name": "Gunkan thon cuit"},
    "N°33 Gunkan Surimi": {"name": "Gunkan surimi"},
    "N°34 Spicy Sake Gunkan": {"name": "Spicy sake gunkan"},
    "N°35 Spicy Tuna Gunkan": {"name": "Spicy tuna gunkan"},
    "N°36 Gunkan Saumon": {"name": "Gunkan saumon"},
    "N°37 Gunkan Ikura": {"name": "Gunkan ikura"},
    "N°38 Gunkan Tobiko": {"name": "Gunkan tobiko"},
    "N°32 Gunkan Wakame": {"name": "Gunkan wakame"},
    "N°41 Sashimis (18pièces)": {"name": "Sashimis", "pieces": 18,
                                  "description": "Saumon, thon, crevettes, loup de mer"},
    "Sashimi Mixte (9 pièces)": {"name": "Sashimi mixte", "pieces": 9},
    "N°43 Sashimi Thon": {"name": "Sashimi thon"},
    "N°44 Sashimi Saumon": {"name": "Sashimi saumon"},
    "N°45 Tataki Saumon": {"name": "Tataki saumon"},
    "N°46 Tataki Thon": {"name": "Tataki thon"},
    "N°51 Nigiri Saumon": {"name": "Nigiri saumon"},
    "N°52 Nigiri Thon": {"name": "Nigiri thon"},
    "N°53 Nigiri Ebi": {"name": "Nigiri ebi"},
    "N°54 Nigiri Ebi Cru": {"name": "Nigiri ebi cru"},
    "N°55 Nigiri Hokkigai": {"name": "Nigiri hokkigai"},
    "N°56 Nigiri Avocat": {"name": "Nigiri avocat"},
    "N°57 Nigiri Surimi": {"name": "Nigiri surimi"},
    "N°58 Nigiri Omelette": {"name": "Nigiri omelette"},
    "N°59 Nigiri Anguille": {"name": "Nigiri anguille"},
    "N° J60 Sushi Loup de mer": {"name": "Sushi loup de mer"},
    "N°61 Maki Saumon": {"name": "Maki saumon"},
    "N°62 Maki Thon": {"name": "Maki thon"},
    "N°63 Maki Shinko": {"name": "Maki shinko"},
    "N°64 Maki Concombre": {"name": "Maki concombre"},
    "N°65 Maki Avocat": {"name": "Maki avocat"},
    "N°66 Maki Saumon Avocat": {"name": "Maki saumon avocat"},
    "N°67 Maki Anguille": {"name": "Maki anguille"},
    "N°68 Maki Cheese Thon cuit": {"name": "Maki cheese thon cuit"},
    "N°69 Maki Avocat": {"name": "Maki avocat"},
    "N°70 Maki au Crabe": {"name": "Maki au crabe"},
    "N°71 Temaki California": {"name": "Temaki California"},
    "N°72 Temaki au Saumon": {"name": "Temaki au saumon"},
    "N°73 Temaki au Thon": {"name": "Temaki au thon"},
    "N°74 Temaki au Anguille": {"name": "Temaki à l’anguille"},
    "N°75 Temaki au Crabe": {"name": "Temaki au crabe"},
    "N°76 Temaki aux Crevettes": {"name": "Temaki aux crevettes"},
    "N°77 Temaki combinés": {"name": "Temaki combinés"},
    "N°80 Benkei": {"description": "Saumon, cheese, avocat"},
    "N°81 Hanabi 花火": {"name": "Hanabi", "japanese": "花火",
                         "description": "California thon avocat"},
    "N°82 Tora": {"description": "Anguille, crabe, omelette"},
    "N°83 Deigo": {"description": "Beignet de poulet, pomme, mangue"},
    "N°84 California Cheese Avocat": {"name": "California cheese avocat"},
    "N°85 Mi-cuit Saumon Avocat": {"name": "Mi-cuit saumon avocat"},
    "N°86 California Thon Avocat Concombre": {"name": "California thon avocat concombre"},
    "N°87 Printemps Thon Avocat": {"name": "Printemps thon avocat"},
    "N°89 California Poulet Pané": {"name": "California poulet pané"},
    "N°90 California roll Saumon Avocat": {"name": "California roll saumon avocat"},
    "N°91 Jade/Hisui Tobiko, crevettes 8ps.": {"name": "Jade · Hisui", "pieces": 8,
                                                "description": "Tobiko, crevettes"},
    "N°92 California Soft Shell Crab 8ps.": {"name": "California soft shell crab", "pieces": 8},
    "N° C92 PInk Lady/pinkuredi saumon, fromage 8ps.": {"name": "Pink Lady", "pieces": 8,
                                                          "description": "Saumon, fromage"},
    "N°93 KoÐaiko 小太鼓 Avocat concombre 6ps.": {"name": "Kodaiko", "japanese": "小太鼓",
                                                   "pieces": 6, "description": "Avocat, concombre"},
    "N° C97 California Saumon Cheese 6ps.": {"name": "California saumon cheese", "pieces": 6},
    "N° J99 Spicy Saumon Avocat4ps.": {"name": "Spicy saumon avocat", "pieces": 4},
    "Plateau 8 Pont d'amour": {"name": "Plateau 8 · Pont d’amour"},
    "Plateau 9 Sushi maki mixtes(53 pièces)": {"name": "Plateau 9 · Sushi maki mixtes", "pieces": 53},
    "Plateau 10 Bateau Sushi Maki Sashimis (50ps)": {"name": "Plateau 10 · Bateau sushi, maki, sashimis",
                                                      "pieces": 50},
    "Plateau 11 Tête à tête (19ps)": {"name": "Plateau 11 · Tête-à-tête", "pieces": 19},
    "Bateau du Cœur (150pièces)": {"name": "Bateau du Cœur", "pieces": 150},
    "Bateau Royal de Spécialité Sushi Maki (142pièces)": {"name": "Bateau royal · Spécialités sushi maki",
                                                           "pieces": 142},
    "N°95 Dragon Itoya": {"name": "Dragon Itoya", "pieces": 8, "description": "Gambas, avocat"},
    "N°96 Volcan (6 pièces)": {"name": "Volcan", "pieces": 6,
                               "description": "Anguille, crevettes, mayonnaise faite maison"},
    "N°130 Riz Itoya en assiette": {"name": "Riz Itoya", "portion": "En assiette",
                                    "description": "Tobiko, omelette"},
    "N°136 Riz sauté à l'ail en assiette": {"name": "Riz sauté à l’ail", "portion": "En assiette"},
    "N°100 Teppan Bœuf": {"name": "Teppan bœuf", "portion": "250 g", "description": ""},
    "N°101 Teppan Poulet": {"name": "Teppan poulet", "portion": "250 g", "description": ""},
    "N°102 Teppan Agneau": {"name": "Teppan agneau", "pieces": 4, "description": ""},
    "N°103 Teppan Saumon": {"name": "Teppan saumon", "pieces": 2, "description": ""},
    "N°104 Teppan Moules (10 pièces)": {"name": "Teppan moules", "pieces": 10},
    "N°105 Teppan Calmars": {"name": "Teppan calmars"},
    "N°106 Teppan Loup de mer": {"name": "Teppan loup de mer"},
    "N°107 Teppan Gambas": {"name": "Teppan gambas"},
    "N°108 Teppan Noix de St-Jacques (5 pièces)": {"name": "Teppan noix de Saint-Jacques", "pieces": 5},
    "N°109 Teppan de Langoustines (5pièces)": {"name": "Teppan de langoustines", "pieces": 5},
    "N°120 Udon aux légumes": {},
    "N°123 Udon aux végétarien Tempura": {"name": "Udon tempura végétarien"},
    "N°124 Udon sauté aux poulets": {"name": "Udon sauté au poulet"},
    "N°129 Nouilles sauté au poulet": {"name": "Nouilles sautées au poulet"},
    "N°131 Nouilles sauté au bœuf": {"name": "Nouilles sautées au bœuf"},
    "N°132 Nouilles sautés aux crevettes": {"name": "Nouilles sautées aux crevettes"},
    "N°133Nouilles sautés au légume": {"name": "Nouilles sautées aux légumes"},
    "N°134Riz sauté aux crevettes en assiette": {"name": "Riz sauté aux crevettes", "description": "",
                                                 "variants": [["En assiette", 20], ["En bol", 12]]},
    "N°135 Riz sauté au bœuf en assiette": {"name": "Riz sauté au bœuf", "description": "",
                                            "variants": [["En assiette", 20], ["En bol", 10]]},
    "N°1 Salade d'algue": {"name": "Salade d’algues"},
    "N°2 Salade d'avocat": {"name": "Salade d’avocat"},
    "N°3 Salade de Tofu": {"name": "Salade de tofu"},
    "N°4 Salade de Crabe": {"name": "Salade de crabe"},
    "N°5 Salade d'anguille": {"name": "Salade d’anguille"},
    "N°7 Salade de Saumon": {"name": "Salade de saumon"},
    "N°8 Salade de Thon Cuit": {"name": "Salade de thon cuit"},
    "N°14 Raviolis au poulet grillés 5ps.": {"name": "Raviolis au poulet grillés", "pieces": 5},
    "N°15 Raviolis au poulet frits 5ps.": {"name": "Raviolis au poulet frits", "pieces": 5},
    "N°16 Raviolis au légume grillés": {"name": "Raviolis aux légumes grillés"},
    "N°E16 Takoyaki 3 ps": {"name": "Takoyaki", "pieces": 3},
    "N°17 Raviolis au légume frits": {"name": "Raviolis aux légumes frits"},
    "N° E17 Raviolis au porc Grillé": {"name": "Raviolis au porc grillés"},
    "N°19 Miso Soupe": {"name": "Soupe miso"},
    "N°20 Miso soupe aux olives de mer": {"name": "Soupe miso aux olives de mer"},
    "N°24 Calmars frits": {"pieces": 5, "description": ""},
    "N°26 Unagi Chawanmushi": {"name": "Unagi chawanmushi"},
    "N°27 Ikura Chawanmushi": {"name": "Ikura chawanmushi"},
    "N°29 Tempura Mixtes": {"name": "Tempura mixte"},
    "N°30 Tempura Ebi": {"name": "Tempura ebi"},
    "N° J31 Boulettes de Poisson frits 2ps.": {"name": "Boulettes de poisson frites", "pieces": 2},
    "Bento 2": {"lines": ["Salade d’algues", "12 hosomaki concombre et surimi",
                          "3 nigiris : 2 thon cuit, 1 gunkan surimi"]},
    "Bento 3": {"lines": ["1 salade verte", "1 rouleau de printemps", "Teppan crevettes", "Riz"]},
    "Bento 4": {"lines": ["1 salade verte", "1 rouleau de printemps", "Teppan saumon", "Riz"]},
    "Bento 5": {"lines": ["1 salade verte", "1 rouleau de printemps", "Teppan bœuf", "Riz"]},
    "Bento 7": {"lines": ["1 salade d’algues", "4 nigiris saumon, thon, crevette, loup de mer",
                          "4 California thon cuit", "6 sashimis saumon et thon"]},
    "Bento 8": {"lines": ["1 salade verte", "3 ebi frits", "Teppan anguille", "Riz"]},
    "Bento 10 Végétarien": {"name": "Bento 10 · Végétarien",
                            "lines": ["Soupe miso", "Salade", "3 raviolis aux légumes",
                                      "Udon sautés aux légumes"]},
    "Bento 11 Tempura": {"name": "Bento 11 · Tempura",
                         "lines": ["Soupe miso", "Tempura de légumes", "12 maki", "Salade"]},
    "Bento 12 porc frits": {"name": "Bento 12 · Porc frit",
                            "lines": ["Soupe miso", "Salade", "Riz sauté au bœuf", "Porc frit", "Fruits"]},
    "Bento 13 Udon Poulet": {"name": "Bento 13 · Udon poulet",
                             "lines": ["Soupe miso", "Salade", "3 raviolis au poulet frits",
                                       "Udon sautés au poulet"]},
    "Bento 14 Poulet frit": {"name": "Bento 14 · Poulet frit",
                             "lines": ["Soupe miso", "Salade", "Poulet frit", "Riz", "Fruits"]},
    "Bento15 Canard laqué": {"name": "Bento 15 · Canard laqué",
                             "lines": ["Soupe miso", "Salade", "Canard laqué", "Riz", "Fruit"]},
    "Bento 16 Poulet Croustillant": {"name": "Bento 16 · Poulet croustillant",
                                     "lines": ["1 salade", "Poulet croustillant", "Riz", "Fruits"]},
    "Box Porc Frits avec sauce curry": {"name": "Box porc frit, sauce curry"},
    "Box Anguille": {"name": "Box anguille"},
    "Box Tempura Mixtes": {"name": "Box tempura mixte", "description": "Légumes et crevettes"},
    "Box Teriaki Poulet": {"name": "Box poulet teriyaki"},
    "Coupe de glace Itoya": {"description": "Glace noix de coco, vanille, moka, crème et poudre de tempura croquante"},
    "Banane Splits": {"name": "Banana split"},
    "Glace thé vert fait-maison": {"name": "Glace au thé vert maison"},
    "Coupe de Lychée": {"name": "Coupe de litchis"},
    "Beignet de banane 1p.": {"name": "Beignet de banane", "pieces": 1},
    "Croquette aux bananes 2ps": {"name": "Croquettes à la banane", "pieces": 2},
    "Croquette aux chocolats": {"name": "Croquettes au chocolat"},
    "Glace Citron 1boule": {"name": "Glace citron", "portion": "1 boule"},
    "Glace Fraise 1 boule": {"name": "Glace fraise", "portion": "1 boule"},
    "Mochi Mangue (1pièce)": {"name": "Mochi mangue", "pieces": 1},
    "Mochi Pistache (1pièce)": {"name": "Mochi pistache", "pieces": 1},
    "Mochi Vanille (1pièce)": {"name": "Mochi vanille", "pieces": 1},
    "Mochi Citron": {"name": "Mochi citron"},
}

# Composition lines for platters and bentos: light typographic clean-up only.
LINE_FIXES = {
    "Alaka Rolls": "Alaska rolls",
    "1Gunkan": "1 gunkan",
    "Rouleux": "Rouleau",
}

CATEGORY_INTRO = {
    "Sushi": "Gunkan, sashimis, nigiris, maki, temaki, California rolls et plateaux à partager.",
    "Plats principaux": "Spécialités de la maison, teppan, udon, nouilles et riz sautés.",
    "Salades & Entrées": "Pour commencer : salades, soupes, raviolis, tempura et chawanmushi.",
    "Bento": "Des repas complets, composés et servis en coffret.",
    "Desserts": "Coupes glacées, mochis et douceurs pour finir.",
}

CATEGORY_TITLE = {"Salades & Entrées": "Salades & entrées"}


def slug(s):
    s = s.replace("œ", "oe").replace("Œ", "oe").replace("æ", "ae").replace("’", "").replace("'", "")
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
    return s


def parse_number(name):
    m = re.match(r"^N°\s*([A-Z]?\s?\d+)\s*(.*)$", name)
    if m:
        return m.group(1).replace(" ", ""), m.group(2).strip()
    return None, name.strip()


def clean_line(line):
    line = line.strip()
    for a, b in LINE_FIXES.items():
        line = line.replace(a, b)
    return line


def typo(s):
    """Typographic apostrophes for display text."""
    return s.replace("'", "\u2019") if isinstance(s, str) else s


def main(path):
    menus = json.load(open(path, encoding="utf-8"))
    out = []
    used_ids = set()
    image_sources = {}
    for menu in menus:
        cat_title = CATEGORY_TITLE.get(menu["name"], menu["name"])
        cat = {"id": slug(cat_title), "title": cat_title,
               "intro": CATEGORY_INTRO.get(menu["name"], ""), "sections": []}
        for sec in menu["sections"]:
            title = sec["name"].strip()
            if title == "Udon/Nouilles/Riz":
                title = "Udon, nouilles & riz"
            if title == "Bento/ Teishoku":
                title = "Bento · Teishoku"
            section = {"id": slug(title), "title": title, "items": []}
            if sec.get("description"):
                section["note"] = sec["description"].strip()
            for it in sec["items"]:
                src = it["name"]
                number, name = parse_number(src)
                fix = CORRECTIONS.get(src, {})
                desc = it.get("description") or ""
                lines = None
                if "\n" in desc.strip():
                    lines = [clean_line(x) for x in desc.split("\n") if x.strip()]
                    desc = ""
                item = {}
                base_id = slug(("n" + number) if number else fix.get("name", name))
                iid = base_id
                k = 2
                while iid in used_ids:
                    iid = f"{base_id}-{k}"
                    k += 1
                used_ids.add(iid)
                item["id"] = iid
                if number:
                    item["number"] = number
                item["name"] = typo(fix.get("name", name.strip()))
                if fix.get("japanese"):
                    item["japanese"] = fix["japanese"]
                d = "" if fix.get("lines") else fix.get("description", desc.strip())
                if d:
                    item["description"] = typo(d)
                if fix.get("lines") or lines:
                    item["lines"] = [typo(x) for x in (fix.get("lines") or lines)]
                if fix.get("pieces"):
                    item["pieces"] = fix["pieces"]
                if fix.get("portion"):
                    item["portion"] = fix["portion"]
                if fix.get("variants"):
                    item["prices"] = [{"label": a, "amount": b} for a, b in fix["variants"]]
                else:
                    price = (it.get("price") or "").strip()
                    amount = float(price) if price else 0
                    item["price"] = None if amount == 0 else amount
                labels = [l for l in it.get("labels", []) if l in ("Végétarien", "Végétalien")]
                if labels:
                    item["labels"] = labels
                if it.get("featured"):
                    item["featured"] = True
                if it.get("image"):
                    image_sources[iid] = it["image"].rsplit("/", 1)[-1]
                def norm(x):
                    return re.sub(r"[\s'’]", "", x).lower()
                if norm(item["name"]) != norm(name) or (
                        "description" in fix and norm(fix["description"]) != norm(desc)):
                    item["sourceName"] = src
                section["items"].append(item)
            cat["sections"].append(section)
        out.append(cat)

    lines = [
        "// Generated from docs/sources/official-menu-snapshot-2026-10-08.json by",
        "// scripts/build-menu.py, then maintained by hand.",
        "// Source: https://www.itoya.ch/la-carte (checked 8 October 2026).",
        "// `sourceName` keeps the original wording wherever the display name was",
        "// tidied (typos, piece counts, capitalisation) so the owners can review it.",
        "// `price: null` = no price published on the official menu.",
        "",
        'import type { MenuCategory } from "./types";',
        "",
        "export const menuCheckedOn = \"2026-10-08\";",
        "",
        "export const menu: MenuCategory[] = " + json.dumps(out, ensure_ascii=False, indent=2) + ";",
        "",
    ]
    open("src/content/menu.ts", "w", encoding="utf-8").write("\n".join(lines))
    # Dish photo per item (Wix media id), consumed by scripts/process-menu-images.mjs
    json.dump(image_sources, open("scripts/menu-image-sources.json", "w"), indent=1, sort_keys=True)
    n = sum(len(s["items"]) for c in out for s in c["sections"])
    print(f"wrote src/content/menu.ts: {len(out)} categories, {n} items")


if __name__ == "__main__":
    main(sys.argv[1])
