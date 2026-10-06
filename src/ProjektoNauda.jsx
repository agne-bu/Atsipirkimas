import { formatuotiSkaiciu } from './investicijos'
import './ProjektoNauda.css'

const vandensFormatas = new Intl.NumberFormat('lt-LT', {
  maximumFractionDigits: 2,
})

function ProjektoNauda({ nauda, setNauda }) {
  function keistiAprasyma(event) {
    setNauda((dabartine) => ({
      ...dabartine,
      aprasymas: event.target.value,
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
            {vandensFormatas.format(nauda.sutaupytaVandens)} <span>m³</span>
          </p>
        </article>
        <article className="projekto-nauda-kortele projekto-nauda-kortele--eurai">
          <h2>Investicijos nauda</h2>
          <p className="projekto-nauda-reiksme">
            {formatuotiSkaiciu(nauda.investicijosNauda)} <span>Eur</span>
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
    </section>
  )
}

export default ProjektoNauda
