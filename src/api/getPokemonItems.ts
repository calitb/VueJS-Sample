import { Item } from "@/store/state";
import axios from "axios";

export function itemImageURL(itemName: string): string {
  const normalizedName = itemName
    .replace("'", "")
    .replace(".", "")
    .replace(" ", "-")
    .toLowerCase();
  return `https://img.pokemondb.net/artwork/${normalizedName}.jpg`;
}

type PokemonResponse = Array<{
  id: string;
  name: string;
}>;

export default async function getPokemonItems(): Promise<Item[]> {
  const response = await axios.get<PokemonResponse>(
    "https://raw.githubusercontent.com/lucasbento/graphql-pokemon/master/src/pokemons/pokemons.json"
  );
  const data = response.data;
  const items: Item[] = data.map(
    (d): Item => ({ id: d.id, name: d.name, image: itemImageURL(d.name) })
  );

  return items;
}
