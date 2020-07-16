import axios, { AxiosResponse } from 'axios';
import { Item } from '@/items';

export type APIHandler<T> = (error?: Error, data?: T, response?: AxiosResponse<T>) => void;

export default async function getItems(handler: APIHandler<Item[]>): Promise<void> {
  try {
    const response: AxiosResponse<Item[]> = await axios.get('https://raw.githubusercontent.com/lucasbento/graphql-pokemon/master/src/pokemons/pokemons.json');
    const data = response.data;
    const items: Item[] = data.map((d: any): Item => ({ id: d.id, name: d.name }));
    handler(undefined, items, response);
  } catch (error) {
    handler(error, undefined, undefined);
  }
}
