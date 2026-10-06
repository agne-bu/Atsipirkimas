export const MENESIAI = [
  'Sausis',
  'Vasaris',
  'Kovas',
  'Balandis',
  'Gegužė',
  'Birželis',
  'Liepa',
  'Rugpjūtis',
  'Rugsėjis',
  'Spalis',
  'Lapkritis',
  'Gruodis',
]

export const STORAGE_KEY = 'atsipirkimas-investicijos'
export const PROJEKTO_NAUDOS_STORAGE_KEY = 'atsipirkimas-projekto-nauda'
export const MENESINIAI_NAUDOS_TIPAI = ['Sutaupymas', 'Pajamos']

export function ikeltiProjektoNauda() {
  const tusciaNauda = {
    aprasymas: '',
    menesiniaiIrasai: [],
  }

  try {
    const raw = localStorage.getItem(PROJEKTO_NAUDOS_STORAGE_KEY)
    if (!raw) return tusciaNauda

    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return tusciaNauda
    }

    const menesiniaiIrasai = Array.isArray(parsed.menesiniaiIrasai)
      ? parsed.menesiniaiIrasai.filter(
          (irasas) =>
            irasas &&
            typeof irasas.id === 'string' &&
            Number.isInteger(irasas.metai) &&
            irasas.metai > 0 &&
            MENESIAI.includes(irasas.menuo) &&
            MENESINIAI_NAUDOS_TIPAI.includes(irasas.naudosTipas) &&
            typeof irasas.sutaupytaVandens === 'number' &&
            Number.isFinite(irasas.sutaupytaVandens) &&
            irasas.sutaupytaVandens >= 0 &&
            typeof irasas.nauda === 'number' &&
            Number.isFinite(irasas.nauda) &&
            irasas.nauda >= 0,
        )
      : []

    return {
      aprasymas: typeof parsed.aprasymas === 'string' ? parsed.aprasymas : '',
      menesiniaiIrasai,
    }
  } catch {
    return tusciaNauda
  }
}

export function issaugotiProjektoNauda(nauda) {
  localStorage.setItem(PROJEKTO_NAUDOS_STORAGE_KEY, JSON.stringify(nauda))
}

const sumaFormatas = new Intl.NumberFormat('lt-LT', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatuotiSkaiciu(suma) {
  return sumaFormatas.format(suma)
}

export function formatuotiSuma(suma) {
  return `${formatuotiSkaiciu(suma)} Eur`
}

export function parseSuma(reiksme) {
  const tekstas = String(reiksme).trim()
  if (tekstas === '') {
    return { ok: false, priezastis: 'tuscia' }
  }

  const normalizuota = tekstas.replace(/\s/g, '').replace(',', '.')
  const skaicius = Number(normalizuota)

  if (!Number.isFinite(skaicius)) {
    return { ok: false, priezastis: 'neskaicius' }
  }

  return { ok: true, verte: skaicius }
}

export function skaiciuotiBendraSuma(irasai) {
  return irasai.reduce((suma, irasas) => suma + irasas.suma, 0)
}

export function ikeltiInvesticijas() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed
      .filter(
        (irasas) =>
          irasas &&
          typeof irasas.id === 'string' &&
          typeof irasas.metai === 'number' &&
          Number.isFinite(irasas.metai) &&
          typeof irasas.menuo === 'string' &&
          MENESIAI.includes(irasas.menuo) &&
          typeof irasas.suma === 'number' &&
          Number.isFinite(irasas.suma),
      )
      .map((irasas) => ({
        id: irasas.id,
        metai: irasas.metai,
        menuo: irasas.menuo,
        suma: irasas.suma,
      }))
  } catch {
    return []
  }
}

export function issaugotiInvesticijas(irasai) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(irasai))
}
