import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { PopoverContentProps } from "@/types/list";
import PopoverItem from "./PopoverItem";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { openGoogleMaps } from "@/lib/geoUtils";

interface IMenuItems {
  id: number;
  label: string;
  isActive: boolean;
}

const allItems = [
  { id: 1, label: "Details", isActive: true },
  { id: 2, label: "Navigate", isActive: true },
  { id: 3, label: "Edit", isActive: false },
  { id: 4, label: "Delete", isActive: false },
  { id: 5, label: "Report", isActive: false },
];

const PopoverContent: React.FC<PopoverContentProps> = ({ uuid, geo }) => {
  const { isLogged } = useGlobalContext();
  const [menuItems, setMenuItems] = useState<IMenuItems[]>([]);

  useEffect(() => {
    if (!isLogged) {
      setMenuItems(
        allItems.filter(
          (item) => item.label !== "Edit" && item.label !== "Delete"
        )
      );
    } else {
      setMenuItems(allItems);
    }
  }, [isLogged]);

  const handlePress = (action: any) => {
    switch (action) {
      case "Details":
        router.push({
          pathname: "item-details",
          params: {
            itemUuid: uuid,
          },
        });
        break;
      case "Edit":
        console.log("edit");
        break;
      case "Delete":
        console.log("delete");
        break;
      case "Navigate":
        openGoogleMaps(geo);
        break;
      case "Report":
        console.log("reports");
        break;
        defualt: throw new Error("no action handled");
    }
  };
  return (
    <ScrollView className="w-full">
      <View className="flex rounded p-2 items-center w-28">
        {menuItems.map(
          (item: { id: number; label: string; isActive: boolean }) => (
            <PopoverItem
              key={item.id}
              label={item.label}
              onPress={() => handlePress(item.label)}
            />
          )
        )}
      </View>
    </ScrollView>
  );
};

export default PopoverContent;
