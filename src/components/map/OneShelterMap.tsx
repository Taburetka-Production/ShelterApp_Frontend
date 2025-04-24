import { ShelterDetailDto } from "@/generated-client/api";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useCallback, useRef, useState } from "react";
import "./OneShelterMap.css";

const containerStyle = {
  width: "100%",
  height: "500px",
};

interface ShelterMapProps {
  shelter: ShelterDetailDto | null;
}

export const OneShelterMap: React.FC<ShelterMapProps> = ({ shelter }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_Maps_API_KEY || "",
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  const mapCenter =
    shelter?.address?.lat && shelter?.address?.lng
      ? { lat: shelter.address.lat, lng: shelter.address.lng }
      : undefined;

  const mapZoom = shelter ? 15 : 6;

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const handleMarkerClick = () => {
    setInfoWindowOpen(!infoWindowOpen);
  };

  const handleInfoWindowClose = () => {
    setInfoWindowOpen(false);
  };

  if (loadError) {
    return <div>Помилка завантаження карти: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <div>Завантаження карти...</div>;
  }

  if (
    !shelter ||
    !shelter.address ||
    typeof shelter.address.lat !== "number" ||
    typeof shelter.address.lng !== "number"
  ) {
    return <div>Не вдалося завантажити координати для карти.</div>;
  }

  const shelterPosition = {
    lat: shelter.address.lat,
    lng: shelter.address.lng,
  };

  const addressString =
    `${shelter.address.city || ""}, ${shelter.address.street || ""}`
      .trim()
      .replace(/^,|,$/g, "");

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={mapZoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: true,
      }}
    >
      <MarkerF
        position={shelterPosition}
        title={shelter.name || ""}
        onClick={handleMarkerClick}
      />

      {infoWindowOpen && (
        <InfoWindowF
          position={shelterPosition}
          onCloseClick={handleInfoWindowClose}
          options={{
            pixelOffset: new window.google.maps.Size(0, -35),
          }}
        >
          <div className="shelter-infowindow-content">
            <img
              src={shelter.imageUrl || ""}
              alt={shelter.name || ""}
              className="shelter-map-img"
            />
            <h4>{shelter.name}</h4>
            <p className="shelter-address">
              {addressString || "Адреса не вказана"}
            </p>
            <p className="shelter-rating">
              Рейтинг:
              {Math.round(shelter.rating ? shelter.rating * 10 : 0) / 10}/5 (
              {shelter.reviewsCount} відгуків)
            </p>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
};
