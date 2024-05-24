import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { API_URL } from "@env";
import ItemsService from "../../services/itemsService";
import CustomButton from "@/components/CustomButton";
import useItems from "@/hooks/useItems";

const itemsService = new ItemsService(
  {
    baseURL: API_URL,
  },
  "bearer token"
);

const Home = () => {
  const { items, loading, error } = useItems(true);

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
        {items &&
          items.map(({ title, description, status, geo, uuid }) => (
            <View key={uuid} className="border-solid border-2">
              <Text>{title}</Text>
              <Text>{description}</Text>
              <Text>{status}</Text>
              <Text>{geo}</Text>
              <Text>{uuid}</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default Home;
