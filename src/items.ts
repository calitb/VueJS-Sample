export interface Item {
  id: string;
  name: string;
}

const pokemons: Item[] = [];

export const itemsFixture = [
  {
    id: '4',
    name: 'Charmander'
  },
  {
    id: '5',
    name: 'Charmeleon'
  },
  {
    id: '6',
    name: 'Charizard'
  }
];

export function itemImageURL(item?: Item): string {
  if (!item) return '';
  const itemName = item.name
    .replace("'", '')
    .replace('.', '')
    .replace(' ', '-')
    .toLowerCase();
  return `https://img.pokemondb.net/artwork/${itemName}.jpg`;
}

export default pokemons;
