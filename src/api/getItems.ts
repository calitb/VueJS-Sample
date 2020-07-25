import axios, { AxiosResponse } from "axios";
import { Item } from "@/store/state";

export type APIHandler<T> = (
  error?: Error,
  data?: T,
  response?: AxiosResponse<T>
) => void;

export default async function getItems(
  handler: APIHandler<Item[]>
): Promise<void> {
  try {
    const response: AxiosResponse<Item[]> = await axios.get(
      "https://raw.githubusercontent.com/lucasbento/graphql-pokemon/master/src/pokemons/pokemons.json"
    );
    const data = response.data;
    const items: Item[] = data.map((d): Item => (
      { id: d.id, name: d.name, image: itemImageURL(d.name) }
    ));
    handler(undefined, items, response);
  } catch (error) {
    handler(error, undefined, undefined);
  }
}

export function itemImageURL(itemName: string): string {
  const normalizedName = itemName
    .replace("'", "")
    .replace(".", "")
    .replace(" ", "-")
    .toLowerCase();
  return `https://img.pokemondb.net/artwork/${normalizedName}.jpg`;
}
