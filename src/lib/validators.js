export const cpfValidator = (value) => {
  if (!value) return false
  value = value.replace(/[^\d]/g, '')

  if (value.length !== 11 || /^(\d)\1+$/.test(value)) return false

  let soma = 0, resto

  // Validação do primeiro dígito
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(value.substring(i - 1, i)) * (11 - i)
  }
  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(value.substring(9, 10))) return false

  // Validação do segundo dígito
  soma = 0
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(value.substring(i - 1, i)) * (12 - i)
  }
  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  return resto === parseInt(value.substring(10, 11))
}


export const cepValidator = (value) => {
  if (!value) return false
  // Remove todos os caracteres que não sejam números
  value = value.replace(/[^\d]/g, '')
  // Verifica se o CEP possui 8 dígitos numéricos
  return /^[0-9]{8}$/.test(value)
}

export const celularValidator = (value) => {
  if (!value) return false
  // Remove todos os caracteres que não sejam números
  value = value.replace(/[^\d]/g, '')
  // Verifica se o celular possui 11 dígitos, ou seja, 2 dígitos do DDD + 9 dígitos do número
  return /^[1-9]{2}[9]{1}[0-9]{8}$/.test(value)
}

