import './ProjektoVykdymoBusena.css'

function ProjektoVykdymoBusena({
  investicijuKiekis,
  busena,
  setBusena,
}) {
  const galimaRinktisBaigta = investicijuKiekis > 0

  function pakeistiBusena(event) {
    const naujaBusena = event.target.value

    if (naujaBusena === 'Baigta' && !galimaRinktisBaigta) {
      return
    }

    setBusena(naujaBusena)
  }

  return (
    <section className="projekto-busena">
      <div className="projekto-busena-antraste">
        <h2>Projekto vykdymo būsena</h2>

        <select
          value={busena}
          onChange={pakeistiBusena}
        >
          <option value="Nepradėta">Nepradėta</option>
          <option value="Vykdoma">Vykdoma</option>
          <option value="Baigta" disabled={!galimaRinktisBaigta}>
            Baigta
          </option>
        </select>
      </div>
    </section>
  )
}

export default ProjektoVykdymoBusena