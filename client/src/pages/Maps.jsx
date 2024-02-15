import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useState, useCallback } from 'react';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  "lat": -6.2856683315141995,
  "lng": 106.80113268220876
};

function Gmaps() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_G_MAP_CLIENT
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <></>
    </GoogleMap>
  ) : <></>
}

export default Gmaps
