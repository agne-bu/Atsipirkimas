import { useMemo, useState } from 'react'
import {
  MENESIAI,
  MENESINIAI_NAUDOS_TIPAI,
  formatuotiSkaiciu,
  parseSuma,
} from './investicijos'
import './ProjektoNauda.css'

const vandensFormatas = new Intl.NumberFormat('lt-LT', {
  maximumFractionDigits: 2,
})
const tusciasMenesiniuIrasuMasyvas = []

function tusciaForma() {
  return {
    metai: '',
    menuo: '',
    naudosTipas: '',
    sutaupytaVandens: '',
    nauda: '',
  }
}

function validuotiForma(forma) {
  const klaidos = []
  const metai = Number(forma.metai)
  const sutaupytaVandens = parseSuma(forma.sutaupytaVandens)
  const nauda = parseSuma(forma.nauda)

  if (forma.metai.trim() === '' || !Number.isInteger(metai) || metai <= 0) {
    klaidos.push('Įveskite tinkamus metus.')
  }
  if (!forma.menuo) klaidos.push('Pasirinkite mėnesį.')
  if (!MENESINIAI_NAUDOS_TIPAI.includes(forma.naudosTipas)) {
    klaidos.push('Pasirinkite naudos tipą.')
  }
  if (!sutaupytaVandens.ok || sutaupytaVandens.verte < 0) {
    klaidos.push('Vandens reikšmė turi būti skaičius, ne mažesnis už 0.')
  }
  if (!nauda.ok || nauda.verte < 0) {
    klaidos.push('Nauda turi būti skaičius, ne mažesnis už 0.')
  }

  return {
    klaidos,
    irasas: {
      metai,
      sutaupytaVandens: sutaupytaVandens.ok ? sutaupytaVandens.verte : 0,
      nauda: nauda.ok ? nauda.verte : 0,
    },
  }
}

function ProjektoNauda({ nauda, setNauda }) {
  const [forma, setForma] = useState(tusciaForma)
  const [klaidos, setKlaidos] = useState([])
  const menesiniaiIrasai =
    nauda.menesiniaiIrasai || tusciasMenesiniuIrasuMasyvas

  const rezultatai = useMemo(
    () =>
      menesiniaiIrasai.reduce(
        (viso, irasas) => ({
          sutaupytaVandens: viso.sutaupytaVandens + irasas.sutaupytaVandens,
          investicijosNauda: viso.investicijosNauda + irasas.nauda,
        }),
        { sutaupytaVandens: 0, investicijosNauda: 0 },
      ),
    [menesiniaiIrasai],
  )

  function keistiAprasyma(event) {
    setNauda((dabartine) => ({
      ...dabartine,
      aprasymas: event.target.value,
    }))
  }

  function keistiLauka(laukas, verte) {
    setForma((dabartine) => ({ ...dabartine, [laukas]: verte }))
  }

  function pridetiIrasa(event) {
    event.preventDefault()
    const { klaidos: naujosKlaidos, irasas } = validuotiForma(forma)

    if (naujosKlaidos.length === 0) {
      const jauYraIrasa = menesiniaiIrasai.some(
        (esamas) =>
          esamas.metai === irasas.metai &&
          esamas.menuo === forma.menuo &&
          esamas.naudosTipas === forma.naudosTipas,
      )

      if (jauYraIrasa) {
        naujosKlaidos.push('Šio mėnesio tokio tipo nauda jau įvesta.')
      }
    }

    if (naujosKlaidos.length > 0) {
      setKlaidos(naujosKlaidos)
      return
    }

    setNauda((dabartine) => ({
      ...dabartine,
      menesiniaiIrasai: [
        ...(dabartine.menesiniaiIrasai || []),
        {
          id: crypto.randomUUID(),
          ...irasas,
          menuo: forma.menuo,
          naudosTipas: forma.naudosTipas,
        },
      ],
    }))
    setForma(tusciaForma())
    setKlaidos([])
  }

  function istrintiIrasa(id) {
    setNauda((dabartine) => ({
      ...dabartine,
      menesiniaiIrasai: (dabartine.menesiniaiIrasai || []).filter(
        (irasas) => irasas.id !== id,
      ),
    }))
  }

  return (
    <section id="projekto-nauda" className="projekto-nauda" aria-labelledby="projekto-nauda-antraste">
      <header className="projekto-nauda-antraste">
        <h1 id="projekto-nauda-antraste">Projekto nauda</h1>
      </header>

      <div className="projekto-nauda-korteles" aria-label="Pagrindiniai projekto rezultatai">
        <article className="projekto-nauda-kortele">
          <h2>Sutaupyta vandens</h2>
          <p className="projekto-nauda-reiksme">
            {vandensFormatas.format(rezultatai.sutaupytaVandens)} <span>m</span>
          </p>
        </article>
        <article className="projekto-nauda-kortele projekto-nauda-kortele--eurai">
          <h2>Investicijos nauda</h2>
          <p className="projekto-nauda-reiksme">
            {formatuotiSkaiciu(rezultatai.investicijosNauda)} <span>Eur</span>
          </p>
        </article>
      </div>

      <div className="projekto-nauda-aprasymas">
        <label htmlFor="projekto-nauda-aprasymo-laukas">
          Projekto naudos aprašymas
        </label>
        <textarea
          id="projekto-nauda-aprasymo-laukas"
          value={nauda.aprasymas}
          onChange={keistiAprasyma}
          placeholder="Pvz., įdiegus išmanią vandens tiekimo ir valymo sistemą, kiekvieną mėnesį sumažėja sunaudojamo vandens kiekis."
          rows="3"
        />
      </div>

      <section className="projekto-nauda-menesiui" aria-labelledby="projekto-nauda-formos-antraste">
        <h2 id="projekto-nauda-formos-antraste">Mėnesinė nauda</h2>
        <form className="projekto-nauda-forma" onSubmit={pridetiIrasa} noValidate>
          <div className="projekto-nauda-laukas projekto-nauda-laukas--metai">
            <label htmlFor="projekto-nauda-metai">Metai</label>
            <input
              id="projekto-nauda-metai"
              type="number"
              inputMode="numeric"
              min="1"
              step="1"
              placeholder="2026"
              value={forma.metai}
              onChange={(event) => keistiLauka('metai', event.target.value)}
            />
          </div>
          <div className="projekto-nauda-laukas projekto-nauda-laukas--menuo">
            <label htmlFor="projekto-nauda-menuo">Mėnuo</label>
            <select
              id="projekto-nauda-menuo"
              value={forma.menuo}
              onChange={(event) => keistiLauka('menuo', event.target.value)}
            >
              <option value="">Pasirinkite</option>
              {MENESIAI.map((menuo) => (
                <option key={menuo} value={menuo}>{menuo}</option>
              ))}
            </select>
          </div>
          <div className="projekto-nauda-laukas projekto-nauda-laukas--tipas">
            <label htmlFor="projekto-nauda-tipas">Naudos tipas</label>
            <select
              id="projekto-nauda-tipas"
              value={forma.naudosTipas}
              onChange={(event) => keistiLauka('naudosTipas', event.target.value)}
            >
              <option value="">Pasirinkite</option>
              {MENESINIAI_NAUDOS_TIPAI.map((tipas) => (
                <option key={tipas} value={tipas}>{tipas}</option>
              ))}
            </select>
          </div>
          <div className="projekto-nauda-laukas projekto-nauda-laukas--vanduo">
            <label htmlFor="projekto-nauda-vanduo">Sutaupyta vandens (m)</label>
            <input
              id="projekto-nauda-vanduo"
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={forma.sutaupytaVandens}
              onChange={(event) => keistiLauka('sutaupytaVandens', event.target.value)}
            />
          </div>
          <div className="projekto-nauda-laukas projekto-nauda-laukas--nauda">
            <label htmlFor="projekto-nauda-eurai">Nauda, Eur</label>
            <input
              id="projekto-nauda-eurai"
              type="text"
              inputMode="decimal"
              placeholder="0,00"
              value={forma.nauda}
              onChange={(event) => keistiLauka('nauda', event.target.value)}
            />
          </div>
          <button className="projekto-nauda-prideti" type="submit" aria-label="Pridėti mėnesio naudą">
            +
          </button>
        </form>

        {klaidos.length > 0 ? (
          <ul className="projekto-nauda-klaidos" role="alert">
            {klaidos.map((klaida) => <li key={klaida}>{klaida}</li>)}
          </ul>
        ) : null}

        {menesiniaiIrasai.length > 0 ? (
          <div className="projekto-nauda-lentele-wrap">
            <table className="projekto-nauda-lentele">
              <thead>
                <tr>
                  <th>Metai</th>
                  <th>Mėnuo</th>
                  <th>Naudos tipas</th>
                  <th>Sutaupyta vandens (m)</th>
                  <th>Nauda, Eur</th>
                  <th>Veiksmas</th>
                </tr>
              </thead>
              <tbody>
                {menesiniaiIrasai.map((irasas) => (
                  <tr key={irasas.id}>
                    <td>{irasas.metai}</td>
                    <td>{irasas.menuo}</td>
                    <td>{irasas.naudosTipas}</td>
                    <td>{vandensFormatas.format(irasas.sutaupytaVandens)}</td>
                    <td>{formatuotiSkaiciu(irasas.nauda)}</td>
                    <td>
                      <button
                        className="projekto-nauda-istrinti"
                        type="button"
                        onClick={() => istrintiIrasa(irasas.id)}
                      >
                        Ištrinti
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>
    </section>
  )
}

export default ProjektoNauda
