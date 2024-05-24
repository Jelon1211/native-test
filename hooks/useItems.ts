import { useState, useEffect } from "react";
import ItemsService from "@/services/itemsService";
import { API_URL } from "@env";

const itemsService = new ItemsService(
  {
    baseURL: API_URL,
  },
  "bearer token"
);

const useItems = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await itemsService.getItems(0, 100, 1, "id");
      setItems(data.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { items, loading, error };
};

export default useItems;
