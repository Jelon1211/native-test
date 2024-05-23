import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { API_URL } from "@env";
import ItemsService from "../../services/itemsService";
import CustomButton from "@/components/CustomButton";

const itemsService = new ItemsService({
  baseURL: API_URL,
});

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await itemsService.getItems(0, 100, 1, "id");
      setItems(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text className="text-3xl font-pblack">Home</Text>
        <CustomButton title={"Test get"} handlePress={fetchItems} />
        {items &&
          items.map(({ title, description, status, geo }) => (
            <View className="border-solid border-2">
              <Text>{title}</Text>
              <Text>{description}</Text>
              <Text>{status}</Text>
              <Text>{geo}</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default Home;
