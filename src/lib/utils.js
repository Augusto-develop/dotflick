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