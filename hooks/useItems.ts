import { useState, useEffect } from "react";
import ItemsService from "@/services/itemsService";
import { API_URL } from "@env";
import { IItem } from "@/types/itemservice";

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

  useEffect(() => {
    if (initialFetch) {
      fetchItems();
    }
  }, [initialFetch]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await itemsService.getItems(0, 100, 1, "id");
      setItems(data.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const fetchItemById = async (itemUuid: string) => {
    setLoading(true);
    try {
      const data = await itemsService.getItemById(itemUuid);
      setItem(data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (itemData: IItem) => {
    setLoading(true);
    try {
      const data = await itemsService.createItem(itemData);
      setItems((prevItems) => [...prevItems, data]);
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
    fetchItemById,
    createItem,
    updateItem,
    deleteItem,
  };
};

export default useItems;
