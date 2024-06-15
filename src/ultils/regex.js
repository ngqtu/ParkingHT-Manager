export default function CurrencyFormat({ num }) {
  const formattedNum = num
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  return <span>{`${formattedNum}₫`}</span>;
}