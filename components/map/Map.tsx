import { View, Modal, Text, TouchableOpacity, StatusBar } from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
import { ICurrentLocation, IRegion, MapProps } from "@/types/map";
import LocationMarker from "./LocationMarker";
import mockMarkers from "@/constants/mockMarkers";
import CancelButton from "../CancelButton";

const Map: React.FC<MapProps> = ({ currentLocation }) => {
  const [region, setRegion] = useState<IRegion | undefined>({
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<ICurrentLocation | null>(
    null
  );

  const handleMarkerPress = (marker: ICurrentLocation) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  return (
    <View className="absolute w-full h-full">
      <StatusBar hidden={modalVisible} />

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
          onPress={() => handleMarkerPress(currentLocation)}
        />
        {mockMarkers.map((marker, index) => (
          <LocationMarker
            key={index}
            latitude={marker.latitude}
            longitude={marker.longitude}
            title={`Marker ${index + 1}`}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
      </MapView>

      {selectedMarker && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/25">
            <View className="w-10/12 p-12 rounded-lg items-center bg-white">
              <Text>Znajdź żółtego psa lub diabła rogatego</Text>
              <Text className="mt-4 text-center">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aliquid, sint? Quis, quasi laborum repudiandae corporis iste
                tenetur, obcaecati dicta explicabo eos minima, necessitatibus
                harum. Quas et repudiandae temporibus veniam culpa assumenda
                perferendis eligendi blanditiis autem enim error, nisi quasi
                ipsa porro praesentium! Adipisci distinctio tempora dolores, sed
                aspernatur quas, enim debitis veniam et nam placeat quasi quidem
                rerum tempore. Aliquam, alias itaque, voluptatum beatae a
                accusamus rerum nisi expedita molestias nam obcaecati
                perferendis. Nam nostrum explicabo provident similique
                distinctio inventore nihil molestias error ipsa! Praesentium
                consequatur sit tempora nisi sed molestias mollitia repudiandae
                nemo modi, itaque magni aspernatur repellendus blanditiis atque
                ab? Quidem amet iusto, rem magnam excepturi voluptates corrupti
                hic dolore illum incidunt beatae a quas aliquid quisquam! Qui.
              </Text>
              <TouchableOpacity
                className="mt-4 p-2 rounded"
                onPress={() => setModalVisible(false)}
              >
                <CancelButton
                  title="Cancel"
                  containerStyles="absolute right-1/3"
                  handlePress={() => setModalVisible(false)}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Map;
