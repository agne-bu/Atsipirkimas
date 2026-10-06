import assert from 'node:assert/strict'
import test from 'node:test'
import {
  arYraMenesinesNaudosDublikatas,
  skaiciuotiMenesineNauda,
  validuotiMenesinesNaudosForma,
} from '../src/investicijos.js'

function sukurtiForma(pakeitimai = {}) {
  return {
    metai: '2026',
    menuo: 'Sausis',
    naudosTipas: 'Sutaupymas',
    sutaupytaVandens: '0',
    nauda: '0',
    ...pakeitimai,
  }
}

test('leidžia įrašyti nulines vandens ir piniginės naudos reikšmes', () => {
  const rezultatas = validuotiMenesinesNaudosForma(sukurtiForma())

  assert.deepEqual(rezultatas.klaidos, [])
  assert.equal(rezultatas.irasas.sutaupytaVandens, 0)
  assert.equal(rezultatas.irasas.nauda, 0)
})

test('atmeta trūkstamus privalomus laukus', () => {
  const rezultatas = validuotiMenesinesNaudosForma(
    sukurtiForma({
      metai: '',
      menuo: '',
      naudosTipas: '',
      sutaupytaVandens: '',
      nauda: '',
    }),
  )

  assert.equal(rezultatas.klaidos.length, 5)
})

test('atmeta netinkamas ir neigiamas skaitines reikšmes', () => {
  const tekstas = validuotiMenesinesNaudosForma(
    sukurtiForma({ sutaupytaVandens: 'abc', nauda: '-1' }),
  )
  const neigiami = validuotiMenesinesNaudosForma(
    sukurtiForma({ sutaupytaVandens: '-2', nauda: '-1' }),
  )

  assert.equal(tekstas.klaidos.length, 2)
  assert.equal(neigiami.klaidos.length, 2)
})

test('unikalumas taikomas metams, mėnesiui ir naudos tipui', () => {
  const esami = [
    { id: '1', metai: 2026, menuo: 'Sausis', naudosTipas: 'Sutaupymas' },
  ]

  assert.equal(
    arYraMenesinesNaudosDublikatas(esami, {
      metai: 2026,
      menuo: 'Sausis',
      naudosTipas: 'Sutaupymas',
    }),
    true,
  )
  assert.equal(
    arYraMenesinesNaudosDublikatas(esami, {
      metai: 2026,
      menuo: 'Sausis',
      naudosTipas: 'Pajamos',
    }),
    false,
  )
})

test('redaguojant ignoruoja esamą įrašą, bet aptinka kitą dublikatą', () => {
  const esami = [
    { id: '1', metai: 2026, menuo: 'Sausis', naudosTipas: 'Sutaupymas' },
    { id: '2', metai: 2026, menuo: 'Vasaris', naudosTipas: 'Sutaupymas' },
  ]

  assert.equal(
    arYraMenesinesNaudosDublikatas(esami, esami[0], '1'),
    false,
  )
  assert.equal(
    arYraMenesinesNaudosDublikatas(
      esami,
      { metai: 2026, menuo: 'Vasaris', naudosTipas: 'Sutaupymas' },
      '1',
    ),
    true,
  )
})

test('mėnesio grafiko duomenys sujungia mėnesio tipus ir rikiuoja pagal laiką', () => {
  const duomenys = skaiciuotiMenesineNauda([
    {
      id: '1', metai: 2026, menuo: 'Vasaris', naudosTipas: 'Pajamos',
      sutaupytaVandens: 2, nauda: 15,
    },
    {
      id: '2', metai: 2026, menuo: 'Sausis', naudosTipas: 'Sutaupymas',
      sutaupytaVandens: 3, nauda: 10,
    },
    {
      id: '3', metai: 2026, menuo: 'Sausis', naudosTipas: 'Pajamos',
      sutaupytaVandens: 1, nauda: 5,
    },
  ])

  assert.deepEqual(
    duomenys.map(({ menuo, nauda, sutaupytaVandens }) => ({
      menuo,
      nauda,
      sutaupytaVandens,
    })),
    [
      { menuo: 'Sausis', nauda: 15, sutaupytaVandens: 4 },
      { menuo: 'Vasaris', nauda: 15, sutaupytaVandens: 2 },
    ],
  )
})
