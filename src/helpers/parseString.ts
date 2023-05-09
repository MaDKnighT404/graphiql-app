export function parseString(str: string) {
  let value;
  try {
    value = JSON.parse(str);
  } catch (e) {
    value = '';
  }
  return value;
}
