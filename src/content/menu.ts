// Generated from docs/sources/official-menu-snapshot-2026-10-08.json by
// scripts/build-menu.py, then maintained by hand.
// Source: https://www.itoya.ch/la-carte (checked 8 October 2026).
// `sourceName` keeps the original wording wherever the display name was
// tidied (typos, piece counts, capitalisation) so the owners can review it.
// `price: null` = no price published on the official menu.

import type { MenuCategory } from "./types";

export const menuCheckedOn = "2026-10-08";

export const menu: MenuCategory[] = [
  {
    "id": "sushi",
    "title": "Sushi",
    "intro": "Gunkan, sashimis, nigiris, maki, temaki, California rolls et plateaux à partager.",
    "sections": [
      {
        "id": "gunkan",
        "title": "Gunkan",
        "items": [
          {
            "id": "n31",
            "number": "31",
            "name": "Gunkan thon cuit",
            "price": 7.0
          },
          {
            "id": "n32",
            "number": "32",
            "name": "Gunkan wakame",
            "price": 6.0,
            "labels": [
              "Végétalien"
            ]
          },
          {
            "id": "n33",
            "number": "33",
            "name": "Gunkan surimi",
            "price": 7.0
          },
          {
            "id": "n34",
            "number": "34",
            "name": "Spicy sake gunkan",
            "price": 7.0
          },
          {
            "id": "n35",
            "number": "35",
            "name": "Spicy tuna gunkan",
            "price": 7.0
          },
          {
            "id": "n36",
            "number": "36",
            "name": "Gunkan saumon",
            "price": 8.0
          },
          {
            "id": "n37",
            "number": "37",
            "name": "Gunkan ikura",
            "price": 12.0
          },
          {
            "id": "n38",
            "number": "38",
            "name": "Gunkan tobiko",
            "price": 8.0
          }
        ]
      },
      {
        "id": "sashimis",
        "title": "Sashimis",
        "items": [
          {
            "id": "n41",
            "number": "41",
            "name": "Sashimis",
            "description": "Saumon, thon, crevettes, loup de mer",
            "pieces": 18,
            "price": 49.0,
            "featured": true,
            "sourceName": "N°41 Sashimis (18pièces)"
          },
          {
            "id": "sashimi-mixte",
            "name": "Sashimi mixte",
            "pieces": 9,
            "price": 28.0,
            "sourceName": "Sashimi Mixte (9 pièces)"
          },
          {
            "id": "n43",
            "number": "43",
            "name": "Sashimi thon",
            "price": 20.0
          },
          {
            "id": "n44",
            "number": "44",
            "name": "Sashimi saumon",
            "price": 20.0
          },
          {
            "id": "n45",
            "number": "45",
            "name": "Tataki saumon",
            "price": 24.0
          },
          {
            "id": "n46",
            "number": "46",
            "name": "Tataki thon",
            "price": 26.0
          }
        ]
      },
      {
        "id": "nigiris",
        "title": "Nigiris",
        "items": [
          {
            "id": "n51",
            "number": "51",
            "name": "Nigiri saumon",
            "price": 8.0
          },
          {
            "id": "n52",
            "number": "52",
            "name": "Nigiri thon",
            "price": 9.0
          },
          {
            "id": "n53",
            "number": "53",
            "name": "Nigiri ebi",
            "price": 8.0
          },
          {
            "id": "n54",
            "number": "54",
            "name": "Nigiri ebi cru",
            "price": 10.0
          },
          {
            "id": "n55",
            "number": "55",
            "name": "Nigiri hokkigai",
            "price": 9.0
          },
          {
            "id": "n56",
            "number": "56",
            "name": "Nigiri avocat",
            "price": 8.0,
            "labels": [
              "Végétarien"
            ]
          },
          {
            "id": "n57",
            "number": "57",
            "name": "Nigiri surimi",
            "price": 8.0
          },
          {
            "id": "n58",
            "number": "58",
            "name": "Nigiri omelette",
            "price": 7.0
          },
          {
            "id": "n59",
            "number": "59",
            "name": "Nigiri anguille",
            "price": 10.0
          },
          {
            "id": "nj60",
            "number": "J60",
            "name": "Sushi loup de mer",
            "price": 7.0
          }
        ],
        "note": "Par 2 pièces"
      },
      {
        "id": "hosomaki",
        "title": "Hosomaki",
        "items": [
          {
            "id": "n61",
            "number": "61",
            "name": "Maki saumon",
            "price": 12.0
          },
          {
            "id": "n62",
            "number": "62",
            "name": "Maki thon",
            "price": 12.0
          },
          {
            "id": "n63",
            "number": "63",
            "name": "Maki shinko",
            "price": 10.0
          },
          {
            "id": "n64",
            "number": "64",
            "name": "Maki concombre",
            "price": 10.0
          },
          {
            "id": "n65",
            "number": "65",
            "name": "Maki avocat",
            "price": 10.0,
            "labels": [
              "Végétarien"
            ]
          },
          {
            "id": "n66",
            "number": "66",
            "name": "Maki saumon avocat",
            "price": 14.0
          },
          {
            "id": "n67",
            "number": "67",
            "name": "Maki anguille",
            "price": 16.0
          },
          {
            "id": "n68",
            "number": "68",
            "name": "Maki cheese thon cuit",
            "price": 12.0
          },
          {
            "id": "n69",
            "number": "69",
            "name": "Maki avocat",
            "price": 13.0,
            "labels": [
              "Végétarien"
            ]
          },
          {
            "id": "n70",
            "number": "70",
            "name": "Maki au crabe",
            "price": 10.0
          }
        ]
      },
      {
        "id": "temaki",
        "title": "Temaki",
        "items": [
          {
            "id": "n71",
            "number": "71",
            "name": "Temaki California",
            "price": 10.0
          },
          {
            "id": "n72",
            "number": "72",
            "name": "Temaki au saumon",
            "price": 10.0
          },
          {
            "id": "n73",
            "number": "73",
            "name": "Temaki au thon",
            "price": 11.0
          },
          {
            "id": "n74",
            "number": "74",
            "name": "Temaki à l’anguille",
            "price": 11.0,
            "sourceName": "N°74 Temaki au Anguille"
          },
          {
            "id": "n75",
            "number": "75",
            "name": "Temaki au crabe",
            "price": 10.0
          },
          {
            "id": "n76",
            "number": "76",
            "name": "Temaki aux crevettes",
            "price": 10.0
          },
          {
            "id": "n77",
            "number": "77",
            "name": "Temaki combinés",
            "price": 25.0,
            "featured": true
          }
        ]
      },
      {
        "id": "california-rolls",
        "title": "California Rolls",
        "items": [
          {
            "id": "n80",
            "number": "80",
            "name": "Benkei",
            "description": "Saumon, cheese, avocat",
            "price": 28.0
          },
          {
            "id": "n81",
            "number": "81",
            "name": "Hanabi",
            "japanese": "花火",
            "description": "California thon avocat",
            "price": 28.0,
            "sourceName": "N°81 Hanabi 花火"
          },
          {
            "id": "n82",
            "number": "82",
            "name": "Tora",
            "description": "Anguille, crabe, omelette",
            "price": 28.0
          },
          {
            "id": "n83",
            "number": "83",
            "name": "Deigo",
            "description": "Beignet de poulet, pomme, mangue",
            "price": 26.0
          },
          {
            "id": "n84",
            "number": "84",
            "name": "California cheese avocat",
            "price": 26.0
          },
          {
            "id": "n85",
            "number": "85",
            "name": "Mi-cuit saumon avocat",
            "price": 27.0
          },
          {
            "id": "n86",
            "number": "86",
            "name": "California thon avocat concombre",
            "price": 26.0
          },
          {
            "id": "n87",
            "number": "87",
            "name": "Printemps thon avocat",
            "price": 22.0
          },
          {
            "id": "n89",
            "number": "89",
            "name": "California poulet pané",
            "price": 24.0
          },
          {
            "id": "n90",
            "number": "90",
            "name": "California roll saumon avocat",
            "price": 26.0
          },
          {
            "id": "n91",
            "number": "91",
            "name": "Jade · Hisui",
            "description": "Tobiko, crevettes",
            "pieces": 8,
            "price": 30.0,
            "sourceName": "N°91 Jade/Hisui Tobiko, crevettes 8ps."
          },
          {
            "id": "n92",
            "number": "92",
            "name": "California soft shell crab",
            "pieces": 8,
            "price": 29.0,
            "sourceName": "N°92 California Soft Shell Crab 8ps."
          },
          {
            "id": "nc92",
            "number": "C92",
            "name": "Pink Lady",
            "description": "Saumon, fromage",
            "pieces": 8,
            "price": 32.0,
            "sourceName": "N° C92 PInk Lady/pinkuredi saumon, fromage 8ps."
          },
          {
            "id": "n93",
            "number": "93",
            "name": "Kodaiko",
            "japanese": "小太鼓",
            "description": "Avocat, concombre",
            "pieces": 6,
            "price": 20.0,
            "sourceName": "N°93 KoÐaiko 小太鼓 Avocat concombre 6ps."
          },
          {
            "id": "nc97",
            "number": "C97",
            "name": "California saumon cheese",
            "pieces": 6,
            "price": 22.0,
            "sourceName": "N° C97 California Saumon Cheese 6ps."
          },
          {
            "id": "nj99",
            "number": "J99",
            "name": "Spicy saumon avocat",
            "pieces": 4,
            "price": 25.0,
            "sourceName": "N° J99 Spicy Saumon Avocat4ps."
          }
        ]
      },
      {
        "id": "plateaux-mixtes",
        "title": "Plateaux Mixtes",
        "items": [
          {
            "id": "plateau-1",
            "name": "Plateau 1",
            "lines": [
              "5 Futo maki",
              "4 Nigiris Saumon, Thon, Crevette, Omelette"
            ],
            "price": 20.0
          },
          {
            "id": "plateau-2",
            "name": "Plateau 2",
            "lines": [
              "12 Hosomaki Surimis, Concombres",
              "4 Nigiris Saumon, Thon"
            ],
            "price": 22.0
          },
          {
            "id": "plateau-3",
            "name": "Plateau 3",
            "lines": [
              "3 California maki",
              "3 California Thon cuits Avocat",
              "3 California Saumon Avocat"
            ],
            "price": 26.0
          },
          {
            "id": "plateau-4",
            "name": "Plateau 4",
            "lines": [
              "6 Gunkan Tobiko, Anguille, Wakame",
              "4 Nigiris Thon, Saumon"
            ],
            "price": 26.0
          },
          {
            "id": "plateau-5",
            "name": "Plateau 5",
            "lines": [
              "6 Hosomaki Avocat, Saumon Avocat",
              "3 California Saumon Avocat",
              "4 Nigiris",
              "2 Omelettes"
            ],
            "price": 29.0
          },
          {
            "id": "plateau-6",
            "name": "Plateau 6",
            "lines": [
              "4 Nigiris",
              "6 Hosomaki",
              "6 California maki poulet pané"
            ],
            "price": 29.0
          },
          {
            "id": "plateau-7",
            "name": "Plateau 7",
            "lines": [
              "6 Hosomaki Saumon Avocat",
              "4 Futo maki",
              "6 Nigiris",
              "2 California Surimis"
            ],
            "price": 30.0
          },
          {
            "id": "plateau-8-pont-damour",
            "name": "Plateau 8 · Pont d’amour",
            "lines": [
              "6 Hosomaki cheese Thon",
              "6 Hosomaki cheese Saumon",
              "8 California maki Saumon",
              "4 Sashimis Saumon"
            ],
            "price": 68.0,
            "sourceName": "Plateau 8 Pont d'amour"
          },
          {
            "id": "plateau-9-sushi-maki-mixtes",
            "name": "Plateau 9 · Sushi maki mixtes",
            "lines": [
              "24 Hosomaki Concombres, Surimis, Avocats, Saumon",
              "6 California Thon cuits",
              "5 Futo maki",
              "6 Gunkan Tobiko, Spicy Thon, Spicy Saumon",
              "6 Nigiris Saumon Thon"
            ],
            "pieces": 53,
            "price": 119.0,
            "sourceName": "Plateau 9 Sushi maki mixtes(53 pièces)"
          },
          {
            "id": "plateau-10-bateau-sushi-maki-sashimis",
            "name": "Plateau 10 · Bateau sushi, maki, sashimis",
            "lines": [
              "6 California Poulet pané",
              "12 Hosomaki Avocats, Saumons",
              "6 Nigiris Saumons Thons",
              "6 California Thon cuits",
              "6 Alaska rolls",
              "8 Sashimis Saumons Thons",
              "6 California Surimis"
            ],
            "pieces": 50,
            "price": 139.0,
            "sourceName": "Plateau 10 Bateau Sushi Maki Sashimis (50ps)"
          },
          {
            "id": "plateau-11-tete-a-tete",
            "name": "Plateau 11 · Tête-à-tête",
            "lines": [
              "5 Spécialité Rolls Gambas",
              "6 Gunkan",
              "6 Nigiris Anguilles, Saumons, Thons",
              "3 Oyako Maki Saumons"
            ],
            "pieces": 19,
            "price": 88.0,
            "sourceName": "Plateau 11 Tête à tête (19ps)"
          },
          {
            "id": "bateau-du-coeur",
            "name": "Bateau du Cœur",
            "pieces": 150,
            "price": 399.0,
            "sourceName": "Bateau du Cœur (150pièces)"
          },
          {
            "id": "bateau-royal-specialites-sushi-maki",
            "name": "Bateau royal · Spécialités sushi maki",
            "pieces": 142,
            "price": 518.0,
            "sourceName": "Bateau Royal de Spécialité Sushi Maki (142pièces)"
          }
        ]
      }
    ]
  },
  {
    "id": "plats-principaux",
    "title": "Plats principaux",
    "intro": "Spécialités de la maison, teppan, udon, nouilles et riz sautés.",
    "sections": [
      {
        "id": "specialites-itoya",
        "title": "Spécialités Itoya",
        "items": [
          {
            "id": "n95",
            "number": "95",
            "name": "Dragon Itoya",
            "description": "Gambas, avocat",
            "pieces": 8,
            "price": 28.0,
            "sourceName": "N°95 Dragon Itoya"
          },
          {
            "id": "n96",
            "number": "96",
            "name": "Volcan",
            "description": "Anguille, crevettes, mayonnaise faite maison",
            "pieces": 6,
            "price": 32.0,
            "featured": true,
            "sourceName": "N°96 Volcan (6 pièces)"
          },
          {
            "id": "n130",
            "number": "130",
            "name": "Riz Itoya",
            "description": "Tobiko, omelette",
            "portion": "En assiette",
            "price": 22.0,
            "featured": true,
            "sourceName": "N°130 Riz Itoya en assiette"
          },
          {
            "id": "n136",
            "number": "136",
            "name": "Riz sauté à l’ail",
            "portion": "En assiette",
            "price": 22.0,
            "featured": true,
            "sourceName": "N°136 Riz sauté à l'ail en assiette"
          }
        ]
      },
      {
        "id": "teppan",
        "title": "Teppan",
        "items": [
          {
            "id": "n100",
            "number": "100",
            "name": "Teppan bœuf",
            "portion": "250 g",
            "price": 38.0,
            "sourceName": "N°100 Teppan Bœuf"
          },
          {
            "id": "n101",
            "number": "101",
            "name": "Teppan poulet",
            "portion": "250 g",
            "price": 28.0,
            "sourceName": "N°101 Teppan Poulet"
          },
          {
            "id": "n102",
            "number": "102",
            "name": "Teppan agneau",
            "pieces": 4,
            "price": 38.0,
            "sourceName": "N°102 Teppan Agneau"
          },
          {
            "id": "n103",
            "number": "103",
            "name": "Teppan saumon",
            "pieces": 2,
            "price": 35.0,
            "sourceName": "N°103 Teppan Saumon"
          },
          {
            "id": "n104",
            "number": "104",
            "name": "Teppan moules",
            "pieces": 10,
            "price": 32.0,
            "sourceName": "N°104 Teppan Moules (10 pièces)"
          },
          {
            "id": "n105",
            "number": "105",
            "name": "Teppan calmars",
            "price": 35.0
          },
          {
            "id": "n106",
            "number": "106",
            "name": "Teppan loup de mer",
            "price": 38.0
          },
          {
            "id": "n107",
            "number": "107",
            "name": "Teppan gambas",
            "price": 38.0
          },
          {
            "id": "n108",
            "number": "108",
            "name": "Teppan noix de Saint-Jacques",
            "pieces": 5,
            "price": 42.0,
            "sourceName": "N°108 Teppan Noix de St-Jacques (5 pièces)"
          },
          {
            "id": "n109",
            "number": "109",
            "name": "Teppan de langoustines",
            "pieces": 5,
            "price": 38.0,
            "sourceName": "N°109 Teppan de Langoustines (5pièces)"
          }
        ]
      },
      {
        "id": "udon-nouilles-riz",
        "title": "Udon, nouilles & riz",
        "items": [
          {
            "id": "n120",
            "number": "120",
            "name": "Udon aux légumes",
            "price": 18.0
          },
          {
            "id": "n121",
            "number": "121",
            "name": "Udon aux olives de mer",
            "price": 22.0
          },
          {
            "id": "n122",
            "number": "122",
            "name": "Udon au bœuf",
            "price": 24.0
          },
          {
            "id": "n123",
            "number": "123",
            "name": "Udon tempura végétarien",
            "price": 24.0,
            "sourceName": "N°123 Udon aux végétarien Tempura"
          },
          {
            "id": "n124",
            "number": "124",
            "name": "Udon sauté au poulet",
            "price": 23.0,
            "sourceName": "N°124 Udon sauté aux poulets"
          },
          {
            "id": "n125",
            "number": "125",
            "name": "Udon sauté au bœuf",
            "price": 24.0
          },
          {
            "id": "n126",
            "number": "126",
            "name": "Udon sauté aux fruits de mer",
            "price": 25.0
          },
          {
            "id": "n127",
            "number": "127",
            "name": "Udon sauté aux légumes",
            "price": 18.0
          },
          {
            "id": "n128",
            "number": "128",
            "name": "Udon sauté aux crevettes",
            "price": 25.0
          },
          {
            "id": "n129",
            "number": "129",
            "name": "Nouilles sautées au poulet",
            "price": 22.0,
            "sourceName": "N°129 Nouilles sauté au poulet"
          },
          {
            "id": "n131",
            "number": "131",
            "name": "Nouilles sautées au bœuf",
            "price": 22.0,
            "sourceName": "N°131 Nouilles sauté au bœuf"
          },
          {
            "id": "n132",
            "number": "132",
            "name": "Nouilles sautées aux crevettes",
            "price": 22.0,
            "sourceName": "N°132 Nouilles sautés aux crevettes"
          },
          {
            "id": "n133",
            "number": "133",
            "name": "Nouilles sautées aux légumes",
            "price": 16.0,
            "sourceName": "N°133Nouilles sautés au légume"
          },
          {
            "id": "n134",
            "number": "134",
            "name": "Riz sauté aux crevettes",
            "prices": [
              {
                "label": "En assiette",
                "amount": 20
              },
              {
                "label": "En bol",
                "amount": 12
              }
            ],
            "sourceName": "N°134Riz sauté aux crevettes en assiette"
          },
          {
            "id": "n135",
            "number": "135",
            "name": "Riz sauté au bœuf",
            "prices": [
              {
                "label": "En assiette",
                "amount": 20
              },
              {
                "label": "En bol",
                "amount": 10
              }
            ],
            "sourceName": "N°135 Riz sauté au bœuf en assiette"
          }
        ]
      }
    ]
  },
  {
    "id": "salades-entrees",
    "title": "Salades & entrées",
    "intro": "Pour commencer : salades, soupes, raviolis, tempura et chawanmushi.",
    "sections": [
      {
        "id": "salades",
        "title": "Salades",
        "items": [
          {
            "id": "n1",
            "number": "1",
            "name": "Salade d’algues",
            "price": 14.0,
            "labels": [
              "Végétarien"
            ],
            "sourceName": "N°1 Salade d'algue"
          },
          {
            "id": "n2",
            "number": "2",
            "name": "Salade d’avocat",
            "price": 18.0,
            "labels": [
              "Végétarien"
            ]
          },
          {
            "id": "n3",
            "number": "3",
            "name": "Salade de tofu",
            "price": 16.0,
            "labels": [
              "Végétarien"
            ]
          },
          {
            "id": "n4",
            "number": "4",
            "name": "Salade de crabe",
            "price": 18.0
          },
          {
            "id": "n5",
            "number": "5",
            "name": "Salade d’anguille",
            "price": 20.0
          },
          {
            "id": "n6",
            "number": "6",
            "name": "Salade de bœuf",
            "price": 18.0
          },
          {
            "id": "n7",
            "number": "7",
            "name": "Salade de saumon",
            "price": 20.0
          },
          {
            "id": "n8",
            "number": "8",
            "name": "Salade de thon cuit",
            "price": 18.0
          }
        ]
      },
      {
        "id": "entrees",
        "title": "Entrées",
        "items": [
          {
            "id": "n9",
            "number": "9",
            "name": "Kimchi",
            "price": 12.0,
            "labels": [
              "Végétarien"
            ]
          },
          {
            "id": "n11",
            "number": "11",
            "name": "Edamame",
            "price": 8.0,
            "labels": [
              "Végétarien"
            ]
          },
          {
            "id": "n12",
            "number": "12",
            "name": "Yakitori",
            "price": 12.0
          },
          {
            "id": "n14",
            "number": "14",
            "name": "Raviolis au poulet grillés",
            "pieces": 5,
            "price": 12.0,
            "sourceName": "N°14 Raviolis au poulet grillés 5ps."
          },
          {
            "id": "n15",
            "number": "15",
            "name": "Raviolis au poulet frits",
            "pieces": 5,
            "price": 12.0,
            "sourceName": "N°15 Raviolis au poulet frits 5ps."
          },
          {
            "id": "ne15",
            "number": "E15",
            "name": "Raviolis aux crevettes",
            "price": 12.0
          },
          {
            "id": "n16",
            "number": "16",
            "name": "Raviolis aux légumes grillés",
            "price": 12.0,
            "sourceName": "N°16 Raviolis au légume grillés"
          },
          {
            "id": "ne16",
            "number": "E16",
            "name": "Takoyaki",
            "pieces": 3,
            "price": 16.0,
            "sourceName": "N°E16 Takoyaki 3 ps"
          },
          {
            "id": "n17",
            "number": "17",
            "name": "Raviolis aux légumes frits",
            "price": 12.0,
            "labels": [
              "Végétarien"
            ],
            "sourceName": "N°17 Raviolis au légume frits"
          },
          {
            "id": "ne17",
            "number": "E17",
            "name": "Raviolis au porc grillés",
            "price": 12.0,
            "sourceName": "N° E17 Raviolis au porc Grillé"
          },
          {
            "id": "n19",
            "number": "19",
            "name": "Soupe miso",
            "price": 8.0,
            "sourceName": "N°19 Miso Soupe"
          },
          {
            "id": "n20",
            "number": "20",
            "name": "Soupe miso aux olives de mer",
            "price": 12.0,
            "sourceName": "N°20 Miso soupe aux olives de mer"
          },
          {
            "id": "n22",
            "number": "22",
            "name": "Rouleaux de printemps",
            "price": 8.0
          },
          {
            "id": "n23",
            "number": "23",
            "name": "Pinces au crabe frits",
            "price": 12.0
          },
          {
            "id": "n24",
            "number": "24",
            "name": "Calmars frits",
            "pieces": 5,
            "price": 12.0,
            "sourceName": "N°24 Calmars frits"
          },
          {
            "id": "n25",
            "number": "25",
            "name": "Chawanmushi",
            "price": 12.0,
            "featured": true
          },
          {
            "id": "n26",
            "number": "26",
            "name": "Unagi chawanmushi",
            "price": 15.0
          },
          {
            "id": "n27",
            "number": "27",
            "name": "Ikura chawanmushi",
            "price": 15.0
          },
          {
            "id": "n28",
            "number": "28",
            "name": "Beignet de crevettes",
            "price": 15.0
          },
          {
            "id": "n29",
            "number": "29",
            "name": "Tempura mixte",
            "price": 28.0,
            "sourceName": "N°29 Tempura Mixtes"
          },
          {
            "id": "n30",
            "number": "30",
            "name": "Tempura ebi",
            "price": 22.0
          },
          {
            "id": "nj31",
            "number": "J31",
            "name": "Boulettes de poisson frites",
            "pieces": 2,
            "price": 12.0,
            "sourceName": "N° J31 Boulettes de Poisson frits 2ps."
          }
        ]
      }
    ]
  },
  {
    "id": "bento",
    "title": "Bento",
    "intro": "Des repas complets, composés et servis en coffret.",
    "sections": [
      {
        "id": "bento-teishoku",
        "title": "Bento · Teishoku",
        "items": [
          {
            "id": "bento-1",
            "name": "Bento 1",
            "lines": [
              "1 salade verte",
              "3 Ebi Frits",
              "Teriyaki poulet",
              "Riz"
            ],
            "price": 26.0
          },
          {
            "id": "bento-2",
            "name": "Bento 2",
            "lines": [
              "Salade d’algues",
              "12 hosomaki concombre et surimi",
              "3 nigiris : 2 thon cuit, 1 gunkan surimi"
            ],
            "price": 26.0
          },
          {
            "id": "bento-3",
            "name": "Bento 3",
            "lines": [
              "1 salade verte",
              "1 rouleau de printemps",
              "Teppan crevettes",
              "Riz"
            ],
            "price": 28.0
          },
          {
            "id": "bento-4",
            "name": "Bento 4",
            "lines": [
              "1 salade verte",
              "1 rouleau de printemps",
              "Teppan saumon",
              "Riz"
            ],
            "price": 28.0
          },
          {
            "id": "bento-5",
            "name": "Bento 5",
            "lines": [
              "1 salade verte",
              "1 rouleau de printemps",
              "Teppan bœuf",
              "Riz"
            ],
            "price": 30.0
          },
          {
            "id": "bento-6",
            "name": "Bento 6",
            "lines": [
              "1 Salade d’algue",
              "2 Gunkan surimi Thon",
              "3 Sashimi Saumon",
              "6 Nigiris"
            ],
            "price": 30.0
          },
          {
            "id": "bento-7",
            "name": "Bento 7",
            "lines": [
              "1 salade d’algues",
              "4 nigiris saumon, thon, crevette, loup de mer",
              "4 California thon cuit",
              "6 sashimis saumon et thon"
            ],
            "price": 32.0
          },
          {
            "id": "bento-8",
            "name": "Bento 8",
            "lines": [
              "1 salade verte",
              "3 ebi frits",
              "Teppan anguille",
              "Riz"
            ],
            "price": 32.0
          },
          {
            "id": "bento-9",
            "name": "Bento 9",
            "lines": [
              "1 Salade verte",
              "2 Nigiris Saumon",
              "3 Sashimi Saumon",
              "8 California Saumon"
            ],
            "price": 32.0
          },
          {
            "id": "bento-10-vegetarien",
            "name": "Bento 10 · Végétarien",
            "lines": [
              "Soupe miso",
              "Salade",
              "3 raviolis aux légumes",
              "Udon sautés aux légumes"
            ],
            "price": 22.0,
            "labels": [
              "Végétarien"
            ],
            "sourceName": "Bento 10 Végétarien"
          },
          {
            "id": "bento-11-tempura",
            "name": "Bento 11 · Tempura",
            "lines": [
              "Soupe miso",
              "Tempura de légumes",
              "12 maki",
              "Salade"
            ],
            "price": 22.0,
            "labels": [
              "Végétarien"
            ],
            "sourceName": "Bento 11 Tempura"
          },
          {
            "id": "bento-12-porc-frit",
            "name": "Bento 12 · Porc frit",
            "lines": [
              "Soupe miso",
              "Salade",
              "Riz sauté au bœuf",
              "Porc frit",
              "Fruits"
            ],
            "price": 24.0,
            "sourceName": "Bento 12 porc frits"
          },
          {
            "id": "bento-13-udon-poulet",
            "name": "Bento 13 · Udon poulet",
            "lines": [
              "Soupe miso",
              "Salade",
              "3 raviolis au poulet frits",
              "Udon sautés au poulet"
            ],
            "price": 24.0,
            "sourceName": "Bento 13 Udon Poulet"
          },
          {
            "id": "bento-14-poulet-frit",
            "name": "Bento 14 · Poulet frit",
            "lines": [
              "Soupe miso",
              "Salade",
              "Poulet frit",
              "Riz",
              "Fruits"
            ],
            "price": 26.0,
            "sourceName": "Bento 14 Poulet frit"
          },
          {
            "id": "bento-15-canard-laque",
            "name": "Bento 15 · Canard laqué",
            "lines": [
              "Soupe miso",
              "Salade",
              "Canard laqué",
              "Riz",
              "Fruit"
            ],
            "price": 30.0,
            "sourceName": "Bento15 Canard laqué"
          },
          {
            "id": "bento-16-poulet-croustillant",
            "name": "Bento 16 · Poulet croustillant",
            "lines": [
              "1 salade",
              "Poulet croustillant",
              "Riz",
              "Fruits"
            ],
            "price": 28.0,
            "sourceName": "Bento 16 Poulet Croustillant"
          }
        ]
      },
      {
        "id": "box",
        "title": "Box",
        "items": [
          {
            "id": "box-porc-frit-sauce-curry",
            "name": "Box porc frit, sauce curry",
            "price": 22.0,
            "sourceName": "Box Porc Frits avec sauce curry"
          },
          {
            "id": "box-anguille",
            "name": "Box anguille",
            "price": 28.0
          },
          {
            "id": "box-tempura-mixte",
            "name": "Box tempura mixte",
            "description": "Légumes et crevettes",
            "price": 28.0,
            "sourceName": "Box Tempura Mixtes"
          },
          {
            "id": "box-poulet-teriyaki",
            "name": "Box poulet teriyaki",
            "price": 22.0,
            "sourceName": "Box Teriaki Poulet"
          }
        ]
      }
    ]
  },
  {
    "id": "desserts",
    "title": "Desserts",
    "intro": "Coupes glacées, mochis et douceurs pour finir.",
    "sections": [
      {
        "id": "desserts",
        "title": "Desserts",
        "items": [
          {
            "id": "coupe-de-glace-itoya",
            "name": "Coupe de glace Itoya",
            "description": "Glace noix de coco, vanille, moka, crème et poudre de tempura croquante",
            "price": 18.0,
            "featured": true,
            "sourceName": "Coupe de glace Itoya"
          },
          {
            "id": "banana-split",
            "name": "Banana split",
            "price": 12.0,
            "sourceName": "Banane Splits"
          },
          {
            "id": "glace-au-the-vert-maison",
            "name": "Glace au thé vert maison",
            "price": 5.5,
            "sourceName": "Glace thé vert fait-maison"
          },
          {
            "id": "coupe-de-litchis",
            "name": "Coupe de litchis",
            "price": 9.0,
            "sourceName": "Coupe de Lychée"
          },
          {
            "id": "coupe-danemark",
            "name": "Coupe Danemark",
            "price": 12.0
          },
          {
            "id": "coupe-colonel",
            "name": "Coupe Colonel",
            "price": 12.0
          },
          {
            "id": "beignet-dananas",
            "name": "Beignet d’ananas",
            "price": null
          },
          {
            "id": "beignet-de-banane",
            "name": "Beignet de banane",
            "pieces": 1,
            "price": null,
            "sourceName": "Beignet de banane 1p."
          },
          {
            "id": "croquettes-a-la-banane",
            "name": "Croquettes à la banane",
            "pieces": 2,
            "price": null,
            "sourceName": "Croquette aux bananes 2ps"
          },
          {
            "id": "croquettes-au-chocolat",
            "name": "Croquettes au chocolat",
            "price": null,
            "sourceName": "Croquette aux chocolats"
          },
          {
            "id": "glace-citron",
            "name": "Glace citron",
            "portion": "1 boule",
            "price": null,
            "sourceName": "Glace Citron 1boule"
          },
          {
            "id": "glace-fraise",
            "name": "Glace fraise",
            "portion": "1 boule",
            "price": null,
            "sourceName": "Glace Fraise 1 boule"
          },
          {
            "id": "glace-de-noix-de-coco",
            "name": "Glace de noix de coco",
            "price": 12.0
          },
          {
            "id": "mochi-mangue",
            "name": "Mochi mangue",
            "pieces": 1,
            "price": 5.0,
            "sourceName": "Mochi Mangue (1pièce)"
          },
          {
            "id": "mochi-pistache",
            "name": "Mochi pistache",
            "pieces": 1,
            "price": 5.0,
            "sourceName": "Mochi Pistache (1pièce)"
          },
          {
            "id": "mochi-vanille",
            "name": "Mochi vanille",
            "pieces": 1,
            "price": 5.0,
            "sourceName": "Mochi Vanille (1pièce)"
          },
          {
            "id": "mochi-citron",
            "name": "Mochi citron",
            "price": 5.0
          }
        ]
      }
    ]
  }
];
