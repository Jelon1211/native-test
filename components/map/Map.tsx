import { View } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { ICurrentLocation, IRegion, MapProps } from "@/types/map";
import LocationMarker from "./LocationMarker";
import mockMarkers from "@/constants/mockMarkers";

const Map: React.FC<MapProps> = ({ currentLocation }) => {
  const [region, setRegion] = useState<IRegion | undefined>({
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });

  return (
    <View className="absolute w-full h-full">
      <MapView
        className="absolute w-full h-full"
        region={region}
        showsUserLocation={true}
        customMapStyle={[
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ]}
        showsMyLocationButton={true}
        mapPadding={{ top: 40, right: 0, bottom: 0, left: 0 }}
      >
        <LocationMarker
          latitude={currentLocation.latitude}
          longitude={currentLocation.longitude}
          title="Your Location"
        />
        {mockMarkers.map((marker, index) => (
          <LocationMarker
            key={index}
            latitude={marker.latitude}
            longitude={marker.longitude}
            title={`Marker ${index + 1}`}
          />
        ))}
      </MapView>
    </View>
  );
};

export default Map;
