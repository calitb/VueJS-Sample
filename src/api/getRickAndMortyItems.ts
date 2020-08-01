import { Item } from "@/store/state";
import axios from "axios";

interface RickAndMortyResponse {
  info: {
    count: number;
    pages: number;
    next?: string;
    prev?: string;
  };
  results: Item[];
}

export default async function getRickAndMortyItems(
  page = 1,
  maxPage = 3
): Promise<Item[]> {
  const response = await axios.get<RickAndMortyResponse>(
    "https://rickandmortyapi.com/api/character/?page=" + page
  );

  const next = response.data.info.next;
  const items: Item[] = response.data.results.map(
    (d): Item => ({ id: d.id, name: d.name, image: d.image })
  );

  if (next && page < maxPage) {
    const moreItems = await getRickAndMortyItems(page + 1, maxPage);
    items.push(...moreItems);
  }
  return items;
}
