import { useMemo, useState } from 'react'
import {
  MENESIAI,
  formatuotiSkaiciu,
  formatuotiSuma,
  parseSuma,
  skaiciuotiBendraSuma,
} from './investicijos'
import './InvesticijaIsViso.css'

function tusciaForma() {
  return { metai: '', menuo: '', suma: '' }
}

function validuotiForma(forma) {
  const klaidos = []

  if (String(forma.metai).trim() === '') {
    klaidos.push('Įveskite metus.')
  }

  if (!forma.menuo) {
    klaidos.push('Pasirinkite mėnesį.')
  }

  const suma = parseSuma(forma.suma)
  if (!suma.ok && suma.priezastis === 'tuscia') {
    klaidos.push('Įveskite sumą eurais.')
  } else if (!suma.ok) {
    klaidos.push('Suma turi būti skaičius.')
  } else if (suma.verte <= 0) {
    klaidos.push('Suma turi būti didesnė už 0.')
  }

  return { klaidos, suma }
}

function InvesticijaIsViso({ irasai, setIrasai, projektoBusena }) {
    const [forma, setForma] = useState(tusciaForma)
    const [klaidos, setKlaidos] = useState([])
const galimaKeistiInvesticijas = projektoBusena !== 'Baigta'

  const viso = useMemo(() => skaiciuotiBendraSuma(irasai), [irasai])
  const menesiniaiDuomenys = useMemo(() => {
    const sumos = new Map()

    irasai.forEach((irasas) => {
      const menesioIndeksas = MENESIAI.indexOf(irasas.menuo)
      const raktas = `${irasas.metai}-${menesioIndeksas}`
      const esamas = sumos.get(raktas)
      if (esamas) {
        esamas.suma += irasas.suma
      } else {
        sumos.set(raktas, {
          metai: irasas.metai,
          menuo: irasas.menuo,
          menesioIndeksas,
          suma: irasas.suma,
        })
      }
    })

    return [...sumos.values()].sort(
      (a, b) => a.metai - b.metai || a.menesioIndeksas - b.menesioIndeksas,
    )
  }, [irasai])
  const didziausiaMenesioSuma = Math.max(
    0,
    ...menesiniaiDuomenys.map((irasas) => irasas.suma),
  )

  function keistiLauka(laukas, verte) {
    setForma((dabartine) => ({ ...dabartine, [laukas]: verte }))
  }

  function pridetiIrasa(event) {
    event.preventDefault()
    if (!galimaKeistiInvesticijas) return

    const { klaidos: naujosKlaidos, suma } = validuotiForma(forma)

    if (naujosKlaidos.length > 0) {
      setKlaidos(naujosKlaidos)
      return
    }

    setIrasai((dabartiniai) => [
      ...dabartiniai,
      {
        id: crypto.randomUUID(),
        metai: Number(forma.metai),
        menuo: forma.menuo,
        suma: suma.verte,
      },
    ])
    setForma(tusciaForma())
    setKlaidos([])
  }

  function istrintiIrasa(id) {
    if (!galimaKeistiInvesticijas) return

    setIrasai((dabartiniai) => dabartiniai.filter((irasas) => irasas.id !== id))
  }

  return (
    <section id="investicija">
      <p className="investicija-suma">
        <span>Investicija iš viso:</span>
        <strong className="investicija-suma-verte">{formatuotiSuma(viso)}</strong>
      </p>

      <form className="investicija-forma" onSubmit={pridetiIrasa} noValidate>
        <div className="investicija-laukas investicija-laukas--metai">
          <label htmlFor="investicija-metai">Metai</label>
          <input
            id="investicija-metai"
            type="number"
            inputMode="numeric"
            placeholder="2026"
            value={forma.metai}
            disabled={!galimaKeistiInvesticijas}
            onChange={(event) => keistiLauka('metai', event.target.value)}
          />
        </div>

        <div className="investicija-laukas investicija-laukas--menuo">
          <label htmlFor="investicija-menuo">Mėnuo</label>
          <select
            id="investicija-menuo"
            value={forma.menuo}
            onChange={(event) => keistiLauka('menuo', event.target.value)}
            disabled={!galimaKeistiInvesticijas}
          >
            <option value="">Pasirinkite</option>
            {MENESIAI.map((menuo) => (
              <option key={menuo} value={menuo}>
                {menuo}
              </option>
            ))}
          </select>
        </div>

        <div className="investicija-laukas investicija-laukas--suma">
          <label htmlFor="investicija-suma">Suma, Eur</label>
          <input
            id="investicija-suma"
            type="text"
            inputMode="decimal"
            placeholder="5 000"
            value={forma.suma}
            disabled={!galimaKeistiInvesticijas}
            onChange={(event) => keistiLauka('suma', event.target.value)}
          />
        </div>

        <button className="investicija-prideti" 
        type="submit" 
        aria-label="Pridėti investiciją"
        disabled={!galimaKeistiInvesticijas}
        >
          +
        </button>
      </form>

      {klaidos.length > 0 ? (
        <ul className="investicija-klaidos" role="alert">
          {klaidos.map((klaida) => (
            <li key={klaida}>{klaida}</li>
          ))}
        </ul>
      ) : null}

      <div className="investicija-turinys">
        <div className="investicija-lentele-wrap">
          {irasai.length === 0 ? (
            <p className="investicija-tuscia">Kol kas nėra įvestų investicijų.</p>
          ) : (
            <table className="investicija-lentele">
              <thead>
                <tr>
                  <th>Metai</th>
                  <th>Mėnuo</th>
                  <th>Suma, Eur</th>
                  <th>Veiksmas</th>
                </tr>
              </thead>
              <tbody>
                {irasai.map((irasas) => (
                  <tr key={irasas.id}>
                    <td>{irasas.metai}</td>
                    <td>{irasas.menuo}</td>
                    <td>{formatuotiSkaiciu(irasas.suma)}</td>
                    <td>
                      <button
                        type="button"
                        className="investicija-istrinti"
                        onClick={() => istrintiIrasa(irasas.id)}
                        disabled={!galimaKeistiInvesticijas}
                      >
                        Ištrinti
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <section className="investicija-grafikas" aria-labelledby="investicija-grafikas-antraste">
          <h2 id="investicija-grafikas-antraste">Investicijos pagal mėnesius</h2>
          {menesiniaiDuomenys.length === 0 ? (
            <p className="investicija-tuscia">Grafikas atsiras pridėjus investicijų.</p>
          ) : (
            <div className="investicija-grafikas-slinktis">
              <svg
                className="investicija-grafikas-svg"
                viewBox={`0 0 ${Math.max(640, menesiniaiDuomenys.length * 58 + 32)} 280`}
                style={{ width: `${Math.max(640, menesiniaiDuomenys.length * 58 + 32)}px` }}
                role="img"
                aria-label="Investicijų sumos pagal mėnesį ir metus"
              >
                {[0, 1, 2, 3].map((eilute) => {
                  const y = 222 - eilute * 64
                  return <line key={eilute} x1="32" x2={Math.max(624, menesiniaiDuomenys.length * 58 + 16)} y1={y} y2={y} className="investicija-grafikas-tinklelis" />
                })}
                {menesiniaiDuomenys.map((duomuo, indeksas) => {
                  const aukstis = (duomuo.suma / didziausiaMenesioSuma) * 192
                  const x = 42 + indeksas * 58
                  const trumpasMenuo = duomuo.menuo.slice(0, 3)
                  return (
                    <g key={`${duomuo.metai}-${duomuo.menuo}`}>
                      <title>{`${duomuo.menuo} ${duomuo.metai}: ${formatuotiSuma(duomuo.suma)}`}</title>
                      <rect x={x} y={222 - aukstis} width="34" height={aukstis} rx="4" className="investicija-grafikas-stulpelis" />
                      <text x={x + 17} y="244" textAnchor="middle" className="investicija-grafikas-menuo">{trumpasMenuo}</text>
                      <text x={x + 17} y="261" textAnchor="middle" className="investicija-grafikas-metai">{duomuo.metai}</text>
                    </g>
                  )
                })}
              </svg>
            </div>
          )}
        </section>
      </div>
    </section>
  )
}

export default InvesticijaIsViso
