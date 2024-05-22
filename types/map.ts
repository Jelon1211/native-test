export interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface ICurrentLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: 0;
  altitudeAccuracy?: 0;
  heading?: 0;
  speed?: 0;
}

export interface LocationMarkerProps {
  latitude: number;
  longitude: number;
  title?: string;
  description?: string;
  onPress?: () => void;
}

export interface MapProps {
  currentLocation: ICurrentLocation;
}
