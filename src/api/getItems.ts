import axios, { AxiosResponse } from "axios";

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

type PokemonResponse = Array<{
  id: string;
  name: string;
}>;

export async function getPokemonItems(): Promise<Item[]> {
  try {
    const response = await axios.get<PokemonResponse>(
      "https://raw.githubusercontent.com/lucasbento/graphql-pokemon/master/src/pokemons/pokemons.json"
    );
    const data = response.data;
    const items: Item[] = data.map(
      (d): Item => ({ id: d.id, name: d.name, image: itemImageURL(d.name) })
    );

    return items;
  } catch (error) {
    return error;
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
  page = 1,
  maxPage = 3
): Promise<Item[]> {
  try {
    const response: AxiosResponse<RickAndMortyResponse> = await axios.get(
      "https://rickandmortyapi.com/api/character/?page=" + page
    );

    const next = response.data.info.next;
    const items: Item[] = response.data.results.map(
      (d): Item => ({ id: d.id, name: d.name, image: d.image })
    );

    if (next && page < maxPage) {
      const moreItems = await getRickAndMortyItems(page + 1, maxPage);
      if (moreItems) {
        items.push(...moreItems);
      }
    }
    return items;
  } catch (error) {
    return error;
  }
}

export async function queryRickAndMortyItems(
  page = 1,
  maxPage = 3
): Promise<Item[]> {
  try {
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
      const moreItems = await queryRickAndMortyItems(page + 1, maxPage);
      if (moreItems) {
        items.push(...moreItems);
      }
    }
    return items;
  } catch (error) {
    return error;
  }
}

export default getPokemonItems;
