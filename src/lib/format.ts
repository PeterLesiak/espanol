export function padNumber(num: number): string {
  const str = num.toString();

  let result = '';
  let count = 0;

  for (let i = str.length - 1; i >= 0; i--) {
    result = str[i] + result;
    count++;

    if (count % 3 === 0 && i > 0) {
      result = ' ' + result;
    }
  }

  return result;
}

export function splitBySpace(text: string): string[] {
  const chunks = text.split(' ');
  const output: string[] = [];

  chunks.forEach(chunk => {
    if (chunk !== '') {
      output.push(chunk);
    }
  });

  return output;
}
