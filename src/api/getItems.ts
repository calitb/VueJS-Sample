import axios, { AxiosResponse } from "axios";

import { Item } from "@/store/state";

export function itemImageURL(itemName: string): string {
  const normalizedName = itemName
    .replace("'", "")
    .replace(".", "")
    .replace(" ", "-")
    .toLowerCase();
  return `https://img.pokemondb.net/artwork/${normalizedName}.jpg`;
}

export type APIHandler<T, V> = (
  error?: Error,
  data?: T,
  response?: AxiosResponse<V>
) => void;

type PokemonResponse = Array<{
  id: string;
  name: string;
}>;

export async function getPokemonItems(
  handler: APIHandler<Item[], PokemonResponse>
): Promise<void> {
  try {
    const response: AxiosResponse<Item[]> = await axios.get(
      "https://raw.githubusercontent.com/lucasbento/graphql-pokemon/master/src/pokemons/pokemons.json"
    );
    const data = response.data;
    const items: Item[] = data.map(
      (d): Item => ({ id: d.id, name: d.name, image: itemImageURL(d.name) })
    );
    handler(undefined, items, response);
  } catch (error) {
    handler(error, undefined, undefined);
  }
}

interface RickAndMortyResponse {
  info: {
    count: number;
    pages: number;
    next?: string;
    prev?: string;
  };
  results: Item[];
}

export async function getRickAndMortyItems(
  handler: APIHandler<Item[], RickAndMortyResponse>,
  page = 1,
  maxPage = 3
): Promise<void> {
  try {
    const response: AxiosResponse<RickAndMortyResponse> = await axios.get(
      "https://rickandmortyapi.com/api/character/?page=" + page
    );
    const data = response.data;
    const items: Item[] = data.results.map(
      (d): Item => ({ id: d.id, name: d.name, image: d.image })
    );

    if (response.data.info.next && page < maxPage) {
      await getRickAndMortyItems((error, moreItems) => {
        if (moreItems) {
          items.push(...moreItems);
        }
        handler(undefined, items, response);
      }, page + 1);
    } else {
      handler(undefined, items, response);
    }
  } catch (error) {
    handler(error, undefined, undefined);
  }
}

export default getPokemonItems;
