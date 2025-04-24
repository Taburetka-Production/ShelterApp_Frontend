import React, { useState, useCallback, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
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

  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      if (shelters.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        shelters.forEach((sh) => {
          const { lat, lng } = sh.address || {};
          if (typeof lat === "number" && typeof lng === "number") {
            bounds.extend(new window.google.maps.LatLng(lat, lng));
          }
        });
        map.fitBounds(bounds);

        const listener = window.google.maps.event.addListener(
          map,
          "idle",
          () => {
            if (map.getZoom()! > 15) {
              map.setZoom(15);
            }
            window.google.maps.event.removeListener(listener);
          },
        );
      }
    },
    [shelters],
  );

  const onUnmount = useCallback(() => {
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
      {shelters.map((shelter) => {
        const { lat, lng } = shelter.address || {};
        if (typeof lat !== "number" || typeof lng !== "number") return null;

        return (
          <MarkerF
            key={shelter.id || `${lat}-${lng}`}
            position={{ lat, lng }}
            title={shelter.name}
            onClick={() => setSelectedShelter(shelter)}
          />
        );
      })}

      {selectedShelter &&
        (() => {
          const { lat, lng, city, street } = selectedShelter.address || {};
          const addressParts = [street, city].filter(Boolean);
          const addressString = addressParts.join(", ");

          return (
            <InfoWindowF
              position={{ lat: lat!, lng: lng! }}
              onCloseClick={() => setSelectedShelter(null)}
              options={{ pixelOffset: new window.google.maps.Size(0, -35) }}
            >
              <div className="shelter-infowindow-content">
                {selectedShelter.imageUrl && (
                  <img
                    src={selectedShelter.imageUrl}
                    alt={selectedShelter.name}
                    className="shelter-map-img"
                    style={{ width: 100, height: 100, objectFit: "cover" }}
                  />
                )}
                <h4>{selectedShelter.name}</h4>
                <p className="shelter-address">
                  {addressString || "Адреса не вказана"}
                </p>
                <p className="shelter-rating">
                  Рейтинг:{" "}
                  {(
                    Math.round((selectedShelter.rating || 0) * 10) / 10
                  ).toFixed(1)}
                  /5 ({selectedShelter.reviewsCount} відгуків)
                </p>
              </div>
            </InfoWindowF>
          );
        })()}
    </GoogleMap>
  );
};
