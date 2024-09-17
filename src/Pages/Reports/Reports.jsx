import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Popup, Marker } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import './Reports.scss';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';

function Reports() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [path, setPath] = useState([]);
  const [usernames, setUsernames] = useState([]); // État pour stocker les noms d'utilisateurs

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8001/api/getusernames/');
        if (!response.ok) {
          throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        const data = await response.json();
        setUsernames(data);
      } catch (error) {
        console.error('Échec de la récupération des noms d\'utilisateurs', error);
      }
    };

    fetchUsernames();
  }, []);

  const handleShowClick = async () => {
    const url = 'http://127.0.0.1:8001/api/getlocalisations/';
    const data = {
      technicien_name: name,
      date: date
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
      }
      const result = await response.json();
      const newPath = result.map(loc => [parseFloat(loc.latitude), parseFloat(loc.longitude)]);
      setPath(newPath);
    } catch (error) {
      console.error('Il y a eu une erreur !', error);
    }
  };

  const createCustomIcon = () => {
    return new L.DivIcon({
      html: `<div style="background-color: red; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white;"></div>`,
      className: '',
      iconSize: [15, 15],
      iconAnchor: [7.5, 15],
      popupAnchor: [0, -15]
    });
  };
  const markerIcon = createCustomIcon();

  return (
    <div className="list_page">
      <div className="home_sidebar">
        <Sidebar />
      </div>
      <div className="suivi_main">
        <Navbar />
        <div className="real-time-path">
          <div className="header">
            <h1>Chemin en Temps Réel</h1>
            <div className="actions">
              
            </div>
            <div className="filters">
              <p>Employé :</p>
              <select 
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
                required={true}>
                <option value="">Sélectionnez un technicien</option>
                {usernames.map((username, index) => (
                  <option key={index} value={username}>{username}</option>
                ))}
              </select>
              <p>Date :</p>
              <input type="date" 
                name="date"
                id="date"
                onChange={(e) => setDate(e.target.value)}
                required={true}/>
              <button onClick={handleShowClick}>Afficher</button>
            </div>
          </div>
          <div id="hh" style={{ height: '1000px', width: '100%' }}>
            <MapContainer center={[35.572, -5.3830]} zoom={10} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributeurs'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {path.length > 0 && (
                <Polyline positions={path} color="red">
                  <Popup>Un chemin du technicien</Popup>
                </Polyline>
              )}
              {path.length > 0 && (
                <Marker position={path[path.length - 1]} icon={markerIcon}>
                  <Popup>Dernière position du technicien</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
