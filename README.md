# Atsipirkimas

Investicijų žurnalas, sukurtas su React ir Vite. Leidžia suvesti investicijas (metai, mėnuo, suma eurais), matyti bendrą investuotą sumą ir nurodyti projekto vykdymo būseną.

## Funkcijos

- Investicijų pridėjimas per formą (metai, mėnuo, suma)
- Investicijų sąrašas lentelėje su galimybe ištrinti įrašą
- Bendros investuotos sumos skaičiavimas
- Projekto vykdymo būsena: `Nepradėta`, `Vykdoma`, `Baigta`
- Duomenų išsaugojimas naršyklėje (`localStorage`)
- Sumų formatavimas pagal lietuvišką standartą (`5 000,00 Eur`)
- Puslapio viršuje rodomas euro monetų paveikslėlis

### Būsenos taisyklės

- Be įrašų projektas yra `Nepradėta`
- Pridėjus pirmą įrašą būsena automatiškai tampa `Vykdoma`
- `Baigta` galima pasirinkti tik turint bent vieną įrašą
- Kai projekto būsena `Baigta`, investicijų formos laukai ir įrašų trynimo mygtukai išjungiami
- Pridėjimo ir trynimo veiksmai papildomai tikrina projekto būseną

## Technologijos

- React 19
- Vite 8
- JavaScript (be TypeScript)
- ESLint
- Savi CSS failai, be išorinių UI ar state valdymo bibliotekų

## Paleidimas

Reikalingas [Node.js](https://nodejs.org/).

```bash
npm install
npm run dev
```

Kitos komandos:

| Komanda | Paskirtis |
|---|---|
| `npm run dev` | Kūrimo serveris |
| `npm run build` | Produkcinis build'as |
| `npm run preview` | Build'o peržiūra |
| `npm run lint` | Kodo patikra su ESLint |

## Projekto struktūra

```
src/
├── main.jsx                    # Įėjimo taškas
├── App.jsx                     # Pagrindinis komponentas ir euro monetų paveikslėlis
├── InvesticijaIsViso.jsx       # Forma, lentelė, bendra suma
├── ProjektoVykdymoBusena.jsx   # Projekto būsenos pasirinkimas
├── investicijos.js             # Konstantos, formatavimas, localStorage
├── assets/hero-coins.jpg       # Puslapio viršutinis paveikslėlis
└── *.css                       # Komponentų stiliai
```

## Duomenų modelis

```js
{
  id: string,     // crypto.randomUUID()
  metai: number,
  menuo: string,  // 'Sausis' ... 'Gruodis'
  suma: number
}
```

Duomenys saugomi `localStorage` raktu `atsipirkimas-investicijos`.

## Žinomi apribojimai

- Projekto būsena po puslapio perkrovimo neišsaugoma
- Įrašai rodomi įvedimo tvarka, ne chronologiškai
- Pradiniame puslapyje dar likęs Vite šablono turinys

## Planai

- Išvalyti Vite šablono turinį
- Rikiuoti įrašus chronologiškai
- Pridėti atsipirkimo skaičiavimą (logika dar neapibrėžta)