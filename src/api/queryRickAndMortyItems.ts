import { Item } from "@/store/state";
import { RickAndMortyCharacters } from "../types/RickAndMortyCharacters";
import fetchRickAndMortyItemsQuery from "../queries/rickAndMorty";
import { rickAndMortyClient } from "@/api/client";

export default async function queryRickAndMortyItems(
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
      items.push(...moreItems);
    }
    return items;
  } catch (error) {
    return error;
  }
}
