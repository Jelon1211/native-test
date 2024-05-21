import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import useLocation from "@/hooks/useLocation"; // Upewnij się, że ścieżka jest poprawna
import { useFocusEffect } from "@react-navigation/native";
import PermissionMessage from "@/components/PermissionMessage";
import MapView, { Marker } from "react-native-maps";

const Play = () => {
  const {
    permissionDenied,
    errorMessage,
    startLocationUpdates,
    stopLocationUpdates,
    currentLocation,
  } = useLocation();

  interface IRegion {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }

  const [region, setRegion] = useState<IRegion>({
    latitude: 50.1043737,
    longitude: 18.9721633,
    latitudeDelta: 0.0422,
    longitudeDelta: 0.0422,
  });

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
      <MapView
        className="absolute w-full h-full top-7"
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={region}
      ></MapView>
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
