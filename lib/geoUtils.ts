import { Linking } from "react-native";

export const parseGeoCoordinates = (geo: string): [number, number] => {
  const [latitude, longitude] = geo
    .replace("POINT (", "")
    .replace(")", "")
    .split(" ")
    .map(parseFloat);

  return [latitude, longitude];
};

export const openGoogleMaps = (geo: string) => {
  const [latitude, longitude] = parseGeoCoordinates(geo);
  const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  Linking.openURL(url).catch((err) => console.error("An error occurred", err));
};
