export interface Item {
  id: string;
  name: string;
}

export function itemImageURL(item?: Item): string {
  if (!item) return '';
  const itemName = item.name
    .replace("'", '')
    .replace('.', '')
    .replace(' ', '-')
    .toLowerCase();
  return `https://img.pokemondb.net/artwork/${itemName}.jpg`;
}
