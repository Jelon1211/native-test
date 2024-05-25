import React from "react";
import { View, Text, Image } from "react-native";
import SearchInput from "@/components/SearchInput";
import Categories from "@/components/categories/Categories";
import Heading from "../Heading";

interface ListHeaderProps {
  categories: any;
}

const ListHeader: React.FC<ListHeaderProps> = ({ categories }) => {
  return (
    <View className="flex my-6 px-4 space-y-6">
      <Heading />
      <SearchInput />
      <Categories categories={categories} />
    </View>
  );
};

export default ListHeader;
