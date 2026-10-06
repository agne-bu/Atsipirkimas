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
- Mėnesinės naudos įrašai su metų, mėnesio, tipo, vandens ir piniginės naudos laukais
- Naudos kortelės automatiškai sumuoja įrašų vandens rodiklį ir finansinę naudą
- Mėnesinės naudos įrašų redagavimas, dublikatų prevencija ir patvirtinamas trynimas
- Mėnesinis finansinės naudos grafikas
- Naudos kortelių ir grafiko automatinis atnaujinimas pridėjus, redagavus ar ištrynus įrašą
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
| `npm test` | Mėnesinės naudos taisyklių testai |

## Projekto struktūra

```
src/
├── main.jsx                    # Įėjimo taškas
├── App.jsx                     # Pagrindinis komponentas ir bendros būsenos
├── ProjektoNauda.jsx           # Aprašymas, mėnesinės naudos forma, lentelė ir rezultatų kortelės
├── ProjektoNauda.css           # Projekto naudos stiliai
├── InvesticijaIsViso.jsx       # Forma, lentelė, bendra suma ir mėnesinė diagrama
├── ProjektoVykdymoBusena.jsx   # Projekto būsenos pasirinkimas
├── investicijos.js             # Konstantos, formatavimas, localStorage
├── tests/projektoNauda.test.js # Mėnesinės naudos validavimo ir grupavimo testai
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
  menesiniaiIrasai: [
    {
      id: string,
      metai: number,
      menuo: string,
      naudosTipas: string, // 'Sutaupymas' arba 'Pajamos'
      sutaupytaVandens: number, // m
      nauda: number // Eur
    }
  ]
}
```

Kiekvieniems metams, mėnesiui ir naudos tipui leidžiamas vienas įrašas. Vandens ir eurų reikšmėms leidžiamas 0; neigiamos ar netinkamos reikšmės atmetamos.

Puslapio vaizdai pasirenkami URL fragmentais `#investicijos` ir `#projekto-nauda`.

## Žinomi apribojimai

- Projekto būsena po puslapio perkrovimo neišsaugoma
- Įrašai rodomi įvedimo tvarka, ne chronologiškai
- Mėnesio ir metų poros diagramoje rodomos chronologiškai; keli to paties mėnesio ir metų įrašai sudedami

## Planai

- Išvalyti Vite šablono turinį
- Nuspręsti, ar įrašų lentelę rikiuoti chronologiškai
- Pridėti atsipirkimo skaičiavimą (logika dar neapibrėžta)
