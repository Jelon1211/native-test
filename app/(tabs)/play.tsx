import { View, Text } from "react-native";
import React, { useCallback } from "react";
import useLocation from "@/hooks/useLocation"; // Upewnij się, że ścieżka jest poprawna
import { useFocusEffect } from "@react-navigation/native";
import PermissionMessage from "@/components/PermissionMessage";

const Play = () => {
  const {
    permissionDenied,
    errorMessage,
    startLocationUpdates,
    stopLocationUpdates,
  } = useLocation();

  // To prevent actions when NOT on 'play' page
  useFocusEffect(
    useCallback(() => {
      startLocationUpdates();

      return () => {
        stopLocationUpdates();
      };
    }, [startLocationUpdates, stopLocationUpdates])
  );

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack">Play</Text>
      <PermissionMessage
        permissionDenied={permissionDenied}
        errorMessage={errorMessage}
      />
    </View>
  );
};

export default Play;
