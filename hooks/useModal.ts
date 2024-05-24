import { useState } from "react";
import { IItem } from "@/types/itemservice";

const useModal = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedMarker, setSelectedMarker] = useState<IItem | null>(null);

  const handleMarkerPress = (marker: IItem) => {
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
