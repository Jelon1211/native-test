import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl } from "react-native";

import useItems from "@/hooks/useItems";
import ListHeader from "@/components/list/ListHeader";
import EmptyState from "@/components/EmptyState";
import categories from "@/constants/categories";
import ListItem from "@/components/list/ListItem";

const Home: React.FC = () => {
  const { items, loading, error, fetchItems, fetchMoreItems } = useItems(true);
  const [refreshing, setRefreshing] = useState(false);
  const [localCategories, setLocalCategories] = useState(categories);

  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchItems(1);
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={items}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => <ListItem item={item} />}
        ListHeaderComponent={() => <ListHeader categories={localCategories} />}
        ListEmptyComponent={EmptyState}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={fetchMoreItems}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

export default Home;
