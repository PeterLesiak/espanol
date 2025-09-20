/** @throws {RangeError} When number is outside the range of [0, 999_999_999] */
export function numberToSpanish(num: number): string {
  if (num === 0) return 'cero';

  if (num < 0 || num > 999_999_999) {
    throw new RangeError('Number outside the supported range');
  }

  const units = [
    '',
    'uno',
    'dos',
    'tres',
    'cuatro',
    'cinco',
    'seis',
    'siete',
    'ocho',
    'nueve',
  ];
  const teens = [
    'diez',
    'once',
    'doce',
    'trece',
    'catorce',
    'quince',
    'dieciséis',
    'diecisiete',
    'dieciocho',
    'diecinueve',
  ];
  const tens = [
    '',
    'diez',
    'veinte',
    'treinta',
    'cuarenta',
    'cincuenta',
    'sesenta',
    'setenta',
    'ochenta',
    'noventa',
  ];
  const hundreds = [
    '',
    'ciento',
    'doscientos',
    'trescientos',
    'cuatrocientos',
    'quinientos',
    'seiscientos',
    'setecientos',
    'ochocientos',
    'novecientos',
  ];

  function convertHundreds(n: number): string {
    if (n === 0) return '';
    if (n === 100) return 'cien';
    let text = '';
    const c = Math.floor(n / 100);
    const r = n % 100;
    if (c > 0) text += hundreds[c] + (r > 0 ? ' ' : '');
    if (r > 0) {
      if (r < 10) text += units[r];
      else if (r < 20) text += teens[r - 10];
      else {
        const t = Math.floor(r / 10);
        const u = r % 10;
        if (t === 2 && u > 0) {
          text += 'veinti' + (u === 1 ? 'ún' : units[u]);
        } else {
          text += tens[t];
          if (u > 0) text += ' y ' + (u === 1 ? 'un' : units[u]);
        }
      }
    }
    return text;
  }

  function convertSection(n: number, singular: string, plural: string): string {
    if (n === 0) return '';
    if (n === 1) return singular;
    return numberToSpanish(n) + ' ' + plural;
  }

  let result = '';

  const millions = Math.floor(num / 1_000_000);
  num %= 1_000_000;
  const thousands = Math.floor(num / 1_000);
  const remainder = num % 1_000;

  if (millions > 0) {
    result += convertSection(millions, 'un millón', 'millones');
  }
  if (thousands > 0) {
    if (result) result += ' ';
    result += convertSection(thousands, 'mil', 'mil');
  }
  if (remainder > 0) {
    if (result) result += ' ';
    result += convertHundreds(remainder);
  }

  return result.trim();
}
