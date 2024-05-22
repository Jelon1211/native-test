import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
import { ICurrentLocation, IRegion, MapProps } from "@/types/map";
import LocationMarker from "./LocationMarker";
import mockMarkers from "@/constants/mockMarkers";
import CancelButton from "../CancelButton";
import images from "@/constants/images";
import icons from "@/constants/icons";

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
            <View className="w-10/12 p-3 rounded-lg bg-white">
              <Text className="text-2xl font-bold text-center">
                Znajdź żółtego psa lub diabła rogatego
              </Text>
              <Image
                source={images.thumbnail}
                className="w-full"
                resizeMode="contain"
              />
              <View className="flex-row items-end">
                <Text className="mt-4 text-base">
                  {/* 40 words max */}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolore laudantium possimus cum pariatur, cumque fuga enim nam
                  esse ipsum doloribus eligendi ducimus quisquam ab inventore
                  dolores similique ratione. Laboriosam facere eligendi dolorum
                  hic voluptate unde eveniet fugit odit tempore recusandae!
                </Text>
                <View className="gap-7 border-solid border-2">
                  <Image
                    source={icons.seeMore}
                    className="w-6 h-6"
                    tintColor="#FF9C01"
                    resizeMode="contain"
                  />
                  <Image
                    source={icons.map}
                    className="w-8 h-8"
                    tintColor="#FF9C01"
                    resizeMode="contain"
                  />
                  <Image
                    source={icons.menu}
                    className="w-8 h-8"
                    tintColor="#FF9C01"
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Map;
