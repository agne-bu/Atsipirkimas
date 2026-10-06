import { useEffect, useState } from 'react'
import InvesticijaIsViso from './InvesticijaIsViso'
import ProjektoNauda from './ProjektoNauda'
import ProjektoVykdymoBusena from './ProjektoVykdymoBusena'
import {
  ikeltiInvesticijas,
  ikeltiProjektoNauda,
  issaugotiInvesticijas,
  issaugotiProjektoNauda,
} from './investicijos'
import './App.css'

function App() {
  const [irasai, setIrasai] = useState(() => ikeltiInvesticijas())
  const [projektoNauda, setProjektoNauda] = useState(() => ikeltiProjektoNauda())
  const [aktyvusPuslapis, setAktyvusPuslapis] = useState(() =>
    window.location.hash === '#projekto-nauda' ? 'projekto-nauda' : 'investicijos',
  )
  const [projektoBusena, setProjektoBusena] = useState(() => {
    const issaugotaBusena = localStorage.getItem(
      'atsipirkimas-projekto-busena',
    )
  
   return irasai.length === 0 ? 'Nepradėta' : issaugotaBusena || 'Vykdoma'
  })

  useEffect(() => {
    issaugotiInvesticijas(irasai)
  }, [irasai])

  useEffect(() => {
    issaugotiProjektoNauda(projektoNauda)
  }, [projektoNauda])

  useEffect(() => {
    function atnaujintiPuslapi() {
      setAktyvusPuslapis(
        window.location.hash === '#projekto-nauda'
          ? 'projekto-nauda'
          : 'investicijos',
      )
    }

    window.addEventListener('hashchange', atnaujintiPuslapi)
    return () => window.removeEventListener('hashchange', atnaujintiPuslapi)
  }, [])
  
  useEffect(() => {
    if (irasai.length > 0 && projektoBusena === 'Nepradėta') {
      setProjektoBusena('Vykdoma')
    }
  }, [irasai.length, projektoBusena])

  return (
    <>
      <nav className="puslapio-navigacija" aria-label="Pagrindinė navigacija">
        <a
          href="#investicijos"
          aria-current={aktyvusPuslapis === 'investicijos' ? 'page' : undefined}
        >
          Investicijos
        </a>
        <a
          href="#projekto-nauda"
          aria-current={aktyvusPuslapis === 'projekto-nauda' ? 'page' : undefined}
        >
          Projekto nauda
        </a>
      </nav>

      {aktyvusPuslapis === 'projekto-nauda' ? (
        <ProjektoNauda nauda={projektoNauda} setNauda={setProjektoNauda} />
      ) : (
        <main id="investicijos">
          <ProjektoVykdymoBusena
            investicijuKiekis={irasai.length}
            busena={projektoBusena}
            setBusena={setProjektoBusena}
          />
          <InvesticijaIsViso
            irasai={irasai}
            setIrasai={setIrasai}
            projektoBusena={projektoBusena}
          />
        </main>
      )}
    </>
  )
}

export default App
