import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';

const containerStyle = {
    width: '400px',
    height: '400px'
};

let center = { lat: 0, lng: 0 }

function Gmaps() {
    let { id } = useParams()
    const [gmap, setGmap] = useState({})
    async function getGmap() {
        try {
            const response = await axios({
                url: `http://34.143.204.34/maps/${id}`,
                method: 'get',
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            center = {
                "lat": response.data.lat,
                "lng": response.data.lng
            };
            setGmap(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getGmap()
    }, [])
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
        <>
            <div className='flex items-center justify-center h-screen p-0 bg-green-200'>
                <div>
                    <h1>{gmap.name}</h1>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    >
                    </GoogleMap>
                </div>
            </div>
        </>
    ) : <></>
}

export default Gmaps
