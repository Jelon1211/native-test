import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import useLocation from "@/hooks/useLocation"; // Upewnij się, że ścieżka jest poprawna
import { useFocusEffect } from "@react-navigation/native";
import PermissionMessage from "@/components/PermissionMessage";
import Map from "@/components/map/Map";
import Loading from "@/components/Loading";

const Play = () => {
  const { permissionDenied, errorMessage, currentLocation } = useLocation();
  const [retry, setRetry] = useState<Boolean>(false);

  // To prevent actions when NOT on 'play' page
  // useFocusEffect(
  //   useCallback(() => {
  //     startLocationUpdates();
  //     return () => {
  //       stopLocationUpdates();
  //     };
  //   }, [startLocationUpdates, stopLocationUpdates])
  // );

  useEffect(() => {
    // refresh if gps disabled
    const interval = setInterval(() => {
      if (!currentLocation) {
        setRetry((prev) => !prev);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentLocation]);

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
