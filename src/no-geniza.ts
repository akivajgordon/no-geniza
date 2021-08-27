const ALEPH = 'א'
const LAMED = 'ל'
const YUD = 'י'
const HEY = 'ה'
const VAV = 'ו'
const SOF_PASUK = '\u05c3'
const UNICODE_NIKKUD_AND_CANTILLATION_START = '\u0590'
const UNICODE_NIKKUD_AND_CANTILLATION_END = '\u05cf'

const regexRange = ({
  start,
  end,
  excluding,
}: {
  start: string
  end: string
  excluding: [string]
}): string => {
  const excluded = excluding[0]

  return `[${start}-${String.fromCodePoint(
    excluded.codePointAt(0)! - 1
  )}${String.fromCodePoint(excluded.codePointAt(0)! + 1)}-${end}]`
}

const REGEXP_NIKKUD_AND_CANTILLATION_RANGE_EXCLUDING_SOF_PASUK = regexRange({
  start: UNICODE_NIKKUD_AND_CANTILLATION_START,
  end: UNICODE_NIKKUD_AND_CANTILLATION_END,
  excluding: [SOF_PASUK],
})

const like = (word: string): RegExp => {
  return new RegExp(
    `${word
      .split('')
      .map(
        (l) =>
          `${l}${REGEXP_NIKKUD_AND_CANTILLATION_RANGE_EXCLUDING_SOF_PASUK}*`
      )
      .join('')}`,
    'g'
  )
}

export default (s: string): string => {
  return s
    .replace(like([YUD, HEY, VAV, HEY].join('')), 'ה׳')
    .replace(like([ALEPH, LAMED, HEY, YUD].join('')), (match) =>
      match.split(LAMED).join(`-${LAMED}`)
    )
}
