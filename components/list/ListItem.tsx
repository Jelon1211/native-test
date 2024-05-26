import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { IItem } from "@/types/itemservice";
import { images } from "@/constants";
import { router } from "expo-router";

const ListItem = ({ item }: { item: IItem }) => {
  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={icons.profile}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "item-details",
                params: {
                  itemUuid: item.uuid,
                },
              })
            }
          >
            <View className="flex justify-center flex-1 ml-3 gap-y-1">
              <Text
                className="font-psemibold text-sm text-white"
                numberOfLines={2}
              >
                {item.title}
              </Text>
              <Text
                className="text-xs text-gray-100 font-pregular"
                numberOfLines={1}
              >
                {item.created_by}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="pt-2">
          <Image
            source={icons.menu}
            className="w-5 h-5"
            resizeMode="contain"
            tintColor="#FF9C01"
          />
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        onPress={() =>
          router.push({
            pathname: "item-details",
            params: {
              itemUuid: item.uuid,
            },
          })
        }
      >
        <Image
          source={images.thumbnail}
          className="w-full h-full rounded-xl mt-3"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;
