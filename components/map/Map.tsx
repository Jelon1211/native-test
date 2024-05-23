import { View, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { MapProps } from "@/types/map";
import LocationMarker from "./LocationMarker";
import MapModal from "./MapModal";
import mockMarkers from "@/constants/mockMarkers";
import useModal from "@/hooks/useModal";
import { API_URL } from "@env";
import ItemsService from "@/services/itemsService";

const itemsService = new ItemsService({
  baseURL: API_URL,
});

const Map: React.FC<MapProps> = ({ currentLocation }) => {
  const { modalVisible, selectedMarker, handleMarkerPress, closeModal } =
    useModal();

  const [items, setItems] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await itemsService.getItems(0, 100, 1, "id");
      setItems(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="absolute w-full h-full">
      <StatusBar hidden={modalVisible} />

      <MapView
        className="absolute w-full h-full"
        region={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
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
        {items.map((item: any) => {
          const { uuid, title, geo } = item;
          const [longitude, latitude] = geo
            .replace("POINT (", "")
            .replace(")", "")
            .split(" ");

          return (
            <LocationMarker
              key={uuid}
              latitude={parseFloat(longitude)}
              longitude={parseFloat(latitude)}
              title={title}
              onPress={() => {
                handleMarkerPress(item);
              }}
            />
          );
        })}
      </MapView>

      <MapModal
        visible={modalVisible}
        onClose={closeModal}
        marker={selectedMarker}
        currentLocation={currentLocation}
      />
    </View>
  );
};

export default Map;
