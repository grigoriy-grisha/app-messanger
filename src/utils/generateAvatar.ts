export const generateColorAvatar = (id: string) => {
  const r = charCode(id[1])
  const g = charCode(id[3])
  const b = charCode(id[5])
  return [r,g,b]
}

const charCode = (str: string) => {
  return Math.floor(str.charCodeAt(0) * 1.7)
}

