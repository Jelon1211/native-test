import { useState } from "react";
import { ICurrentLocation } from "@/types/map";

const useModal = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedMarker, setSelectedMarker] = useState<ICurrentLocation | null>(
    null
  );

  const handleMarkerPress = (marker: ICurrentLocation) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMarker(null);
  };

  return {
    modalVisible,
    selectedMarker,
    handleMarkerPress,
    closeModal,
  };
};

export default useModal;
