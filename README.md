# Atsipirkimas

Investicijų žurnalas, sukurtas su React ir Vite. Leidžia suvesti investicijas (metai, mėnuo, suma eurais), matyti bendrą investuotą sumą ir nurodyti projekto vykdymo būseną.

## Funkcijos

- Investicijų pridėjimas per formą (metai, mėnuo, suma)
- Investicijų sąrašas lentelėje su galimybe ištrinti įrašą
- Mėnesinių investicijų stulpelinė diagrama šalia įrašų lentelės
- Diagramos sumos agreguojamos pagal mėnesį ir metus, o mėnesiai rikiuojami chronologiškai
- Diagramoje užvedus pelės žymeklį ant stulpelio rodoma tiksli suma
- Mažesniuose ekranuose lentelė ir diagrama išdėstomos viena po kitos
- Bendros investuotos sumos skaičiavimas
- Projekto naudos aprašymas, išsaugomas naršyklėje
- Sutaupyto vandens ir investicijos naudos rezultatų kortelės (pradinės reikšmės: 0)
- Atskiri „Investicijos“ ir „Projekto nauda“ puslapio vaizdai, perjungiami navigacija
- Projekto vykdymo būsena: `Nepradėta`, `Vykdoma`, `Baigta`
- Duomenų išsaugojimas naršyklėje (`localStorage`)
- Sumų formatavimas pagal lietuvišką standartą (`5 000,00 Eur`)

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
├── App.jsx                     # Pagrindinis komponentas ir bendros būsenos
├── ProjektoNauda.jsx           # Projekto naudos aprašymas ir rezultatų kortelės
├── ProjektoNauda.css           # Projekto naudos stiliai
├── InvesticijaIsViso.jsx       # Forma, lentelė, bendra suma ir mėnesinė diagrama
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

Projekto naudos duomenys saugomi atskirai raktu `atsipirkimas-projekto-nauda`:

```js
{
  aprasymas: string,
  sutaupytaVandens: number, // m³
  investicijosNauda: number // Eur
}
```

Puslapio vaizdai pasirenkami URL fragmentais `#investicijos` ir `#projekto-nauda`.

## Žinomi apribojimai

- Projekto būsena po puslapio perkrovimo neišsaugoma
- Įrašai rodomi įvedimo tvarka, ne chronologiškai
- Mėnesio ir metų poros diagramoje rodomos chronologiškai; keli to paties mėnesio ir metų įrašai sudedami
- Pradiniame puslapyje dar likęs Vite šablono turinys

## Planai

- Išvalyti Vite šablono turinį
- Nuspręsti, ar įrašų lentelę rikiuoti chronologiškai
- Pridėti atsipirkimo skaičiavimą (logika dar neapibrėžta)
