import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import CancelButton from "@/components/CancelButton";

const Profile = () => {
  const { setIsLogged, isLogged } = useGlobalContext();

  const logout = () => {
    setIsLogged(false);
    router.replace("/");
  };

  return (
    <>
      <View className="flex w-100 items-center justify-center h-screen bg-white gap-10">
        <TouchableOpacity className="absolute top-16 right-10" onPress={logout}>
          <Image
            source={icons.logout}
            className="w-8 h-8"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View className="">
          <Text className="text-3xl font-pblack">Profile</Text>
        </View>
      </View>
    </>
  );
};

export default Profile;
