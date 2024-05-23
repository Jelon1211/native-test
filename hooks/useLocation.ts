import { useState, useEffect, useCallback, useRef } from "react";
import { GPS_REFRESH_RATE } from "@env";
import * as Location from "expo-location";

const useLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<any>();
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const getPermissions = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPermissionDenied(true);
        return false;
      } else {
        setPermissionDenied(false);
        return true;
      }
    } catch (error) {
      setErrorMessage("Error GPS permissions");
      console.error(error);
      return false;
    }
  };

  const getLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
      setErrorMessage(null);
      return location.coords;
    } catch (error) {
      setErrorMessage("Error during setting gps");
      console.error(error);
      return null;
    }
  };

  const startLocationUpdates = useCallback(async () => {
    const hasPermission = await getPermissions();
    if (!hasPermission) return;

    const getLocationAndLog = async () => {
      const location = await getLocation();
      console.log(location);
    };

    if (!intervalIdRef.current) {
      await getLocationAndLog();

      const id = setInterval(getLocationAndLog, 10000);
      intervalIdRef.current = id;
    }
  }, []);

  const stopLocationUpdates = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    getLocation();

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  return {
    currentLocation,
    permissionDenied,
    errorMessage,
    startLocationUpdates,
    stopLocationUpdates,
    getLocation,
  };
};

export default useLocation;
