import { View } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { ICurrentLocation, IRegion } from "@/types/map";

interface MapProps {
  currentLocation: ICurrentLocation;
}

const Map: React.FC<MapProps> = ({ currentLocation }) => {
  const [region, setRegion] = useState<IRegion | undefined>({
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0221,
  });

  return (
    <View className="absolute w-full h-full">
      <MapView
        className="absolute w-full h-full"
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapPadding={{ top: 40, right: 0, bottom: 0, left: 0 }}
      ></MapView>
    </View>
  );
};

export default Map;
