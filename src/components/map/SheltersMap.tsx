import React from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { Shelter } from "@/generated-client/api";

const containerStyle = {
  width: "100%",
  height: "650px",
};

const initialCenter = {
  lat: 48.3794,
  lng: 31.1656,
};

interface ShelterMapProps {
  shelters: Shelter[];
  center?: { lat: number; lng: number };
  zoom?: number;
}

export const ShelterMap: React.FC<ShelterMapProps> = ({
  shelters,
  center = initialCenter,
  zoom = 6,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_Maps_API_KEY || "",
  });

  const mapRef = React.useRef<google.maps.Map | null>(null);

  const onLoad = React.useCallback(
    (map: google.maps.Map) => {
      if (!map) return;
      mapRef.current = map;
      if (shelters.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        shelters.forEach((shelter) => {
          if (shelter.address?.lat && shelter.address?.lng) {
            bounds.extend(
              new window.google.maps.LatLng(
                shelter.address.lat,
                shelter.address.lng,
              ),
            );
          }
        });
        map.fitBounds(bounds);

        const listener = window.google.maps.event.addListener(
          map,
          "idle",
          function () {
            if (map!.getZoom()! > 15) {
              map!.setZoom(15);
            }
            window.google.maps.event.removeListener(listener);
          },
        );
      }
    },
    [shelters],
  );

  const onUnmount = React.useCallback(() => {
    mapRef.current = null;
  }, []);

  if (loadError) {
    return <div>Помилка завантаження карти: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <div>Завантаження карти...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={shelters.length > 0 ? undefined : zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: true,
      }}
    >
      {shelters.map((shelter) =>
        shelter.address &&
        typeof shelter.address.lat === "number" &&
        typeof shelter.address.lng === "number" ? (
          <MarkerF
            key={shelter.id}
            position={{ lat: shelter.address.lat, lng: shelter.address.lng }}
            title={shelter.name}
          />
        ) : null,
      )}
    </GoogleMap>
  );
};
