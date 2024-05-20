import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import CustomButton from "@/components/CustomButton";

const Play = () => {
  const [currentLocation, setCurrentLocation] = useState<any>();
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const getPermissions = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setPermissionDenied(true);
          return;
        } else {
          setPermissionDenied(false);
          const getLocation = async () => {
            try {
              let location = await Location.getCurrentPositionAsync({});
              setCurrentLocation(location.coords);
            } catch (error) {
              setErrorMessage("Błąd podczas uzyskiwania lokalizacji");
              console.error(error);
            }
          };

          getLocation();
          const intervalId = setInterval(() => {
            getLocation();
          }, 1000);

          return () => clearInterval(intervalId);
        }
      } catch (error) {
        setErrorMessage("Błąd podczas uzyskiwania uprawnień");
        console.error(error);
      }
    };

    getPermissions();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack">Play</Text>
      {currentLocation && (
        <>
          <Text className="text-3xl font-pblack">
            {currentLocation.latitude}
          </Text>
          <Text className="text-3xl font-pblack">
            {currentLocation.longitude}
          </Text>
        </>
      )}
      {permissionDenied && (
        <Text>
          Trzeba zezwolić na używanie GPS do poprawnego działania aplikacji.
          Przejdź do ustawień systemowych i zezwól na dostęp do lokalizacji.
        </Text>
      )}
      {errorMessage && <Text>{errorMessage}</Text>}
    </View>
  );
};

export default Play;
