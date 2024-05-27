import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { PopoverContentProps } from "@/types/list";

const PopoverContent: React.FC<PopoverContentProps> = ({
  handleClosePopover,
}) => {
  return (
    <View className="flex bg-white rounded p-2 items-center w-28">
      <TouchableOpacity
        onPress={() => {
          console.log("Edit pressed");
          handleClosePopover();
        }}
      >
        <Text className="p-3">Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log("Edit pressed");
          handleClosePopover();
        }}
      >
        <Text className="p-3">Details</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log("Delete pressed");
          handleClosePopover();
        }}
      >
        <Text className="p-3">Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log("Delete pressed");
          handleClosePopover();
        }}
      >
        <Text className="p-3">Navigate</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log("Delete pressed");
          handleClosePopover();
        }}
      >
        <Text className="p-3">Report</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PopoverContent;
