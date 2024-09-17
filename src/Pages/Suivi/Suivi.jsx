import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';
import { useLocation } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import TechnicianStatusDisplay from '../../Components/TechStatusDisplay/TechStatusDisplay'; // Ensure the path is correct
import "./Suivi.scss";

const Suivi = () => {
  const location = useLocation();
  const [localisationData, setLocalisationData] = useState([]);

  useEffect(() => {
    const fetchLocalisationData = async () => {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch("http://127.0.0.1:8001/api/active-techniciens-localisation/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}, ${errData.detail}`);
      }

      const data = await response.json();
      if (Array.isArray(data.Techniciens)) {
        setLocalisationData(data.Techniciens);
      } else {
        console.error("Data format is not as expected:", data);
      }
    };

    const intervalId = setInterval(fetchLocalisationData, 2000);  // Fetch every 2 seconds
    return () => clearInterval(intervalId);  // Clean up on component unmount
  }, [location.state]);

  const generateColor = (index) => {
    const hue = (index * 137.508) % 360;  // Using golden ratio for distinct colors
    return `hsl(${hue}, 100%, 50%)`;
  };

  const createCustomIcon = (color) => {
      return new L.DivIcon({
          html: `<div style="background-color: ${color}; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white;"></div>`,
          className: '',
          iconSize: [15, 15],
          iconAnchor: [7.5, 15],
          popupAnchor: [0, -15]
      });
  };

  return (
    <div className="list_page">
      <Sidebar />
      <div className="suivi_main">
        <Navbar />
        <div id="hh" style={{ position: 'relative', height: '100vh' }}>
          <TechnicianStatusDisplay style={{ position: 'absolute', top: 0, left: 0, zIndex: 1000 }}/>
          <MapContainer center={[35.572, -5.383]} zoom={10} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {localisationData.map((technician, index) => {
                const positions = technician.localisation.locations.map(loc => [
                    parseFloat(loc.latitude),
                    parseFloat(loc.longitude)
                ]);
                const lastPosition = positions[positions.length - 1];
                const polylineColor = generateColor(index);
                const markerIcon = createCustomIcon(polylineColor);

                return (
                    <React.Fragment key={index}>
                        <Marker position={lastPosition} icon={markerIcon}>
                            <Popup>
                                <strong>{technician.user.username}</strong><br />
                                
                            </Popup>
                        </Marker>
                        <Polyline positions={positions} pathOptions={{ color: polylineColor }} />
                    </React.Fragment>
                );
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Suivi;
