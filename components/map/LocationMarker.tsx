import { LocationMarkerProps } from "@/types/map";
import React from "react";
import { Marker } from "react-native-maps";

const LocationMarker: React.FC<LocationMarkerProps> = ({
  latitude,
  longitude,
  title,
  description,
}) => {
  return (
    <Marker
      coordinate={{ latitude, longitude }}
      title={title}
      description={description}
    />
  );
};

export default LocationMarker;
