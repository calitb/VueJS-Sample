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
  return `https://img.pokemondb.net/artwork/${item.name.toLowerCase()}.jpg`;
}

export default pokemons;
