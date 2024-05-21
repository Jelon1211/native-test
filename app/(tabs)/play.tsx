import { View, Text } from "react-native";
import React, { useCallback } from "react";
import useLocation from "@/hooks/useLocation"; // Upewnij się, że ścieżka jest poprawna
import { useFocusEffect } from "@react-navigation/native";
import PermissionMessage from "@/components/PermissionMessage";
import Map from "@/components/map/Map";
import Loading from "@/components/Loading";

const Play = () => {
  const { permissionDenied, errorMessage, currentLocation } = useLocation();

  // To prevent actions when NOT on 'play' page
  // useFocusEffect(
  //   useCallback(() => {
  //     startLocationUpdates();
  //     return () => {
  //       stopLocationUpdates();
  //     };
  //   }, [startLocationUpdates, stopLocationUpdates])
  // );

  return (
    <View className="flex-1 items-center justify-center bg-white">
      {currentLocation ? (
        <Map currentLocation={currentLocation} />
      ) : (
        <Loading />
      )}
      <Text>
        <PermissionMessage
          permissionDenied={permissionDenied}
          errorMessage={errorMessage}
        />
      </Text>
    </View>
  );
};

export default Play;
