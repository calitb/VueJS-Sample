import axios, { AxiosResponse } from "axios";

import { ApolloQueryResult } from "apollo-boost";
import { Item } from "@/store/state";
import { RickAndMortyCharacters } from "../types/RickAndMortyCharacters";
import fetchRickAndMortyItemsQuery from "../queries/rickAndMorty";
import { rickAndMortyClient } from "@/api/client";

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
  response?: AxiosResponse<V> | ApolloQueryResult<V>
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

export async function queryRickAndMortyItems(
  handler: APIHandler<Item[], RickAndMortyCharacters>,
  page = 1,
  maxPage = 3
): Promise<void> {
  const response = await rickAndMortyClient.query<RickAndMortyCharacters>({
    variables: { page },
    query: fetchRickAndMortyItemsQuery
  });

  const next = response.data.characters?.info?.next;
  const items =
    response.data.characters?.results?.map(item => {
      return {
        id: item?.id || "",
        name: item?.name || "",
        image: item?.image || ""
      };
    }) || [];

  if (next && page < maxPage) {
    await queryRickAndMortyItems((error, moreItems) => {
      if (moreItems) {
        items.push(...moreItems);
      }
      handler(undefined, items, response);
    }, page + 1);
  } else {
    handler(undefined, items, response);
  }
}

export default getPokemonItems;
