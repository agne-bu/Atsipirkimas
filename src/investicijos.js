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
