import { useMemo, useState } from 'react'
import {
  MENESIAI,
  MENESINIAI_NAUDOS_TIPAI,
  arYraMenesinesNaudosDublikatas,
  formatuotiSkaiciu,
  skaiciuotiMenesineNauda,
  validuotiMenesinesNaudosForma,
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

function ProjektoNauda({ nauda, setNauda }) {
  const [forma, setForma] = useState(tusciaForma)
  const [klaidos, setKlaidos] = useState([])
  const [redaguojamoIrasaId, setRedaguojamoIrasaId] = useState(null)
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
  const menesioDuomenys = useMemo(
    () => skaiciuotiMenesineNauda(menesiniaiIrasai),
    [menesiniaiIrasai],
  )
  const didziausiaMenesioNauda = Math.max(
    0,
    ...menesioDuomenys.map((irasas) => irasas.nauda),
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
    const { klaidos: naujosKlaidos, irasas } =
      validuotiMenesinesNaudosForma(forma)

    const keiciamasIrasa = {
      ...irasas,
      menuo: forma.menuo,
      naudosTipas: forma.naudosTipas,
    }

    if (
      naujosKlaidos.length === 0 &&
      arYraMenesinesNaudosDublikatas(
        menesiniaiIrasai,
        keiciamasIrasa,
        redaguojamoIrasaId,
      )
    ) {
      naujosKlaidos.push(
        'Šio mėnesio ir naudos tipo įrašas jau yra. Jei reikia, pakoreguokite esamą įrašą.',
      )
    }

    if (naujosKlaidos.length > 0) {
      setKlaidos(naujosKlaidos)
      return
    }

    setNauda((dabartine) => {
      const esamiIrasai = dabartine.menesiniaiIrasai || []
      const naujasIrasa = {
        id: redaguojamoIrasaId || crypto.randomUUID(),
          ...keiciamasIrasa,
      }

      return {
        ...dabartine,
        menesiniaiIrasai: redaguojamoIrasaId
          ? esamiIrasai.map((esamas) =>
              esamas.id === redaguojamoIrasaId ? naujasIrasa : esamas,
            )
          : [...esamiIrasai, naujasIrasa],
      }
    })
    setForma(tusciaForma())
    setKlaidos([])
    setRedaguojamoIrasaId(null)
  }

  function pradetiRedaguoti(irasas) {
    setForma({
      metai: String(irasas.metai),
      menuo: irasas.menuo,
      naudosTipas: irasas.naudosTipas,
      sutaupytaVandens: String(irasas.sutaupytaVandens).replace('.', ','),
      nauda: String(irasas.nauda).replace('.', ','),
    })
    setRedaguojamoIrasaId(irasas.id)
    setKlaidos([])
  }

  function istrintiIrasa(id) {
    const arTrinti = window.confirm('Ar tikrai norite ištrinti šį įrašą?')
    if (!arTrinti) return

    setNauda((dabartine) => ({
      ...dabartine,
      menesiniaiIrasai: (dabartine.menesiniaiIrasai || []).filter(
        (irasas) => irasas.id !== id,
      ),
    }))

    if (redaguojamoIrasaId === id) atsauktiRedagavima()
  }

  function atsauktiRedagavima() {
    setForma(tusciaForma())
    setKlaidos([])
    setRedaguojamoIrasaId(null)
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
            {formatuotiSkaiciu(rezultatai.investicijosNauda)} <span>€</span>
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

      <section className="projekto-nauda-grafikas" aria-labelledby="projekto-nauda-grafikas-antraste">
        <h2 id="projekto-nauda-grafikas-antraste">Nauda pagal mėnesius</h2>
        {menesioDuomenys.length === 0 ? (
          <p className="projekto-nauda-grafikas-tuscia">Grafikas atsiras pridėjus mėnesinės naudos įrašų.</p>
        ) : (
          <div className="projekto-nauda-grafikas-slinktis">
            <svg
              className="projekto-nauda-grafikas-svg"
              viewBox={`0 0 ${Math.max(640, menesioDuomenys.length * 58 + 32)} 280`}
              style={{ width: `${Math.max(640, menesioDuomenys.length * 58 + 32)}px` }}
              role="img"
              aria-label="Mėnesinė finansinė nauda pagal metus"
            >
              {[0, 1, 2, 3].map((eilute) => {
                const y = 222 - eilute * 64
                return (
                  <line
                    key={eilute}
                    x1="32"
                    x2={Math.max(624, menesioDuomenys.length * 58 + 16)}
                    y1={y}
                    y2={y}
                    className="projekto-nauda-grafikas-tinklelis"
                  />
                )
              })}
              {menesioDuomenys.map((irasas, indeksas) => {
                const aukstis = didziausiaMenesioNauda
                  ? (irasas.nauda / didziausiaMenesioNauda) * 192
                  : 0
                const x = 42 + indeksas * 58
                return (
                  <g key={`${irasas.metai}-${irasas.menuo}`}>
                    <title>{`${irasas.menuo} ${irasas.metai}: ${formatuotiSkaiciu(irasas.nauda)} €; sutaupyta vandens ${vandensFormatas.format(irasas.sutaupytaVandens)} m`}</title>
                    <rect
                      x={x}
                      y={222 - aukstis}
                      width="34"
                      height={aukstis}
                      rx="4"
                      className="projekto-nauda-grafikas-stulpelis"
                    />
                    <text x={x + 17} y="244" textAnchor="middle" className="projekto-nauda-grafikas-menuo">
                      {irasas.menuo.slice(0, 3)}
                    </text>
                    <text x={x + 17} y="261" textAnchor="middle" className="projekto-nauda-grafikas-metai">
                      {irasas.metai}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
        )}
      </section>

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
            <label htmlFor="projekto-nauda-eurai">Nauda (€)</label>
            <input
              id="projekto-nauda-eurai"
              type="text"
              inputMode="decimal"
              placeholder="0,00"
              value={forma.nauda}
              onChange={(event) => keistiLauka('nauda', event.target.value)}
            />
          </div>
          <button
            className={`projekto-nauda-prideti${redaguojamoIrasaId ? ' projekto-nauda-prideti--redaguoti' : ''}`}
            type="submit"
            aria-label={redaguojamoIrasaId ? 'Išsaugoti pakeitimus' : 'Pridėti mėnesio naudą'}
          >
            {redaguojamoIrasaId ? 'Išsaugoti pakeitimus' : '+'}
          </button>
          {redaguojamoIrasaId ? (
            <button
              className="projekto-nauda-atsaukti"
              type="button"
              onClick={atsauktiRedagavima}
            >
              Atšaukti
            </button>
          ) : null}
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
                  <th>Nauda (€)</th>
                  <th>Veiksmai</th>
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
                        className="projekto-nauda-redaguoti"
                        type="button"
                        onClick={() => pradetiRedaguoti(irasas)}
                      >
                        Redaguoti
                      </button>
                      {' '}
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
        ) : (
          <p className="projekto-nauda-grafikas-tuscia">Kol kas nėra įvestų mėnesinės naudos įrašų.</p>
        )}
      </section>
    </section>
  )
}

export default ProjektoNauda
