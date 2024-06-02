import { useState, useEffect } from "react";
import ItemsService from "@/services/itemsService";
import { API_URL } from "@env";
import { ICreateItem, IItem } from "@/types/itemservice";

const itemsService = new ItemsService(
  {
    baseURL: API_URL,
  },
  "bearer token"
);

const useItems = (initialFetch = false) => {
  const [items, setItems] = useState<IItem[]>([]);
  const [item, setItem] = useState<IItem | null>(null);
  const [loading, setLoading] = useState<boolean>(initialFetch);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    if (initialFetch) {
      fetchItems(1);
    }
  }, [initialFetch]);

  const fetchItems = async (pageNumber: number = 1) => {
    setLoading(true);
    try {
      const data = await itemsService.getItems(pageNumber, 100, 1, "id");
      if (pageNumber === 1) {
        setItems(data.data);
      } else {
        setItems((prevItems) => [...prevItems, ...data.data]);
      }
      setHasMore(data.data.length > 0);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreItems = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchItems(nextPage);
        return nextPage;
      });
    }
  };

  const fetchItemById = async (itemUuid: string) => {
    setLoading(true);
    try {
      const data = await itemsService.getItemById(itemUuid);
      setItem(data.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (itemData: ICreateItem): Promise<IItem | void> => {
    setLoading(true);
    try {
      const data = await itemsService.createItem(itemData);
      setItem(data.data);
      return data.data;
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (itemUuid: string, itemData: IItem) => {
    setLoading(true);
    try {
      const data = await itemsService.updateItem(itemUuid, itemData);
      setItems((prevItems) =>
        prevItems.map((item) => (item.uuid === itemUuid ? data : item))
      );
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (itemUuid: string) => {
    setLoading(true);
    try {
      await itemsService.deleteItem(itemUuid);
      setItems((prevItems) =>
        prevItems.filter((item) => item.uuid !== itemUuid)
      );
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    item,
    loading,
    error,
    fetchItems,
    fetchMoreItems,
    fetchItemById,
    createItem,
    updateItem,
    deleteItem,
  };
};

export default useItems;
