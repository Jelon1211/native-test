import React, { useState } from "react";
import { FlatList, Text } from "react-native";
import CategoryItem from "./CategoryItem";
import { CategoriesProps, ViewToken } from "@/types/categories";

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  const [activeItem, setActiveItem] = useState<string | null>(
    categories.length > 0 ? categories[0].id : null
  );

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0 && viewableItems[0].key) {
      setActiveItem(viewableItems[0].key);
    }
  };

  if (!categories || categories.length === 0) {
    return <Text>No categories available</Text>;
  }

  return (
    <FlatList
      data={categories}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CategoryItem activeItem={activeItem || ""} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentInset={{ left: 170, right: 170 }}
    />
  );
};

export default Categories;
