# Projekto kontekstas

## Paskirtis

„Atsipirkimas“ yra lietuviška investicijų žurnalo žiniatinklio programa. Ji leidžia registruoti investicijas pagal metus, mėnesį ir sumą eurais, rodo bendrą sumą ir projekto vykdymo būseną.

## Technologijos ir sandara

- React 19, Vite 8, JavaScript ir paprastas CSS.
- `src/App.jsx` yra pagrindinis komponentas: laiko investicijų bei projekto būsenos React būseną ir pateikia puslapio struktūrą.
- `src/InvesticijaIsViso.jsx` rodo investicijų formą, įrašų lentelę, bendrą sumą ir mėnesinę diagramą.
- `src/ProjektoVykdymoBusena.jsx` leidžia pasirinkti projekto būseną.
- `src/investicijos.js` saugo mėnesių sąrašą, sumų formatavimo bei analizavimo funkcijas, investicijų tikrinimą ir `localStorage` operacijas.
- Komponentų stiliai laikomi atskiruose CSS failuose.
- Viršutinio paveikslėlio pagrindas yra `src/assets/hero-coins.jpg`. `App.jsx` taip pat rodo React ir Vite logotipus ant jo.

## Duomenys ir elgsena

- Investicijos objektas: `{ id, metai, menuo, suma }`; `id` sukuriamas su `crypto.randomUUID()`.
- Investicijų masyvas saugomas naršyklės `localStorage` raktu `atsipirkimas-investicijos`.
- Galimos būsenos: `Nepradėta`, `Vykdoma`, `Baigta`.
- Be investicijų pradinė būsena yra `Nepradėta`. Pridėjus pirmą įrašą būsena automatiškai tampa `Vykdoma`.
- Būseną `Baigta` galima pasirinkti tik esant bent vienam investicijų įrašui.
- Kai būsena `Baigta`, investicijų įvedimo laukai ir trynimo mygtukai išjungiami. Pridėjimo bei trynimo funkcijos taip pat patikrina būseną prieš keisdamos įrašus.
- Projekto būsena perskaitoma iš `localStorage` rakto `atsipirkimas-projekto-busena`, tačiau šiuo metu programoje nėra kodo, kuris ją įrašytų. Todėl būsenos pasirinkimas po puslapio perkrovimo neišlieka.
- Investicijos pateikiamos įvedimo tvarka; chronologinio rikiavimo nėra.
- Įrašų lentelė ir mėnesinė diagrama platesniuose ekranuose išdėstytos greta, o siauresniuose persirikiuoja viena po kitos. Lentelė užima siauresnę dalį turinio.
- Diagrama kuriama SVG kodu be papildomos grafiko bibliotekos. To paties mėnesio ir metų investicijų įrašai sudedami, o mėnesio ir metų poros rikiuojamos chronologiškai. Užvedus žymeklį ant stulpelio matoma tiksli suma.
- Puslapyje dar likęs dalis pradinio Vite šablono turinio.

## Darbo su kodu gairės

- Prieš pakeitimus perskaityti `Agent_rules.md` ir aktualius kodo failus; kodas yra tiesos šaltinis, jei skiriasi nuo šio aprašo.
- Išlaikyti JavaScript/JSX, nenaudoti TypeScript, papildomų UI ar būsenos valdymo bibliotekų, nebent to aiškiai prašoma.
- Išlaikyti investicijos duomenų formą ir esamą `localStorage` raktą; jų keitimas galėtų paveikti išsaugotus naudotojo duomenis.
- Naują naudotojui matomą tekstą rašyti lietuviškai. Kintamųjų ir funkcijų pavadinimuose laikytis projekto lietuviškos, diakritinių ženklų nenaudojančios konvencijos.
- Nekeisti su užduotimi nesusijusių funkcijų ar dizaino.

## Galimos tolimesnės užduotys

- Pašalinti likusį Vite demonstracinį turinį.
- Nuspręsti, ar investicijų įrašų lentelė taip pat turi būti rikiuojama chronologiškai.
- Apibrėžti ir įgyvendinti atsipirkimo skaičiavimą.
- Nuspręsti, ar projekto būsena turi būti įrašoma į `localStorage`, ir atitinkamai įgyvendinti.
