# Atsipirkimas

Investicijų žurnalas, sukurtas su React ir Vite. Leidžia suvesti investicijas (metai, mėnuo, suma eurais), matyti bendrą investuotą sumą ir nurodyti projekto vykdymo būseną.

## Funkcijos

- Investicijų pridėjimas per formą (metai, mėnuo, suma)
- Investicijų sąrašas lentelėje su galimybe ištrinti įrašą
- Bendros investuotos sumos skaičiavimas
- Projekto vykdymo būsena: `Nepradėta`, `Vykdoma`, `Baigta`
- Duomenų išsaugojimas naršyklėje (`localStorage`)
- Sumų formatavimas pagal lietuvišką standartą (`5 000,00 Eur`)

### Būsenos taisyklės

- Be įrašų projektas yra `Nepradėta`
- Pridėjus pirmą įrašą būsena automatiškai tampa `Vykdoma`
- `Baigta` galima pasirinkti tik turint bent vieną įrašą
- Kai projektas `Baigta`, naujų investicijų pridėti negalima

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
├── App.jsx                     # Pagrindinis komponentas, laiko state
├── InvesticijaisViso.jsx       # Forma, lentelė, bendra suma
├── ProjektoVykdymoBusena.jsx   # Projekto būsenos pasirinkimas
├── investicijos.js             # Konstantos, formatavimas, localStorage
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
- Failo `InvesticijaisViso.jsx` pavadinimas nesutampa su importais (`InvesticijaIsViso`), todėl Linux aplinkoje build'as gali nepavykti
- Trynimas leidžiamas ir tada, kai projektas `Baigta`
- Įrašai rodomi įvedimo tvarka, ne chronologiškai
- Pradiniame puslapyje dar likęs Vite šablono turinys

## Planai

- Ištaisyti aukščiau paminėtus apribojimus
- Išvalyti Vite šablono turinį
- Rikiuoti įrašus chronologiškai
- Pridėti atsipirkimo skaičiavimą (logika dar neapibrėžta)