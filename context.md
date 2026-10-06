# Projekto kontekstas

## Paskirtis

„Atsipirkimas“ yra lietuviška investicijų žurnalo žiniatinklio programa. Ji leidžia registruoti investicijas pagal metus, mėnesį ir sumą eurais, rodo bendrą sumą ir projekto vykdymo būseną.

## Technologijos ir sandara

- React 19, Vite 8, JavaScript ir paprastas CSS.
- `src/App.jsx` yra pagrindinis komponentas: laiko investicijų, projekto naudos bei projekto būsenos React būseną ir per URL fragmentus `#investicijos` / `#projekto-nauda` parenka atskirą puslapio vaizdą.
- `src/ProjektoNauda.jsx` rodo projekto naudos aprašymą, mėnesinės naudos formą, įrašų lentelę ir apskaičiuojamas vandens bei piniginės naudos korteles; stiliai yra `src/ProjektoNauda.css` faile.
- `src/InvesticijaIsViso.jsx` rodo investicijų formą, įrašų lentelę, bendrą sumą ir mėnesinę diagramą.
- `src/ProjektoVykdymoBusena.jsx` leidžia pasirinkti projekto būseną.
- `src/investicijos.js` saugo mėnesių sąrašą, sumų formatavimo bei analizavimo funkcijas, investicijų tikrinimą ir `localStorage` operacijas.
- Komponentų stiliai laikomi atskiruose CSS failuose.
- Pagrindinis vaizdas parenkamas navigacijos URL fragmentais; projekto naudos forma ir investicijų forma yra atskiruose vaizduose.

## Duomenys ir elgsena

- Investicijos objektas: `{ id, metai, menuo, suma }`; `id` sukuriamas su `crypto.randomUUID()`.
- Investicijų masyvas saugomas naršyklės `localStorage` raktu `atsipirkimas-investicijos`.
- Projekto naudos objektas `{ aprasymas, menesiniaiIrasai }` saugomas `localStorage` raktu `atsipirkimas-projekto-nauda`; investicijų įrašų struktūra ir raktas nepakeisti.
- Mėnesinės naudos įrašas yra `{ id, metai, menuo, naudosTipas, sutaupytaVandens, nauda }`. Vienam metų, mėnesio ir naudos tipo deriniui leidžiamas vienas įrašas. Vandens ir eurų reikšmės gali būti 0, bet ne neigiamos.
- Vandens kortelė sumuoja `sutaupytaVandens`, o finansinė kortelė sumuoja `nauda` iš visų mėnesinių įrašų. Ištrynus įrašą, kortelės perskaičiuojamos.
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
- Apibrėžti ir įgyvendinti platesnį projekto atsipirkimo skaičiavimą.
- Nuspręsti, ar projekto būsena turi būti įrašoma į `localStorage`, ir atitinkamai įgyvendinti.
