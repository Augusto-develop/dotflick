export function formatDate(dateString) {
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  if (dateString) {
    const [year, month, day] = dateString.split('-');
    return `${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`;
  }

  return "";
}

// Função que recebe a nota TMDB e transforma em valor decimal
export function convertTmdbToPrice(tmdbScore) {
  if (typeof tmdbScore !== 'number' || tmdbScore < 0 || tmdbScore > 10) {
    throw new Error('A nota TMDB deve ser um número entre 0 e 10.');
  }

  // Remove o ponto decimal, multiplica por 10 e adiciona 0,99
  const price = Math.floor(tmdbScore * 10) + 0.99;
  return price.toFixed(2);
}

export function formatToCurrency(value) {
  value = parseFloat(value);
  if (typeof value !== 'number') {
    throw new Error('O valor deve ser um número.');
  }
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


export const UFlist = [
  'AC', 'AL', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT',
  'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS',
  'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]

