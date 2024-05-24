export const parseGeoCoordinates = (geo: string): [number, number] => {
  const [latitude, longitude] = geo
    .replace("POINT (", "")
    .replace(")", "")
    .split(" ")
    .map(parseFloat);

  return [latitude, longitude];
};
